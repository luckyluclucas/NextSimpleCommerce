import { product } from "./product";

export default interface cartItem {
  product: product;
  quantity: number;
  productId: product["id"];
}
