import { EnvET } from '@vehicles/app/enums';

export interface Config {
  env: EnvET;
  apis: Apis;
}

export interface Apis {
  vehicles: Api;
}

export interface Api {
  baseUrl: string;
}
