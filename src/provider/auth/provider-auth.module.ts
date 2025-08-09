import { Module } from '@nestjs/common';
import { ProviderAuthController } from './provider-auth.controller';
import { ProviderModule } from '../provider.module';
import { ProviderAuthService } from './provider-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import * as process from 'node:process';

@Module({
  controllers: [ProviderAuthController],
  imports: [
    ConfigModule.forRoot(),
    ProviderModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1 year' },
    }),
  ],
  providers: [ProviderAuthService],
})
export class ProviderAuthModule {}
