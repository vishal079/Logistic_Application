export class adminMaster {
    Id: number;
    name: string;
    phone: string;
    email: string;
    password: string;
    AdminType: number;
    CreatedDate: string;
    CreatedBy: string;
    UpdatedDate: string;
    UpdatedBy: string;
}

export class ResetAdminPassword {
    admin_id: string;
    password: string;
}
