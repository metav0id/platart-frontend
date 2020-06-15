import {Marcador} from "../manager-king/manager-map/components/marker.class";

interface Roles {
  reader: boolean;
  warehouse?: boolean;
  manager?: boolean;
  shop?: boolean;
}

export interface UserFirebase {
  uid?: string;
  email: string;
  password?: string;
  displayName: string;
  role?: Roles;
  emailVerified?: boolean;
}
