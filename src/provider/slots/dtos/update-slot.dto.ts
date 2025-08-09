import { PartialType } from '@nestjs/mapped-types';
import CreateSlotDTO from './create-slot.dto';

export default class UpdateSlotDto extends PartialType(CreateSlotDTO) {}
