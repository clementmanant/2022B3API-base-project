import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { RolesGuard } from './guards/roles.guard';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategie';

@Global()
@Module({
  imports: [
    UsersModule, 
    PassportModule,
    JwtModule.register({
      secret: 'SECRET', // TODO: Move to .env
      signOptions: { expiresIn: '6000s' }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})

export class AuthModule {}