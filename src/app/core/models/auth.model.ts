export interface Token {
  refreshToken: string;
  accessToken: string;
}

export class Login {
  email: string;
  password: string;
}
