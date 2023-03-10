import axios, { AxiosResponse } from "axios";
import { Eventnig } from "./Eventing";
// import { User, UserProps } from "./User";

export class Collection<T, K> {
  models: T[] = [];
  events: Eventnig = new Eventnig();

  constructor(public rootUrl: string, public deserialize: (json: K) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((response: AxiosResponse) => {
      response.data.forEach((value: K) => {
        this.models.push(this.deserialize(value));
      });
      this.trigger("change");
    });
    // const response: AxiosResponse = await axios.get(this.rootUrl);
    // response.data.forEach((value: K) => {
    //   this.models.push(this.deserialize(value));
    // });
    // this.trigger("change");
  }
}
