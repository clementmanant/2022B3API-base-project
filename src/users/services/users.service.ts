import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/createUser.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>, 
  ) {}

  async createUser(user: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOneBy({ id })
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  findByMail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }
}
