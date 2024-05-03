/* eslint-disable prettier/prettier */


import { ForbiddenException, HttpStatus, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDto } from 'src/dto/auth.dto';
import { User } from 'src/schemas/User.schema';
import * as bcrypt from 'bcrypt';
import { Tokens } from 'src/types/tokens.type';
import { JwtService } from '@nestjs/jwt';
import { OTP } from 'src/schemas/Otp.schema';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';


import { UpdateUserDto } from 'src/dto/updateuser.dto';
import { UpdateRolesPermissionsDto } from 'src/dto/updateRolesPermissions.dto';
import { ClarifaiService } from './clarifai/clarifai.service';
import { EmailService } from './email/email.service';


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,@InjectModel(OTP.name) private OtpModel: Model<OTP>,
    private jwtService: JwtService,private readonly imageComparisonService:ClarifaiService,private readonly emailService: EmailService){}
    hashData(data: string)
    {
        return bcrypt.hash(data,10);


    }
    async getTokens(userId: number,email:string)
    {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new ForbiddenException('User not found');
        }
        const roles = user.roles; 
    const permissions = user.permissions;
        const [at,rt]=await Promise.all([
            this.jwtService.signAsync({
                sub:userId,
                email,
                roles,
                permissions
            },{
                secret:'at-secret',
                expiresIn: 60 * 15,
    
            
            }),
            this.jwtService.signAsync({
                sub:userId,
                email,
            },{
                secret:'rt-secret',
                expiresIn: 60 * 60 * 24* 7,
    
            
            })


        ])
        return {
            access_token:at,
            refresh_token: rt
        }
      

    }
    async updateRtHash(userId:string,rt:string)
    {
       const hash=await this.hashData(rt); 
       await this.userModel.updateOne({_id:userId},{hashedRt:hash})
    }

    
   async signUp(dto: AuthDto):Promise<Tokens>
    {
        const verificationToken = uuidv4();
        const hash=await this.hashData(dto.password);
    
        const newUser = await this.userModel.create({...dto,password:hash, hash: hash,verified: false,verificationToken: verificationToken,});
        await this.emailService.sendVerificationEmail(newUser.email, verificationToken)
        const tokens =await this.getTokens(newUser.id,newUser.email)
        await this.updateRtHash(newUser.id,tokens.refresh_token);
        return tokens;

    }
   
    async login(dto: AuthDto):Promise<Tokens>
    {
        const user=await this.userModel.findOne({email:dto.email})
        console.log("this is the user " ,user);
        if(!user) throw new ForbiddenException("Access Denied")
        if (!user.verified) {
                throw new ForbiddenException('Account not verified');
              }
        const passwordMatches=await bcrypt.compare(dto.password,user.hash);
        if(!passwordMatches) throw new ForbiddenException("Access Denied");
        const tokens =await this.getTokens(user.id,user.email)
        await this.updateRtHash(user.id,tokens.refresh_token);
        return tokens;
        
    }
    
    async logout(userId:string)
    {
        const user=await this.userModel.updateOne(
            { _id: userId, hashedRt: { $ne: null } },
            { $set: { hashedRt: null } } 
        );
        return user;
        
    }
    
    async refreshTokens(userId:any,rt: string)
    {
        const user=await this.userModel.findOne({_id:userId});
        
        if(!user ||!user.hashedRt)throw new ForbiddenException("Access Denied");
        const rtMatches=await bcrypt.compare(rt,user.hashedRt);
        if(!rtMatches ) throw new ForbiddenException("Access Denied");
        const tokens =await this.getTokens(user.id,user.email)
        await this.updateRtHash(user.id,tokens.refresh_token);
        return tokens;

        
    }
    async getUserById(userId: string): Promise<User> {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
    async updateImage(userId: string, newImage: string): Promise<User> {
       
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

       
        user.image = newImage;

       
        return await user.save();
    }
    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email });
    }
    async saveOTP(email: string, otp: number): Promise<OTP> {
        const otpDocument = new this.OtpModel({
            email,
            otp
        });
        return otpDocument.save();
    }
    async findOTPByEmail(email: string): Promise<OTP | null> {
        return this.OtpModel.findOne({ email });
    }
    async updateUser(user: any): Promise<User> {
        
        
        return this.userModel.findByIdAndUpdate(user._id, user, { new: true });
    }
   async googleRederict(req:Request,res:Response){
    try {
        console.log(req.user);
        const userData = req.user;

       const savedUser= await this.createUserFromGoogle(userData);
      // const userId = savedUser._id as unknown as number;
      const jwtTokens = await this.getTokens(savedUser.id, savedUser.email);
      res.setHeader('authorization', `Bearer ${jwtTokens.access_token}`);
      console.log("this the token in header",jwtTokens)


    //    const { access_token, refresh_token } = await this.getTokens(userId, savedUser.email);
    //    const redirectUrl = `http://localhost:4200/back/profil/${savedUser._id}?access_token=${access_token}&refresh_token=${refresh_token}`;
    //    res.redirect(redirectUrl);
   
  // res.redirect(`http://localhost:4200/back/profil/${savedUser._id}`);
  const redirectUrl = `https://performasync.onrender.com/back/profil/${savedUser._id}?access_token=${jwtTokens.access_token}`;

        // Redirect the user to the constructed URL
        res.redirect(redirectUrl);
} catch (error) {
    console.error('Error during Google redirect:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
}
  

      
       

       
       



    }
    async googleLogin(req:Request,res:Response){
     
        try {
            const authorization = req.get('authorization');
            if (!authorization) {
                throw new UnauthorizedException('Authorization header is missing');
            }
    
            const accessToken = authorization.replace('Bearer ', '');
            if (!accessToken) {
                throw new UnauthorizedException('Access token is missing');
            }
            console.log("token google",accessToken)
            console.log("authorization",authorization)
    
            // Handle the rest of the logic here, such as token verification, user retrieval, etc.
        } catch (error) {
            // Handle errors
            console.error('Error during Google login:', error);
            if (error instanceof UnauthorizedException) {
                // Send an unauthorized response if needed
                res.status(401).send('Unauthorized');
            } else {
                // Handle other types of errors accordingly
                res.status(500).send('Internal Server Error');
            }
        }
    
     
      

      
       

       
       



    }
    async createUserFromGoogle(userData: any) {
        const { email, firstName, lastName, picture, accessToken } = userData;
        let existingUser = await this.userModel.findOne({ email });

        // If the user already exists, return the existing user
        if (existingUser) {
            return existingUser;
        }

             const hashedAccessToken = await this.hashData(accessToken); 
    
           
             const newUser = new this.userModel({
                email,
                username: firstName + lastName, // Create a username based on first name and last name
                password: hashedAccessToken, // Store the hashed access token as the password
               hash: hashedAccessToken, // Store the hashed access token hash
                 hashedRt: accessToken, // Store the plain access token
                 roles: ['employee'], // Set default roles
                permissions: [], // Set default permissions
                image: picture,
                verified: true ,
               // Store the profile picture URL
             });
    
           
            const savedUser = await newUser.save();
            return savedUser;
           
    }
    verifyJwt(jwt: string): Promise<any> {
        return this.jwtService.verifyAsync(jwt, { secret: 'at-secret' });
      }
      async getAllUsersExceptSuperadmin(): Promise<User[]> {
        return this.userModel.find({ roles: { $ne: 'superadmin' } }).exec();
    }

    async deleteUser(userId: string): Promise<void> {
        await this.userModel.findByIdAndDelete(userId);
    }
    async updateUserCredentials(userId: string, updateUserDto: UpdateUserDto): Promise<void> {
        const { username, email, password } = updateUserDto;
        const hashedPassword = await this.hashData(password);
    
        await this.userModel.findByIdAndUpdate(userId, {
            username,
            email,
            password: hashedPassword,
            hash: hashedPassword, // If needed
        });
    }
    async updateRolesPermissions(userId: string, updateRolesPermissionsDto: UpdateRolesPermissionsDto): Promise<void> {
        const { roles, permissions } = updateRolesPermissionsDto;
    
        const updateData: any = {};
        if (roles) {
            updateData.roles = roles;
        }
        if (permissions) {
            updateData.permissions = permissions;
        }
    
        await this.userModel.findByIdAndUpdate(userId, updateData);
    }
    async getUserByImage(imageUrl: string): Promise<any> {
        // Retrieve all users from the database
        const users = await this.userModel.find().exec();
    
        // Iterate through each user and compare their image with the input image
        for (const user of users) {
          const isMatch = await this.imageComparisonService.detectImage(user.image, imageUrl);
          if (isMatch) {
            return user; // Return the user if the images are similar
          }
        }
    
        return null; // Return null if no matching user is found
      }
      async findByVerificationToken(verificationToken: string): Promise<any> {
        return this.userModel.findOne({ verificationToken });
      }
      
      async verifyAccount(userId: string): Promise<any> {
        await this.userModel.findByIdAndUpdate(userId, { verified: true, verificationToken: null });
      }
      async findAllByUsername(username: string): Promise<any> {
        const users = await this.userModel.find({
          username: { $regex: new RegExp(username, 'i') }
        });
        return users;
    }

    async getUserNameById(userId: string): Promise<String> {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user.username;
    }
    async getUserIdByUsername(username: string): Promise<string | undefined> {
        let user = await this.userModel.findOne({username});
        return user._id.toString(); 
      }
  
    
}
