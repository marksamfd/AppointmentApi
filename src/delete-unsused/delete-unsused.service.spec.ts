import { Test, TestingModule } from '@nestjs/testing';
import { DeleteUnsusedService } from './delete-unsused.service';

describe('DeleteUnsusedService', () => {
  let service: DeleteUnsusedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteUnsusedService],
    }).compile();

    service = module.get<DeleteUnsusedService>(DeleteUnsusedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
