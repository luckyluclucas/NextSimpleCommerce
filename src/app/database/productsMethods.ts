import "server-only";
import pool from "./pool";
import Decimal from "decimal.js";

type product = {
  title: string;
  stock: number;
  price: Decimal;
  description: string;
};

type image = {
  imageUrl: string;
  altText: string;
  isMain: boolean;
};
export async function CreateProduct(product: product, images: image[]) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const result = await pool.query(
      `INSERT INTO products(title, stock, price, description) VALUES($1, $2, $3, $4) RETURNING id`,
      [product.title, product.stock, product.price, product.description]
    );

    const id = result.rows[0].id;

    if (images.length > 0) {
      const values: any[] = [];
      const placeholders: string[] = [];

      images.forEach((img, i) => {
        const baseIndex = i * 4;
        placeholders.push(
          `($${baseIndex + 1}, $${baseIndex + 2}, $${baseIndex + 3}, $${
            baseIndex + 4
          })`
        );
        values.push(id, img.imageUrl, img.altText, img.isMain);
      });

      const query = `
        INSERT INTO product_image (product_id, image_url, alt_text, is_main)
        VALUES ${placeholders.join(", ")}
      `;

      await client.query(query, values);
    }

    await client.query("COMMIT");
    return true;
  } catch (error) {
    await client.query("ROLLBACK");
    console.log(
      "Error while trying to create a new product on database ",
      error
    );
    return false;
  } finally {
    client.release();
  }
}
