import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateProjectUserDto {

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  projectId: string;

  @IsOptional()
  startDate: Date;

  @IsOptional()
  endDate: Date;
}
