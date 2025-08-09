import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ProviderService } from '../provider.service';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ProviderAuthServiceENUM } from '../../enums';
import CreateProviderDTO from '../dtos/create-provider.dto';

@Injectable()
export class ProviderAuthService {
  constructor(
    private providerService: ProviderService,
    private jwtService: JwtService,
  ) {}

  isValidPassword = function (
    enteredPassword: string,
    correctPassword: string,
  ) {
    return compareSync(enteredPassword, correctPassword);
  };

  async signIn(email: string, password: string) {
    const foundUser = await this.providerService.findOneByEmail(email);
    if (foundUser && this.isValidPassword(password, foundUser.password)) {
      const payload = {
        sub: foundUser._id,
        username: foundUser.name,
        role: ProviderAuthServiceENUM.PROVIDER,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    throw new UnauthorizedException();
  }

  async create(data: CreateProviderDTO) {
    return this.providerService.create({
      ...data,
    });
  }
}
