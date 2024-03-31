export interface CreateUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserWithToken extends User {
  token: string;
}

export interface LoginBody {
  email: string;
  password: string;
}
