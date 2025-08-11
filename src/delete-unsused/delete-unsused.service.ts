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

  // @Cron(CronExpression.EVERY_30_SECONDS)
  handleCron() {
    this.slotsService.markAsDone();
    console.log('markAsDone called');

    this.slotsService.getSlotsBefore30Minutes().then((slots) => {
      console.log('getSlotsBefore30Minutes called');
      slots.forEach(async (slot) => {
        const user = await this.userService.findEmailById(slot?.bookedBy);
        const userEmail = user?.email;

        console.log('userEmail', userEmail);
        //create sending email logic userEmail
      });
    });
  }
}
