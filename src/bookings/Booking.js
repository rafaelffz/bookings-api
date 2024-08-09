import { v4 as uuidv4 } from "uuid";

export class Booking {
  constructor({ id, user, roomId, guestName, checkInDate, checkOutDate }) {
    this.id = id ?? uuidv4();
    this.user = user;
    this.roomId = roomId;
    this.guestName = guestName;
    this.checkInDate = checkInDate;
    this.checkOutDate = checkOutDate;
  }
}
