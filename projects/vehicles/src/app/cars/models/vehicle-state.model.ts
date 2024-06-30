import { EntityState } from '@vehicles/app/models';
import { Vehicle, VehicleDetail } from '@vehicles/cars/models';

export interface VechicleState extends EntityState<VehicleEntity> {
  loaded: boolean;
  loading: boolean;
}

export interface VehicleEntity extends Vehicle {
  detail: VehicleDetail | null;
}
