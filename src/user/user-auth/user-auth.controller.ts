import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import CreateUserDTO from '../dtos/create-user.dto';

@Controller('user/auth')
export class UserAuthController {
  constructor(private readonly UserAuthService: UserAuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async signIn(@Body() signInDto: { email: string; password: string }) {
    return await this.UserAuthService.signIn(
      signInDto.email,
      signInDto.password,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createUserDto: CreateUserDTO) {
    return await this.UserAuthService.create(createUserDto);
  }
}
