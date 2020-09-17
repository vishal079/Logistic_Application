export class ClientProfileModule {
  id: string;
  name: string;
  email: string;
  contact: string;
}

export class ClientResetPasswordModule {
  id: string;
  old_password: string;
  new_password: string;
  confirm_password: string;
}