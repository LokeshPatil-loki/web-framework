import axios, { AxiosResponse } from "axios";
import { Attributes } from "./Attributes";
import { Eventnig } from "./Eventing";
import { Sync } from "./Sync";

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}
const rootUrl: string = "http://localhost:3000/users";

export class User {
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  public events: Eventnig = new Eventnig();
  public attributes: Attributes<UserProps>;
  constructor(attr: UserProps) {
    this.attributes = new Attributes<UserProps>(attr);
  }
}
