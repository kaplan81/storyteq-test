import { VechicleState } from '@vehicles/cars/models';
import { vehicleStateInitial } from '../../services/vehicle-state/vehicle-state.initial';
import { vehicleDetailMock, vehicleMock } from './vehicle.mock';

export const vehicleStateMock: VechicleState = {
  ...vehicleStateInitial,
  ids: [vehicleMock.id],
  entities: {
    [vehicleMock.id]: {
      ...vehicleMock,
      detail: vehicleDetailMock,
    },
  },
};
