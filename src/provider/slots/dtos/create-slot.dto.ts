import { IsDate, IsDateString, IsNumber, MinDate } from 'class-validator';
import { Type } from 'class-transformer';

export default class CreateSlotDTO {
  @IsDate({})
  @Type(() => Date) // Important for transforming string to Date object
  @MinDate(new Date(), { message: 'Date must be in future' })
  readonly dateTime: Date;

  @IsNumber()
  readonly duration: string;
}
