import { Injectable } from '@angular/core';
import { jest } from '@jest/globals';
import { Config } from '@vehicles/app/models';
import { ConfigService } from '@vehicles/app/services/config/config.service';
import { Observable, of } from 'rxjs';
import { configMock } from './config.mock';

@Injectable({
  providedIn: 'root',
})
export class ConfigServiceMock extends ConfigService {
  override loadConfig: jest.Mock<() => Observable<Config>> = jest.fn(() => of(configMock));
}
