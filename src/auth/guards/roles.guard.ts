// src/auth/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext,ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/auth/decorators/roles.decorators'
import { Role } from 'src/user/roles/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
      // No roles were specified don’t enforce role check → allow access
    const { user } = context.switchToHttp().getRequest(); //access to details about the current request pipeline
    if (!user || !requiredRoles.includes(user.role)) {
        throw new ForbiddenException('Only admins can access this resource');
      }
      return true; 
  }
}

/*
Reflector ->read metadata that attached to classes, methods, or parameters using decorators (via SetMetadata)
canActivate -> decides whether a request is allowed to proceed to the route handler or not
getAllAndOverride -> used to retrieve metadata */