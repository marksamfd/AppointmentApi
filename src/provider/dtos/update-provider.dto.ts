import { PartialType } from '@nestjs/mapped-types';
import CreateProviderDTO from './create-provider.dto';

export default class UpdateProviderDTO extends PartialType(CreateProviderDTO) {}
