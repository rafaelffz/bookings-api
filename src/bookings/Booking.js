import { v4 as uuidv4 } from 'uuid';

export class Booking {
  constructor(roomId, guestName, checkInDate, checkOutDate) {
    this.id = uuidv4();
    this.roomId = roomId;
    this.guestName = guestName;
    this.checkInDate = checkInDate;
    this.checkOutDate = checkOutDate;
  }
}