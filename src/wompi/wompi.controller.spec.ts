import { Test, TestingModule } from '@nestjs/testing';
import { WompiController } from './wompi.controller';
import { WompiService } from './wompi.service';

describe('WompiController', () => {
  let controller: WompiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WompiController],
      providers: [WompiService],
    }).compile();

    controller = module.get<WompiController>(WompiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
