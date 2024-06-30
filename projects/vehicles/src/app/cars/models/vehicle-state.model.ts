import { EntityState } from '@vehicles/app/models';
import { Vehicle, VehicleDetail } from '@vehicles/cars/models';

export interface VechiclesState extends EntityState<VehicleEntity> {}

export interface VehicleEntity extends Vehicle {
  detail: VehicleDetail | null;
}
