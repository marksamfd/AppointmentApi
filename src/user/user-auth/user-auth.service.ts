import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user.service';
import { ProviderAuthServiceENUM } from '../../enums';
import { compareSync } from 'bcrypt';
import CreateUserDTO from '../dtos/create-user.dto';

@Injectable()
export class UserAuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  isValidPassword = function (
    enteredPassword: string,
    correctPassword: string,
  ) {
    return compareSync(enteredPassword, correctPassword);
  };

  async signIn(email: string, password: string) {
    const foundUser = await this.userService.findOneByEmail(email);
    if (foundUser && this.isValidPassword(password, foundUser.password)) {
      const payload = {
        sub: foundUser._id,
        username: foundUser.name,
        role: ProviderAuthServiceENUM.CLIENT,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    throw new UnauthorizedException();
  }

  async create(data: CreateUserDTO) {
    return this.userService.create({
      ...data,
    });
  }
}
