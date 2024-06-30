import { Injectable } from '@angular/core';
import { Constructor, StateMixin, emptyBase } from '@vehicles/app/mixins';
import { Entities, EntityState } from '@vehicles/app/models';
import {
  VechicleState,
  Vehicle,
  VehicleDetail,
  VehicleEntity,
} from '@vehicles/cars/models';
import { vehicleStateInitial } from './vehicle-state.initial';

@Injectable({
  providedIn: 'root',
})
export class VehicleStateService extends StateMixin<Constructor, VechicleState>(
  emptyBase,
  vehicleStateInitial
) {
  updateVehicleEntityDetail(detail: VehicleDetail): void {
    if (this.state().entities !== null) {
      this.updateStateProp('entities', {
        ...this.state().entities,
        [detail.id]: {
          ...(this.state().entities as Entities<VehicleEntity>)[detail.id],
          detail,
        },
      });
    }
  }

  parseVehiclesToState(cars: Vehicle[]): VechicleState {
    return cars.reduce(
      (acc: EntityState<VehicleEntity>, car: Vehicle) => {
        return {
          ids: [...acc.ids, car.id],
          entities: {
            ...acc.entities,
            [car.id]: { ...car, detail: null },
          },
        };
      },
      {
        ids: [],
        entities: {},
      } as EntityState<VehicleEntity>
    );
  }
}
