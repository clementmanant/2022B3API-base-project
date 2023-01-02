import { IsEmail, IsIn, IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class CreateUserDto {

  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
  
  @IsOptional()
  @IsIn(['Employee', 'Admin', 'ProjectManager'])
  role: 'Employee' | 'Admin' | 'ProjectManager';
}
