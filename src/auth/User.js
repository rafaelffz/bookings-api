import { v4 as uuidv4 } from "uuid";

export class User {
  constructor({ id, name, email, password }) {
    this.id = id ?? uuidv4();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
