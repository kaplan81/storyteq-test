import { Injectable, Signal, computed } from '@angular/core';
import { Constructor, StateMixin, emptyBase } from '@vehicles/app/mixins';
import { Entities, EntityState } from '@vehicles/app/models';
import { VechicleState, Vehicle, VehicleDetail, VehicleEntity } from '@vehicles/cars/models';
import { vehicleStateInitial } from './vehicle-state.initial';

@Injectable({
  providedIn: 'root',
})
export class VehicleStateService extends StateMixin<Constructor, VechicleState>(
  emptyBase,
  vehicleStateInitial,
) {
  getSortedVehicleEntities(): Signal<VehicleEntity[]> {
    return computed<VehicleEntity[]>(() => {
      if (this.#hasEntities()) {
        return this.state().ids.map((id) => (this.state().entities as Entities<VehicleEntity>)[id]);
      } else {
        return [];
      }
    });
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
      } as EntityState<VehicleEntity>,
    );
  }

  updateVehicleEntityDetail(detail: VehicleDetail): void {
    if (this.#hasEntities()) {
      this.updateStateProp('entities', {
        ...this.state().entities,
        [detail.id]: {
          ...(this.state().entities as Entities<VehicleEntity>)[detail.id],
          detail,
        },
      });
    }
  }

  #hasEntities(): boolean {
    return this.state().entities !== null;
  }
}
