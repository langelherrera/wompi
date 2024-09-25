import { Test, TestingModule } from '@nestjs/testing';
import { WompiService } from './wompi.service';
import axios from 'axios';

describe('WompiService', () => {
  let service: WompiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WompiService],
    }).compile();

    service = module.get<WompiService>(WompiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('acceptanceToken', () => {
    it('should return an acceptance token when the request is successful', async () => {
      
      const mockResponse = {
        status: 200,
        data: {
          data: {
            presigned_acceptance: {
              acceptance_token: 'mock_acceptance_token',
            },
          },
        },
      };

      (axios.get as jest.Mock).mockResolvedValue(mockResponse);

      
      const token = await service.acceptanceToken();

      
      expect(token).toBe('mock_acceptance_token');
      expect(axios.get).toHaveBeenCalledWith(`${"https://api-sandbox.co.uat.wompi.dev/v1"}/merchants/${"pub_stagint_fjIqRyHmHvmqYgPFCO5nibfrtraL6ixq"}`);
    });

    it('should throw an error if the request fails', async () => {
     
      (axios.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

      await expect(service.acceptanceToken()).rejects.toThrow('Network Error');
    });
  });
});
