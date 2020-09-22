interface Request {
  username: string;
  password: string;
}

class AuthenticationService {
  public async execute({ username, password }: Request): Promise<void> {}
}

export default AuthenticationService;
