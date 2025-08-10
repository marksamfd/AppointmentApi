import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SlotsService } from '../provider/slots/slots.service';
import { Slot } from '../schemas/slot';
import CreateSlotDTO from '../provider/slots/dtos/create-slot.dto';
import UpdateSlotDto from '../provider/slots/dtos/update-slot.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class DeleteUnsusedService {
  constructor(
    private slotsService: SlotsService,
    private userService: UserService,
  ) {}

  // @Cron(CronExpression.EVERY_30_MINUTES)
  handleCron() {
    this.slotsService.markAsDone();

    this.slotsService.getSlotsBefore30Minutes().then((slots) => {
      slots.forEach((slot) => {
        const userEmail = this.userService.findById(slot?.bookedBy.toString());

        //create sending email logic userEmail
      });
    });
  }
}
