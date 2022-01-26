export const SYMBOL_FLAGS = Symbol('flags');

export abstract class FeatureFlagsBase {
  protected [SYMBOL_FLAGS]: string[] = [];

  constructor(protected readonly url: string) {}

  abstract initialize(): Promise<void>;

  checkFlag(flag: string) {
    return this[SYMBOL_FLAGS].includes(flag);
  }

  get flags() {
    return [...this[SYMBOL_FLAGS]];
  }
}
