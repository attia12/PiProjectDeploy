/* eslint-disable prettier/prettier */

import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
@Injectable()


export class PermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    
        if (!requiredPermissions && !requiredRoles) {
          return true; 
        }
    
        const { user } = context.switchToHttp().getRequest();
        console.log('this is the user from the guar User:', user);
    
        if (requiredRoles && requiredRoles.length > 0 && !user.roles.some(role => requiredRoles.includes(role))) {
          return false; 
        }
    
        if (requiredPermissions && requiredPermissions.length > 0 && !user.permissions.some(permission => requiredPermissions.includes(permission))) {
          return false; 
        }
    
        return true; 
    }

}