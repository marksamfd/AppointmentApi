import {
  IsEmail,
  isEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export default class CreateUserDTO {
  @IsString()
  @Length(3)
  readonly name: string;

  @IsString()
  @Length(11, 11)
  readonly phone: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
