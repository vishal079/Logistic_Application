
export class clientAddresstMaster {
  id: number;
  client_id: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone: string;
  name: string;
  isExisting: string;
  delivery_address_id: string;
}

export class ClientJobModule {
  id: string;
  staff_id: string;
}

export class clientJobMaster {
  Id: number;
  client_id: string;
  user_id: string;
  job_title: string;
  is_multi_location: string;
  job_type: number;
  pickup_location_id: number;
  pick_up_location: clientAddresstMaster;
  delivery_location: clientAddresstMaster[];
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

