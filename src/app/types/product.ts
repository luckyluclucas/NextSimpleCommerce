import { Decimal } from "decimal.js";

export type image = {
  imageUrl: string;
  altText: string;
  isMain: boolean;
};
export interface product {
  images: image[];
  id: number;
  title: string;
  description: string;
  price: Decimal;
  tags?: string | string[];
  isInPromotion: boolean;
}
