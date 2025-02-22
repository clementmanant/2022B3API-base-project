import { IsNotEmpty, MinLength } from "class-validator";

export class CreateProjectDto {
  @IsNotEmpty()
  @MinLength(3)
  name:string;

  @IsNotEmpty()
  referringEmployeeId:string;
}
