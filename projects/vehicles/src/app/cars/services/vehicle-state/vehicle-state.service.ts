import { Injectable, Signal, computed } from '@angular/core';
import { Constructor, StateMixin, emptyBase } from '@vehicles/app/mixins';
import { Entities } from '@vehicles/app/models';
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
      (acc: VechicleState, car: Vehicle) => {
        return {
          ids: [...acc.ids, car.id],
          entities: {
            ...acc.entities,
            [car.id]: { ...car, detail: null },
          },
          loaded: acc.loaded,
          loading: acc.loading,
        };
      },
      {
        ids: vehicleStateInitial.ids,
        entities: {},
        loaded: vehicleStateInitial.loaded,
        loading: vehicleStateInitial.loading,
      } as VechicleState,
    );
  }

  removeVehicleEntity(entityId: string): void {
    if (this.#hasEntities()) {
      const state: VechicleState = this.state();
      const ids: (string | number)[] = state.ids.filter((id: string | number) => id !== entityId);
      const entities = state.entities as Entities<VehicleEntity>;
      delete entities[entityId];
      this.updateState({
        ids,
        entities,
        loaded: state.loaded,
        loading: state.loading,
      });
    }
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
    return this.state().ids.length > 0;
  }
}
