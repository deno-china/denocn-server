import { Model } from "../common/orm.ts";

export const User = new Model("users", {
    id: { type: Number, primary: true },
    name: { type: String },
});