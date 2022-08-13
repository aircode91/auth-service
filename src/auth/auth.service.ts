import { User } from './entities/auth.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private authRepo: Repository<User>) { }
  create(createAuthDto: CreateAuthDto) {
    createAuthDto.password = this.hashPassword(createAuthDto.password);
    return this.authRepo.save(createAuthDto);
  }

  findAll() {
    return this.authRepo.find();
  }

  findOne(id) {
    return this.authRepo.findOne(id);
  }

  update(id, updateAuthDto: UpdateAuthDto) {
    if (updateAuthDto.password)
      updateAuthDto.password = this.hashPassword(updateAuthDto.password);
    return this.authRepo.update(id, updateAuthDto);
  }

  async remove(id) {
    const user = await this.authRepo.findOne(id);
    return this.authRepo.remove(user);
  }

  hashPassword(plaintext: string) {
    return bcrypt.hashSync(plaintext, 10);
  }

  comparePassword(plaintext: string, hashPassword: string) {
    const valid = bcrypt.compareSync(plaintext, hashPassword);
    return valid;
  }
}
