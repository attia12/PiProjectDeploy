import { Test, TestingModule } from '@nestjs/testing';
import { ClarifaiService } from './clarifai.service';

describe('ClarifaiService', () => {
  let service: ClarifaiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClarifaiService],
    }).compile();

    service = module.get<ClarifaiService>(ClarifaiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
