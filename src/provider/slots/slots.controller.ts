import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Body,
  UsePipes,
  ValidationPipe,
  Delete,
  Patch,
} from '@nestjs/common';
import { ProviderAuthGuard } from '../auth/povider-auth.guard';
import CreateSlotDTO from './dtos/create-slot.dto';
import { SlotsService } from './slots.service';
import UpdateSlotDto from './dtos/update-slot.dto';
import { UserAuthGuard } from '../../user/user-auth/user-auth.guard';

@Controller('provider/slots')
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  @UseGuards(ProviderAuthGuard)
  @Get(':providerId/all')
  allSlots(@Param('providerId') providerId: string, @Request() req) {
    return this.slotsService.getSlotsByProviderId(providerId);
  }

  @UseGuards(UserAuthGuard)
  @Get(':providerId/available')
  availableSlots(@Param('providerId') providerId: string, @Request() req) {
    return this.slotsService.getAvailableSlotsByProviderId(providerId);
  }

  @Patch(':slotId')
  @UsePipes(new ValidationPipe())
  @UseGuards(ProviderAuthGuard)
  getSlots(
    @Param('slotId') slotId: string,
    @Request() req,
    @Body() slotDetails: UpdateSlotDto,
  ) {
    this.slotsService.editSlot(req.user.sub, slotId, slotDetails);
  }

  @Post()
  @UseGuards(ProviderAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  addSlot(@Request() req, @Body() data: CreateSlotDTO) {
    return this.slotsService.addNewSlot(req.user.sub, data);
  }

  @Delete(':slotId')
  @UseGuards(ProviderAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  removeSlot(@Param('slotId') slotId: string, @Request() req) {
    return this.slotsService.removeSlot(req.user.sub, slotId);
  }

  @UseGuards(UserAuthGuard)
  @Post('reserve/:providerId/:slotId/')
  reserveSlot(
    @Param('providerId') providerId: string,
    @Param('slotId') slotId: string,
    @Request() req,
  ) {
    this.slotsService.reserveSlot(providerId, slotId, req.user.sub);
  }

  @UseGuards(UserAuthGuard)
  @Delete('/reserve/:providerId/:slotId/')
  removeSlotReservation(
    @Param('providerId') providerId: string,
    @Param('slotId') slotId: string,
    @Request() req,
  ) {
    this.slotsService.reserveSlot(providerId, slotId, req.user.sub);
  }
}
