import { Test, TestingModule } from '@nestjs/testing';
import { LettreDeMotivationService } from './lettre-de-motivation.service';

describe('LettreDeMotivationService', () => {
  let service: LettreDeMotivationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LettreDeMotivationService],
    }).compile();

    service = module.get<LettreDeMotivationService>(LettreDeMotivationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
