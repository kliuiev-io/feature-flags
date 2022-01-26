import fetch from 'node-fetch';

import { FeatureFlagsBase, SYMBOL_FLAGS } from "./tech/base";
import { Flags } from "./tech/types";

export class FeatureFlags extends FeatureFlagsBase {
  async initialize() {
    const response = await fetch(this.url);

    if (!response.ok) throw new Error(`Can't connect to feature flags server! HTTP: ${response.status} ${response.statusText}`);

    const flags = await response.json() as Flags;

    this[SYMBOL_FLAGS] = flags;
  }
}

export default function (url: string) {
  return new FeatureFlags(url);
}