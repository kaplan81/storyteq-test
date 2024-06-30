import { IdData, NameData } from '@vehicles/app/models';

export interface Vehicle extends NameData<string> {
  modelYear: string;
  apiUrl: string;
  media: VehicleMedia[];
}

export interface VehicleMedia {
  name: string;
  url: string;
}

export interface VehicleDetail extends IdData<string> {
  description: string;
  price: string;
  meta: VehicleDetailMeta;
}

export interface VehicleDetailMeta {
  passengers: number;
  drivetrain: string[];
  bodystyles: string[];
  emissions: VehicleDetailEmissions;
}

export interface VehicleDetailEmissions {
  template: string;
  value: number;
}
