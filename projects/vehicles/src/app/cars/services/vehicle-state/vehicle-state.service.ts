import { Injectable } from '@angular/core';
import { Constructor, StateMixin, emptyBase } from '@vehicles/app/mixins';
import { VechicleState } from '@vehicles/cars/models';
import { vehicleStateInitial } from './vehicle-state.initial';

@Injectable({
  providedIn: 'root',
})
export class VehicleStateService extends StateMixin<Constructor, VechicleState>(
  emptyBase,
  vehicleStateInitial
) {}
