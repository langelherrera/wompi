import { Test, TestingModule } from '@nestjs/testing';
import { WompiController } from './wompi.controller';
import { WompiService } from './wompi.service';

describe('WompiController', () => {
  let controller: WompiController;
  let service: WompiService;

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

  describe('getAcceptanceToken', () => {
    it('should return an acceptance token', async () => {
      const mockToken = 'mock_acceptance_token';
      (service.acceptanceToken as jest.Mock).mockResolvedValue(mockToken); 

      const result = await controller.getAcceptanceToken();

      expect(result).toBe(mockToken); 
      expect(service.acceptanceToken).toHaveBeenCalled(); 
    });
  });
});
