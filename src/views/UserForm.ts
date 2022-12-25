import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UseForm extends View<User, UserProps> {
  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  onSetNameClick = (): void => {
    const input = this.parent.querySelector("input");
    if (input) {
      const name = input.value;
      this.model.set({ name });
    }
  };

  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.set-age": this.onSetAgeClick,
      "click:.set-name": this.onSetNameClick,
      "click:.save": this.onSaveClick,
    };
  }

  onSaveClick = (): void => {
    this.model.save();
  };

  template(): string {
    return `
      <div>
        <input placeholder="${this.model.get("name")}" />
        <button class='set-name'>Change Name</button>
        <button class='set-age'>Set random age</button>
        <button class='save'>Save</button>
      </div>
    `;
  }
}
