import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(userData: {
    username: string;
    email: string;
    password: string;
  }) {
    // Kiểm tra email đã tồn tại
    const existingUser = await this.usersService.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('Email đã được sử dụng');
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Tạo user mới thông qua UsersService
    const newUser = await this.usersService.create({
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
    });

    // Tạo JWT token cho phép đăng nhập tự động
    const token = this.jwtService.sign({ userId: newUser.id });
    console.log('Generated token on registration:', token);

    return {
      message: 'Đăng ký thành công',
      token, // Trả về token cho client để tự động đăng nhập
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    };
  }

  async login(loginData: { email: string; password: string }) {
    const user = await this.usersService.findByEmail(loginData.email);
    if (!user) {
      throw new BadRequestException('Email hoặc mật khẩu không đúng');
    }

    const isPasswordValid = await bcrypt.compare(
      loginData.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Email hoặc mật khẩu không đúng');
    }

    const token = this.jwtService.sign({ userId: user.id });

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }

  // Phương thức để xác thực người dùng từ token
  async validateUser(userId: number) {
    return this.usersService.findById(userId);
  }
}
