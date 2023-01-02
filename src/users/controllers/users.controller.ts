import { Controller, Post, Body, UsePipes, ValidationPipe, UseGuards, Request, Get, NotFoundException, Param, ParseUUIDPipe } from '@nestjs/common';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { AuthService } from '../../auth/services/auth.service';
import { CreateUserDto } from '../dto/createUser.dto';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService, 
    private readonly authService: AuthService
  ) {}

  @Post('auth/sign-up')
  @UsePipes(ValidationPipe)
  @Roles()
  signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto); 
  }
  
  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  @UsePipes(ValidationPipe)
  @Roles()
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @Roles()
  myInfos(@Request() req) {
    return req.user;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles()
  findAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles()
  findOneUser(@Param('id', new ParseUUIDPipe()) id: string): Promise<User> {
    try {
      return this.usersService.findOne(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
