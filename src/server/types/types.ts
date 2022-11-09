export interface UserStructure {
  username: string;
  password: string;
  email: string;
}

export interface UserTokenPayload {
  id: string;
  username: string;
}
