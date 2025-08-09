import { IsEmail, IsString, IsStrongPassword, Length } from 'class-validator';

export default class CreateProviderDTO {
  @IsString()
  @Length(3)
  readonly name: string;

  @IsString()
  @Length(11, 11)
  readonly phone: string;

  @IsString()
  readonly specialty: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
