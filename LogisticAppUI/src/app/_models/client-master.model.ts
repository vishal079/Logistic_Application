export class clientMaster {
    Id: number;
    name: string;
    phone: string;
    email: string;
    password: string;
    line1: string;
    line2: string;
    postal_code: string;
    city: string;
    state: string;
    country: string;
    Description: string;
    ClientType: number;
    CreatedDate: string;
    CreatedBy: string;
    UpdatedDate: string;
    UpdatedBy: string;
}

export class ResetClientPassword {
    client_id: string;
    password: string;
}