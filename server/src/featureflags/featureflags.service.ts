import { Injectable, NotFoundException } from '@nestjs/common';

const mockFlags: { [key: string]: boolean } = {};

@Injectable()
export class FeatureFlagsService {
  checkFlag(flagName: string): boolean {
    if (typeof mockFlags[flagName] === 'undefined')
      throw new NotFoundException();

    return mockFlags[flagName];
  }

  setFlag(flagName: string, value: boolean) {
    mockFlags[flagName] = value;
  }

  deleteFlag(flagName: string) {
    if (typeof mockFlags[flagName] === 'undefined')
      throw new NotFoundException();

    delete mockFlags[flagName];
  }
}
