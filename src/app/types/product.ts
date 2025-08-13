import { Decimal } from "decimal.js";

export type image = {
  imageUrl: string;
  altText: string;
  isMain: boolean;
};

export type mouseDetails = {
  brand: string;
  model_name: string;
  switches: string;
  mcu: string;
  sensor: string;
  weight: number;
  wireless: boolean;
  pollingrate: number;
};

export type keyboardDetails = {
  brand: string;
  model_name: string;
  switches: string;
  layout: string;
  language: string;
  isMagnetic: boolean;
  isMechanical: boolean;
  wireless: boolean;
  pollingrate: number;
};
export interface product {
  images: image[];
  id: number;
  title: string;
  description: string;
  price: Decimal;
  tags?: string | string[];
  isInPromotion: boolean;
  width: number;
  height: number;
  length: number;
  weight: number;
  type: string;
  categories: string[];
  typeDetails: mouseDetails | keyboardDetails;
}
