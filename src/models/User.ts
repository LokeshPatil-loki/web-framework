import { Model } from "./Model";
import { Attributes } from "./Attributes";
import { Eventnig } from "./Eventing";
import { APISync } from "./APISync";
import { Collection } from "./Collection";

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}
const rootUrl: string = "http://localhost:3000/users";

export class User extends Model<UserProps> {
  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(rootUrl, User.buildUser);
  }

  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventnig(),
      new APISync<UserProps>(rootUrl)
    );
  }

  isAdminUser(): boolean {
    return this.get("id") === 1;
  }
}
