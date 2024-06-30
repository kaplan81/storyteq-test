import { Injectable } from '@angular/core';
import { Constructor, StateMixin, emptyBase } from '@vehicles/app/mixins';
import { VechiclesState } from '@vehicles/cars/models';
import { vehicleStateInitial } from './vehicle-state.initial';

@Injectable({
  providedIn: 'root',
})
export class VehiclesStateService extends StateMixin<
  Constructor,
  VechiclesState
>(emptyBase, vehicleStateInitial) {}
