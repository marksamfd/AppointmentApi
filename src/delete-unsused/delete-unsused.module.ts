import { Module } from '@nestjs/common';
import { DeleteUnsusedService } from './delete-unsused.service';
import { SlotsController } from '../provider/slots/slots.controller';
import { SlotsService } from '../provider/slots/slots.service';
import { SlotsModule } from '../provider/slots/slots.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [SlotsModule, UserModule],
  providers: [DeleteUnsusedService],
})
export class DeleteUnsusedModule {}
