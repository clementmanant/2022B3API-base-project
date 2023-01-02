import { SetMetadata } from "@nestjs/common";
import { User } from "../../users/entities/user.entity";

export const Roles = (...roles: User["role"][]) => SetMetadata('roles', roles);
