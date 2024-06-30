import { Vehicle, VehicleDetail } from '@vehicles/cars/models';

export const vehicleMock: Vehicle = {
  id: 'xe',
  name: 'JAGUAR XE',
  modelYear: 'k17',
  apiUrl: '/api/vehicles/xe',
  media: [
    {
      name: 'vehicle',
      url: '/images/16x9/xe_k17.jpg',
    },
    {
      name: 'vehicle',
      url: '/images/1x1/xe_k17.jpg',
    },
  ],
};

export const vehicleDetailMock: VehicleDetail = {
  id: 'xe',
  description:
    'The most advanced, efficient and refined sports saloon that Jaguar has ever produced',
  price: '£30,000',
  meta: {
    passengers: 5,
    drivetrain: ['AWD', 'RWD'],
    bodystyles: ['saloon'],
    emissions: {
      template: 'CO2 Emissions $value g/km',
      value: 99,
    },
  },
};
