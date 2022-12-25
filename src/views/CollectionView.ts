import { Collection } from "../models/Collection";
import { HasId, Model } from "../models/Model";

export abstract class CollectionView<Type, TypeProp extends HasId> {
  constructor(public parent: Element, public collection: Collection<Type, TypeProp>) {
    // console.log(this.collection.models.keys());
  }
  abstract renderItem(model: Type, itemParent: Element): void;
  render(): void {
    // this.collection.models.forEach((model: Type) => {
    //   const div = document.createElement("div");
    //   this.renderItem(model, div);
    //   this.parent.appendChild(div);
    //   console.log(model.attr.data);
    // });
    for (let model of this.collection.models) {
      if (model instanceof Model<TypeProp>) {
        const div = document.createElement("div");
        div.id = model.get("id");
        this.renderItem(model, div);
        console.log(div);
        this.parent.appendChild(div);
      }
    }
  }
}
