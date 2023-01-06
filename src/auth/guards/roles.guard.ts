import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { User } from "../../users/entities/user.entity";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor (private reflector: Reflector) {}

  canActivate (context: ExecutionContext): boolean {

    const requiredRoles = this.reflector.getAllAndOverride<User["role"]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (requiredRoles && requiredRoles.length === 0) {
      return true;
    } 
    
    const { user } = context.switchToHttp().getRequest();
    
    return requiredRoles.includes(user.role)
  }
}
