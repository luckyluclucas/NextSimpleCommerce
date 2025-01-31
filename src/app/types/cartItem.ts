import { product } from "./product";

type cartItem = product & {
    quantity: number;
}

export default cartItem