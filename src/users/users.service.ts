import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'; // Import thư viện bcrypt

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await this.usersRepository.findOneBy({ email: createUserInput.email });
    if (existingUser) {
      throw new ConflictException('Email already exists'); // Trả về lỗi nếu email đã tồn tại
    }

    // Hash mật khẩu trước khi lưu
    const saltRounds = 10; // Độ mạnh của hash (tùy chỉnh)
    const hashedPassword = await bcrypt.hash(createUserInput.password, saltRounds);

    const newUser = this.usersRepository.create({
      ...createUserInput,
      passwordHash: hashedPassword, // Lưu hash, không lưu password
    });

    return this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
      return await this.usersRepository.find()
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOneOrFail({where: {id}});
    return user
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.findOne(id);

    // Cập nhật các trường (không bao gồm password)
    Object.assign(user, updateUserInput);

    // Kiểm tra và hash mật khẩu mới (nếu có)
    if (updateUserInput.password) {
      const saltRounds = 10;
      user.passwordHash = await bcrypt.hash(updateUserInput.password, saltRounds);
    }

    return this.usersRepository.save(user);
  }


  async remove(id: string): Promise<User> {
    const user = await this.findOne(id)
    await this.usersRepository.remove(user);
    return user
  }
}