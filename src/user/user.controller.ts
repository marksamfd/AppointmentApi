import {
  Body,
  Controller,
  Request,
  Patch,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserAuthGuard } from './user-auth/user-auth.guard';
import UpdateUserDTO from './dtos/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch()
  @UsePipes(new ValidationPipe())
  @UseGuards(UserAuthGuard)
  updateData(@Request() req, @Body() user: UpdateUserDTO) {
    this.userService.update(req.user.sub, user);
  }
}
