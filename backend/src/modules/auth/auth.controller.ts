import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: {
    username: string;
    email: string;
    password: string;
  }) {
    return await this.authService.register(userData);
  }

  @Post('login')
  async login(@Body() loginData: {
    email: string;
    password: string;
  }) {
    return await this.authService.login(loginData);
  }
}