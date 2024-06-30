import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vehicleStateInitial } from '@vehicles/cars/services/vehicle-state/vehicle-state.initial';
import { VehicleServiceMock, vehicleDetailMock, vehicleMock } from '@vehicles/cars/test';
import { VehicleService } from '../../services/vehicle/vehicle.service';
import { CarsComponent } from './cars.component';

describe('CarsComponent', () => {
  let fixture: ComponentFixture<CarsComponent>;
  let carsComponent: CarsComponent;
  let getCarsSpy: jest.SpyInstance;
  let vehicleService: VehicleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarsComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: VehicleService, useClass: VehicleServiceMock },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(CarsComponent);
    carsComponent = fixture.componentInstance;
    vehicleService = TestBed.inject(VehicleService);
    getCarsSpy = jest.spyOn(vehicleService, 'getCars');
  });

  it('should match snapshot', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should have called for cars', () => {
    expect(carsComponent.vehicleState()).toEqual(vehicleStateInitial);
    expect(getCarsSpy).toHaveBeenCalled();
  });

  describe('getPrice()', () => {
    it('should get the right string to display in price field', () => {
      expect(carsComponent.getPrice({ ...vehicleMock, detail: null })).toBe('No price available');
      expect(carsComponent.getPrice({ ...vehicleMock, detail: vehicleDetailMock })).toBe(
        `From ${vehicleDetailMock.price}`,
      );
    });
  });
});
