import { EnvET } from '@vehicles/app/enums';

export interface Config {
  env: EnvET;
  apis: ConfigApis;
}

export interface ConfigApis {
  vehicles: Api;
}

export interface Api {
  baseUrl: string;
}
