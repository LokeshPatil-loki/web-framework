import axios, { AxiosResponse } from "axios";
import { Eventnig } from "./Eventing";

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User {
  private url: string = "http://localhost:3000/users";
  events: Eventnig = new Eventnig();
  constructor(private data: UserProps) {}

  get(propName: string): string | number {
    return this.data[propName];
  }

  set(update: UserProps): void {
    Object.assign(this.data, update);
  }

  fetch(): void {
    axios.get(`${this.url}/${this.get("id")}`).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }

  save(): void {
    const id = this.get("id");
    if (id) {
      axios.put(`${this.url}/${id}`, this.data);
    } else {
      axios.post(this.url, this.data);
    }
  }
}
