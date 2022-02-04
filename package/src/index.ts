const fetchFunction = typeof fetch === 'function' ? fetch : require('node-fetch');

export type Flag = string;
export type Flags = Flag[];

export const SYMBOL_FLAGS = Symbol('flags');

export class FeatureFlags {
  protected [SYMBOL_FLAGS]: string[] = [];

  constructor(protected readonly url: string) {}

  async initialize() {
    const response = await fetchFunction(this.url);

    if (!response.ok) throw new Error(`Can't connect to feature flags server! HTTP: ${response.status} ${response.statusText}`);

    const flags = await response.json() as Flags;

    this[SYMBOL_FLAGS] = flags;
  }

  checkFlag(flag: string) {
    return this[SYMBOL_FLAGS].includes(flag);
  }

  get flags() {
    return [...this[SYMBOL_FLAGS]];
  }
}

export default function (url: string) {
  return new FeatureFlags(url);
}