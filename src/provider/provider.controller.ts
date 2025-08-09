import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import CreateProviderDTO from './dtos/create-provider.dto';
import { ProviderService } from './provider.service';
import { Provider } from '../schemas/provider.schema';
import UpdateUserDTO from './dtos/update-provider.dto';

@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Get()
  async getAll(): Promise<Provider[]> {
    return await this.providerService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.providerService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() data: CreateProviderDTO): Promise<any> {
    try {
      return await this.providerService.create(data);
    } catch (error) {
      if (error?.errorResponse?.code === 11000) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: 'User already exists',
          },
          HttpStatus.CONFLICT,
          {
            cause: error,
          },
        );
      }
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserDTO,
  ): Promise<any> {
    return await this.providerService.update(id, data);
  }
}
