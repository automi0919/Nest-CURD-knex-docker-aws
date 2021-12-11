import { Test, TestingModule } from '@nestjs/testing';
import { LookupController } from './lookup.controller';
import { LookupService } from './lookup.service';

describe('LookupController', () => {
  let controller: LookupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LookupController],
      providers: [LookupService],
    }).compile();

    controller = module.get<LookupController>(LookupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
