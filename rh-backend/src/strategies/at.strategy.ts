/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
type JwtPayload = {
    sub:string,
    email:string
    roles: string[]; 
    permissions: string[]; 
}
@Injectable()

export class AtStrategy extends PassportStrategy(Strategy,'jwt') {
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
           
            secretOrKey: 'at-secret',
        });
    }
    validate(payload:JwtPayload)
    {
        return payload;
    }
}