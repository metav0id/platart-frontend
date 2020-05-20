interface Roles {
  reader: boolean;
  author?: boolean;
  admin?: boolean;
}

export interface UserFirebase {
  email: string;
  password: string;
  name: string;
  role: Roles;
}
