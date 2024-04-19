import { Test, TestingModule } from '@nestjs/testing';
import { LettreDeMotivationController } from './lettre-de-motivation.controller';

describe('LettreDeMotivationController', () => {
  let controller: LettreDeMotivationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LettreDeMotivationController],
    }).compile();

    controller = module.get<LettreDeMotivationController>(LettreDeMotivationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
