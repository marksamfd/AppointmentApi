import { IsDate, IsDateString, IsNumber, IsString } from 'class-validator';

export default class CreateSlotDTO {
  @IsDateString({ strict: true })
  readonly dateTime: Date;

  @IsNumber()
  readonly duration: string;

}
