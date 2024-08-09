import fastify from "fastify";
import { BookingRepository } from "./bookings/BookingRepository.js";
import { BookingService } from "./bookings/BookingService.js";
import { BookingController } from "./bookings/BookingController.js";
import { UserRepository } from "./auth/UserRepository.js";
import { AuthService } from "./auth/AuthService.js";
import { AuthController } from "./auth/AuthController.js";
export const app = fastify({ logger: true });

const bookingRepository = new BookingRepository();
const bookingService = new BookingService(bookingRepository);
const bookingController = new BookingController(bookingService);

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

const authenticateRouteOptions = {
  preHandler: (request, reply, done) => {
    const token = request.headers.authorization?.replace(/^Bearer /, "");
    if (!token) reply.code(401).send({ message: "Token missing." });

    const user = authService.verifyToken(token);
    if (!user) reply.code(404).send({ message: "Unauthorized: Invalid token." });

    request.user = user;

    done();
  },
};

app.get("/bookings", authenticateRouteOptions, (request, reply) => {
  const { code, body } = bookingController.index(request);
  reply.code(code).send(body);
});

app.post("/bookings/create", authenticateRouteOptions, (request, reply) => {
  const { code, body } = bookingController.save(request);
  reply.code(code).send(body);
});

app.post("/register", (request, reply) => {
  const { code, body } = authController.register(request);
  reply.code(code).send(body);
});

app.post("/login", (request, reply) => {
  const { code, body } = authController.login(request);
  reply.code(code).send(body);
});

app.listen({ port: 3000 }).then(() => {
  console.log("Server listening on port 3000");
});
