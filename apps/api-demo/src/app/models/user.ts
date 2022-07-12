import {ObjectId} from "mongodb";

export class User {
  constructor(public username: string, gender: string, role:string, password: string, public id?: ObjectId) {
  }
}
