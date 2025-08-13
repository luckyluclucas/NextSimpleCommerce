import "server-only";
import pool from "./pool";
import Decimal from "decimal.js";
import { keyboardDetails, mouseDetails } from "../types/product";

type product = {
  title: string;
  stock: number;
  price: Decimal;
  description: string;
  width: Decimal;
  height: Decimal;
  length: Decimal;
  weight: Decimal;
  type: string;
  categories: string[];
  typeDetails: mouseDetails | keyboardDetails;
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

    const { rows } = await client.query(
      "SELECT id FROM product_types WHERE name = $1",
      [product.type]
    );
    if (rows.length === 0) {
      throw new Error(
        `Type of product invalid, the type ${product.type} does not exists`
      );
    }

    const productTypeId = rows[0].id;

    const result = await client.query(
      `INSERT INTO products(title, stock, price, description, width, height, length, weight, product_type) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
      [
        product.title,
        product.stock,
        product.price.toNumber(),
        product.description,
        product.width.toNumber(),
        product.height.toNumber(),
        product.length.toNumber(),
        product.weight.toNumber(),
        productTypeId,
      ]
    );

    const productId = result.rows[0].id;

    for (const category of product.categories) {
      const { rows } = await client.query(
        "SELECT id FROM categories WHERE name = $1",
        [category]
      );

      if (rows.length === 0) {
        throw new Error(`Category does not exists: ${category}`);
      }

      const categoryId = rows[0].id;

      await client.query(
        "INSERT INTO product_categories (category_id, product_id) VALUES($1, $2)",
        [categoryId, productId]
      );
    }

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
        values.push(productId, img.imageUrl, img.altText, img.isMain);
      });

      const query = `
        INSERT INTO product_image (product_id, image_url, alt_text, is_main)
        VALUES ${placeholders.join(", ")}
      `;

      await client.query(query, values);

      if (product.type === "mouse") {
        const typeDetails = product.typeDetails as mouseDetails;
        const result = await client.query(
          `
          INSERT INTO mouse_details (product_id, brand, model_name, switches, mcu,sensor, weight, wireless, pollingrate)
           VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [
            productId,
            typeDetails.brand,
            typeDetails.model_name,
            typeDetails.switches,
            typeDetails.mcu,
            typeDetails.sensor,
            typeDetails.weight,
            typeDetails.wireless,
            typeDetails.pollingrate,
          ]
        );
      }
      if (product.type === "keyboard") {
        const typeDetails = product.typeDetails as keyboardDetails;
        const result = await client.query(
          `
          INSERT INTO mouse_details (product_id, brand, model_name, switches, layout,language, isMagnetic, isMechanical, wireless, pollingrate)
           VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          [
            productId,
            typeDetails.brand,
            typeDetails.model_name,
            typeDetails.switches,
            typeDetails.layout,
            typeDetails.language,
            typeDetails.isMagnetic,
            typeDetails.isMechanical,
            typeDetails.wireless,
            typeDetails.pollingrate,
          ]
        );
      }
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

export async function getCategories() {
  const client = await pool.connect();

  try {
    const categoriesRawData = await client.query("SELECT * FROM categories");
    const categories = categoriesRawData.rows.map((row) => row.name as string);
    return categories;
  } catch (e) {
    console.log("Error while trying to fetch categories on data base", e);
    return [];
  } finally {
    client.release();
  }
}

export async function getProductTypes() {
  const client = await pool.connect();

  try {
    const productTypesRawData = await client.query(
      "SELECT * FROM product_types"
    );
    const productTypes = productTypesRawData.rows.map(
      (row) => row.name as string
    );
    return productTypes;
  } catch (e) {
    console.log("Error while trying to fetch product types on data base", e);
    return [];
  } finally {
    client.release();
  }
}
