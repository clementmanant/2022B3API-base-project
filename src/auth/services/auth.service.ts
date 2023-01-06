import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../../users/dto/login.dto';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AuthService {
  constructor (
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<{ id: string; username: string; email: string; role: "Employee" | "Admin" | "ProjectManager"; }> {
    const user = await this.usersService.findByMail(email);
    if (user && user.password === password) {
      const {password, ...rest} = user;
      return rest;
    }
    return null;
  }

  async login(user: LoginDto) {
    const payload = { 
      email: user.email, 
      sub: (await this.usersService.findByMail(user.email)).id,
      role: (await this.usersService.findByMail(user.email)).role
    };

    return { 
      access_token: this.jwtService.sign(payload),
    }
  }
}
