import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { CreateUserDto, UserLoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);

      return {
        ...user,
        password: undefined,
      };
    } catch (error) {
      console.log(error);
      this.handleExceptions(error);
    }
  }

  async login(userLoginDto: UserLoginDto) {
    try {
      const { email, password } = userLoginDto;

      const user = await this.userRepository.findOne({
        where: { email },
        select: { email: true, password: true },
      });

      if (!user) {
        throw new UnauthorizedException('Credentials are not valid');
      }

      if (!bcrypt.compareSync(password, user.password)) {
        throw new UnauthorizedException('Credentials are not valid');
      }

      return user;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  private handleExceptions(error: any) {
    if (error?.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
