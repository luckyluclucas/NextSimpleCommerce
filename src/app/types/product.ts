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
  price: string;
  tags?: string | string[];
}
