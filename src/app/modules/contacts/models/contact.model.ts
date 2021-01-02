import { Identification } from '@core/models';

export interface ContactBaseModel {
  email: string;
  phoneNumber: string;
  address: string;
  country: string;
}

export interface ContactModel extends ContactBaseModel, Identification {}
