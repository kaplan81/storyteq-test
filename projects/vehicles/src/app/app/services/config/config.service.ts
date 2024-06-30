import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EnvET } from '@vehicles/app/enums';
import { Config, ConfigApis } from '@vehicles/app/models';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  static configFileparams = new HttpParams()
    .set('configRequest', 'jsonFile')
    .append('v', `${new Date().getTime()}`);
  #http = inject(HttpClient);
  #config: Config | null = null;

  getApisConfig(): ConfigApis {
    this.#checkConfig();
    return (this.#config as Config).apis;
  }

  getEnvConfig(): EnvET {
    this.#checkConfig();
    return (this.#config as Config).env;
  }

  loadConfig(): Observable<Config> {
    // Request config if it is not in memory.
    if (this.#config !== null) {
      return of(this.#config);
    }
    const url = 'config/config.json';
    return this.#http
      .get<Config>(url, {
        params: ConfigService.configFileparams,
      })
      .pipe(
        tap((config: Config) => (this.#config = config)),
        catchError((error) => {
          throw Error(`Error while loading config. Details: ${JSON.stringify(error)}`);
        }),
      );
  }

  #checkConfig(): void {
    if (this.#config === null) {
      throw Error('Config should be set during app initialization.');
    }
  }
}
