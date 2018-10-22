interface DefaultResponse {
  result: any;
  success: boolean;
}

namespace AuthPayload {
  export interface Request {
    username: string;
    password: string;
  }

  export interface Response extends DefaultResponse {
    result: AuthResponse;
  }

  interface AuthResponse {
    token: string;
  }
}
