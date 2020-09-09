import { clientAddresstMaster, clientDeliveryAddresstMaster, clientDeliveryAddresstListMaster } from './client-address-master.module';
import { FormGroup, FormArray } from '@angular/forms';

export class clientJobMaster {
  Id: number;
  client_id: string;
  user_id: string;
  job_title: string;
  is_multi_location: string;
  job_type: number;
  pickup_location_id: number;
  delivery_location_id: number;
  pick_up_location: clientAddresstMaster;
  delivery_location: clientDeliveryAddresstListMaster[];
  phone: string;
  contact_person: number;
  vehicle_type: number;
  delivery_type: number;
  other_details: string;
  company_id: string;
  schedule_date: string;
}

export class listSubCompany {
  id: number;
  name: string;
}

export class listVehicleType {
  id: number;
  type: string;
}

export class listPickupAddress {
  id: number;
  address: string;
}

export class listContactPerson {
  id: number;
  name: string;
}

