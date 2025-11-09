enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
  PATIENT = 'PATIENT'
}

export type IUser = {
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
};
