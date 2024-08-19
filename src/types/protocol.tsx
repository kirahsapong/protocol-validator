export type ProtocolDefinition = {
  protocol: string;
  published: boolean;
  types: ProtocolTypes;
  structure: {
    [key: string]: ProtocolRuleSet;
  }
};

type ProtocolType = {
  schema?: string,
  dataFormats?: string[],
};

type ProtocolTypes = {
  [key: string]: ProtocolType;
};

export enum ProtocolActor {
  Anyone = 'anyone',
  Author = 'author',
  Recipient = 'recipient'
}

export enum ProtocolAction {
  CoDelete = 'co-delete',
  CoPrune = 'co-prune',
  CoUpdate = 'co-update',
  Create = 'create',
  Delete = 'delete',
  Prune = 'prune',
  Query = 'query',
  Read = 'read',
  Subscribe = 'subscribe',
  Update = 'update'
}

type ProtocolActionRule = {
  who?: string,
  role?: string;
  of?: string;
  can: string[];
};

type ProtocolPathEncryption = {
  rootKeyId: string;
  publicKeyJwk: PublicJwk;
};

type Jwk = {
  alg?: string;
  kid?: string;
  kty: string;
};

type PublicJwk = Jwk & {
  crv: 'Ed25519' | 'secp256k1' | 'P-256';
  x: string;
  y?: string;
};

type ProtocolRuleSet = {
  $encryption?: ProtocolPathEncryption;
  $actions?: ProtocolActionRule[];
  $role?: boolean;
  $size?: {
    min?: number,
    max?: number
  }
  $tags?: {
    $requiredTags?: string[],
    $allowUndefinedTags?: boolean;
    [key: string]: any;
  }
  [key: string]: any;
};

export enum ProtocolRuleSetKeys {
  ENCRYPTION = '$encryption',
  ACTIONS = '$actions',
  ROLE = '$role',
  SIZE = '$size',
  TAGS = '$tags',
}