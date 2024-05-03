/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Put, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthDto } from 'src/dto/auth.dto';
import { Tokens } from 'src/types/tokens.type';

import { RtGuard } from 'src/common/guards/rt.guard';

import { GetCurrentUser } from 'src/common/decorators/get-current-user.decoraot';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { Permissions } from 'src/common/decorators/permisssions.decorator';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { Observable, of } from 'rxjs';
import { join } from 'path';
import mongoose from 'mongoose';
import { EmailService } from './email/email.service';
import { ForgotPasswordDto } from 'src/dto/forgotPassword.dto';
import { ResetPasswordDto } from 'src/dto/resetPassword.dto';
import { User } from 'src/schemas/User.schema';
import { UpdateUserDto } from 'src/dto/updateuser.dto';
import { UpdateRolesPermissionsDto } from 'src/dto/updateRolesPermissions.dto';
import { ClarifaiService } from './clarifai/clarifai.service';
import { UserI } from 'src/schemas/user.interface';
export const storage = {
    storage: diskStorage({
        destination: './uploads/profileimages',
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
            const extension: string = path.parse(file.originalname).ext;

            cb(null, `${filename}${extension}`)
        }
    })

}


@Controller('user')
export class UserController {
    constructor(private userService:UserService,private readonly emailService: EmailService,private readonly clarifaiService: ClarifaiService) {}
    @Public()
    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    signUp(@Body() authDto: AuthDto): Promise<Tokens>
    {
        return this.userService.signUp(authDto);


    }

    @Public()
    @Post('/login')
    @HttpCode(HttpStatus.OK)
    login(@Body() dto: AuthDto): Promise<Tokens>
    {
        //console.log(dto.email)
        return this.userService.login(dto);
        
    }
  
    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUser('sub') userId:string)
    {
       
       
       return this.userService.logout(userId);
        
    }
    @Public()

    @UseGuards(RtGuard)
    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(@GetCurrentUser('refreshToken')refreshToken :string,@GetCurrentUser('sub') userId:string)
    {
       console.log({
        userId,
        refreshToken
       })
        
       
        return this.userService.refreshTokens(userId,refreshToken);
        
    }
    @Get()
   
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Roles('admin')
    @Permissions('read:user')
    
    getUsers()
    {
        return 'You have access to getUsers API because you have the required role.';

    }
   
   
    @Get('/getUserById/:id')
    
    @HttpCode(HttpStatus.OK)
    
    async getUserDetailById(@Param('id') id:string)
    {
        const isValid=mongoose.Types.ObjectId.isValid(id);
           if(!isValid) throw new HttpException('User not found',404);
           const findUser= await this.userService.getUserById(id);
           if(!findUser)throw new HttpException('User not found',404);
           return findUser;

    }
    @Post('/upload')
    @UseInterceptors(FileInterceptor('file',storage))
    async uploadFile(@UploadedFile()file,@GetCurrentUser('sub')userId:string) :Promise<any>
    {
      
        try {
           const user= await this.userService.updateImage(userId,file.filename)
           return user;
     

        
       
       
    } catch (error) {
        console.error(error);
        
        return { error: 'An error occurred' };

    }
}
@Get('profile-image/:imagename')
findProfileImage(@Param('imagename') imagename, @Res() res): Observable<object> {
    return of(res.sendFile(join(process.cwd(), 'uploads/profileimages/' + imagename)));
}
@Public()
@Get('/email')
  async sendTestEmail() {
    await this.emailService.sendEmail(
      'moutye.bacha@esprit.tn',
      'Test Email',
      'This is a test email sent from NestJS!'
    );
    return 'Email sent successfully!';
  }
  @Public()
  @Post('/sendOtp')
    @HttpCode(HttpStatus.OK)
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<{ message: string }> {
        const { email } = forgotPasswordDto;
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        // Generate OTP
        const otp = Math.floor(1000 + Math.random() * 9000);
        
        // Save OTP in database or any caching mechanism if needed
        await this.userService.saveOTP(email, otp);

        // Send OTP via email
        await this.emailService.sendOTPByEmail(email, otp);

        return { message: 'OTP has been sent to your email for password reset verification.' };
    }
    @Public()
    @Post('/reset-password')
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
        try {
            const { email, otp, newPassword } = resetPasswordDto;

            // Check if user exists
            const user = await this.userService.findByEmail(email);
            if (!user) {
                throw new HttpException('User does not exist with this email!!', HttpStatus.NOT_FOUND);
            }

            // Check if OTP exists
            const otps = await this.userService.findOTPByEmail(email);
            console.log(otps);
            if (!otps) {
                throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
            }

            // Validate OTP
            if (otps.otp !== otp) {
                throw new HttpException('Invalid OTP!!!', HttpStatus.BAD_REQUEST);
            }
            const hashedP=await this.userService.hashData(newPassword)

            // Update user password
            user.hash=hashedP;
            user.password = hashedP;
            await this.userService.updateUser(user);

            return { message: 'Password updated!!' };
        } catch (err) {
            console.error(err);
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
     @Public()
     @Get('google')
     @UseGuards(AuthGuard('google'))
    async googleAuth()
     {


    }
    @Public()
    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
   async googleAuthRederict(@Req()req,@Res()res)
    {
        // const jwt=await this.userService.login(req.user)
        // res.set('authorization',jwt.access_token);
        return this.userService.googleRederict(req,res);
    }
    @Public()
    @Post('google/login')
    @UseGuards(AuthGuard('google'))
    googleLogin(@Req()req,@Res()res)
    {
        return this.userService.googleLogin(req,res);
    }
    @Get('test')
    async test(@Res()res)
    {res.json('success')

    }
    @Get('getAllUsers')
   
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Roles('superadmin')
    @Permissions('read:user')
    async getAllUsersExceptSuperadmin(): Promise<User[]> {
        return this.userService.getAllUsersExceptSuperadmin();
    }
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Roles('superadmin')
    @Permissions('delete:user')
@Delete('/deleteUser/:id')
async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    const user = await this.userService.getUserById(id);
    if (!user) {
        throw new NotFoundException('User not found');
    }
    await this.userService.deleteUser(id);
    return { message: 'User deleted successfully' };
}
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Roles('superadmin')
@Permissions('update:user')
@Put('/updateUser/:id')
async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
): Promise<{ message: string }> {
    const user = await this.userService.getUserById(id);
    if (!user) {
        throw new NotFoundException('User not found');
    }
    await this.userService.updateUserCredentials(id, updateUserDto);
    return { message: 'User credentials updated successfully' };
}
@UseGuards(AuthGuard('jwt'))
@Roles('superadmin')
@Patch('/updateRolesPermissions/:id')
async updateRolesPermissions(
    @Param('id') id: string,
    @Body() updateRolesPermissionsDto: UpdateRolesPermissionsDto,
): Promise<{ message: string }> {
    const user = await this.userService.getUserById(id);
    if (!user) {
        throw new NotFoundException('User not found');
    }

    await this.userService.updateRolesPermissions(id, updateRolesPermissionsDto);
    return { message: 'User roles and permissions updated successfully' };
}
 @Public()
 @Post('compare-images')
 async compareImages(@Body() body: {imageUrl1: string, imageUrl2: string}): Promise<any> {
   const { imageUrl1, imageUrl2 } = body;
   return this.clarifaiService.detectImage(imageUrl1, imageUrl2);
 }

 @Public()
@Post('login-face-recognition')
async loginWithFaceRecognition(@Body() body: { userImageUrl: string }): Promise<any> {
  const { userImageUrl} = body;

  
  const user = await this.userService.getUserByImage(userImageUrl);

  if (user) {
  
    const tokens = await this.userService.getTokens(user._id, user.email);

   
    return { tokens, user };
  } else {
   
    throw new NotFoundException('User not found');




  }
}
@Public()
@Get('verify/:token')
async verifyAccount(@Param('token') token: string): Promise<any> {
  // Find the user with the given verification token
  const user = await this.userService.findByVerificationToken(token);
  if (!user) {
    // Handle invalid or expired verification tokens
    return 'Invalid or expired verification token';
  }

  // Mark the user's account as verified
  await this.userService.verifyAccount(user._id);

  // Redirect the user to a page indicating successful verification
  return 'Account verified successfully';
}
@Get('find-by-username')
@HttpCode(HttpStatus.OK)
async findAllByUsername(@Query('username') username: string): Promise<UserI[]> {
    const users = await this.userService.findAllByUsername(username);
    return users.map(user => ({
        _id: user._id,
        email: user.email,
        username: user.username,
        password: user.password
    }));
}


@Get('/getUserNameById/:id')
    @HttpCode(HttpStatus.OK)
    
    async getUserNameById(@Param('id') id:string)
    {
        const isValid=mongoose.Types.ObjectId.isValid(id);
           if(!isValid) throw new HttpException('User not found',404);
           let findUser= await this.userService.getUserNameById(id);
           if(!findUser)throw new HttpException('User not found',404);
           let response = {
                    username:  findUser,
           }
           return { username: response.username };
  };

  @Get('/getUserIdByUsername/:username')
@HttpCode(HttpStatus.OK)
async getUserIdByUsername(@Param('username') username: string) {
  try {
    const user = await this.userService.getUserIdByUsername(username); // Assuming getUserByUsername exists in your userService

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  } catch (error) {
    if (error instanceof HttpException) {
      throw error; // Re-throw HttpException for consistent error handling
    } else {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}










    
}


