import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProviderAuthService } from './provider-auth.service';
import CreateProviderDTO from '../dtos/create-provider.dto';

@Controller('provider/auth/')
export class ProviderAuthController {
  constructor(private readonly ProviderAuthSrvc: ProviderAuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async signIn(@Body() signInDto: { email: string; password: string }) {
    return await this.ProviderAuthSrvc.signIn(
      signInDto.email,
      signInDto.password,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createProviderDto: CreateProviderDTO) {
    return await this.ProviderAuthSrvc.create(createProviderDto);
  }
}
