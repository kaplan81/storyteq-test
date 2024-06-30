import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { Config } from '@vehicles/app/models';
import { configMock } from '@vehicles/app/test';
import { of } from 'rxjs';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let configService: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    configService = TestBed.inject(ConfigService);
    configService.loadConfig = jest.fn(() => of(configMock));
  });

  it('can be instantiated via DI', inject([ConfigService], (injectedService: ConfigService) => {
    expect(injectedService).toBe(configService);
  }));

  describe('loadConfig()', () => {
    it('fetches config', (done: jest.DoneCallback) => {
      configService.loadConfig().subscribe((config: Config) => {
        expect(config).toStrictEqual(configMock);
        done();
      });
    });
  });
});
