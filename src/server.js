import fastify from "fastify";
import { BookingRepository } from './bookings/BookingRepository.js';
import { BookingService } from './bookings/BookingService.js';
import { BookingController } from "./bookings/BookingController.js";
export const app = fastify({ logger: true });

const bookingRepository = new BookingRepository()
const bookingService = new BookingService(bookingRepository)
const bookingController = new BookingController(bookingService)

app.get('/bookings', (request, reply) => {
  const { code, body } = bookingController.index(request)
  reply.code(code).send(body)
})

app.post('/bookings', (request, reply) => {
  const { code, body } = bookingController.save(request)
  reply.code(code).send(body);
})

app.get('/hello', (request, reply) => {
  reply.send({ message: 'Hello World!' });
});

app.listen({ port: 3000 }).then(() => {
  console.log("Server listening on port 3000");
});
