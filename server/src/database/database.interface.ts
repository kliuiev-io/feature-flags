export interface FlagBase {
  description: string;
  defaultState: boolean;
}

export type Flag = FlagBase & {
  id: string;
};

export type Flags = { [key: string]: Flag };

export interface GroupBase {
  name: string;
  description: string;
}

export type Group = GroupBase & {
  id: string;
  flags: string[];
};

export interface User {
  email: string;
  groups: string[];
  flags: string[];
}

export interface Instance {
  flags: Flags;
  groups: Group[];
  users: User[];
}

export type Instances = { [key: string]: Instance };
