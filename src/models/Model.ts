import { AxiosPromise, AxiosResponse } from "axios";

export interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

export interface ModelAttributes<T> {
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
  set(update: T): void;
}

export interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

export interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(private attr: ModelAttributes<T>, private events: Events, private sync: Sync<T>) {}

  on = this.events.on;

  trigger = this.events.trigger;

  get = this.attr.get;

  set(update: T): void {
    this.attr.set(update);
    this.trigger("change");
  }

  fetch(): void {
    const id = this.get("id");
    if (typeof id !== "number") {
      throw new Error("Cannot fetch without an id");
    }
    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }

  save(): void {
    this.sync
      .save(this.attr.getAll())
      .then((response: AxiosResponse) => this.trigger("save"))
      .catch((err) => this.trigger("err"));
  }
}
