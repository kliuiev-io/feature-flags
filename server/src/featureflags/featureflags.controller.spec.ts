import { Test, TestingModule } from '@nestjs/testing';
import { FeatureFlagsController } from './featureflags.controller';

describe('FeatureflagsController', () => {
  let controller: FeatureFlagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeatureFlagsController],
    }).compile();

    controller = module.get<FeatureFlagsController>(FeatureFlagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
