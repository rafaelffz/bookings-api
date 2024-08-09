export class AuthController {
  constructor(service) {
    this.service = service;
  }

  register(request) {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return { code: 400, body: { message: "Name, email and password are required." } };
    }

    try {
      const user = this.service.register(name, email, password);
      return { code: 201, body: { message: "User created successfully.", user } };
    } catch (error) {
      return { code: 400, body: { message: error.message } };
    }
  }

  login(request) {
    const { email, password } = request.body;

    if (!email || !password) {
      return { code: 400, body: { message: "Email and password are required." } };
    }

    try {
      const body = this.service.login(email, password);

      return { code: 200, body: { message: "User logged in successfully.", body } };
    } catch (error) {
      return { code: 400, body: { message: error.message } };
    }
  }
}
