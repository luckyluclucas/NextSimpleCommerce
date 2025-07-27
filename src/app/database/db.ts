import "server-only";
import pool from "./pool";
import { product } from "../types/product";

export async function fetchPaginatedProducts(offset: number, limit: number) {
  if (offset === undefined || limit === undefined) {
    throw new Error(
      `one or two arguments are missing out, please provide a limit and an offset`
    );
  }

  if (isNaN(limit) || isNaN(offset) || limit <= 0 || offset < 0) {
    console.log(limit + offset);
    throw new Error(
      `Invalid Input: Please provide exactly two arguments. Both arguments must be integers greater than zero.`
    );
  }

  try {
    const Data = await pool.query(
      `
      SELECT
        products.*,
        COALESCE(
          json_agg(
            json_build_object(
              'id', product_image.id,
              'imageUrl', product_image.image_url,
              'altText', product_image.alt_text,
              'isMain', product_image.is_main
            )
          ) FILTER (WHERE product_image.id IS NOT NULL),
          '[]'
        ) AS images
      FROM products
      LEFT JOIN product_image ON products.id = product_image.product_id
      GROUP BY products.id
      ORDER BY products.created_at DESC
      LIMIT $1 OFFSET $2;
      `,
      [limit, offset]
    );
    const products = await Data.rows;
    return products;
  } catch (error) {
    throw new Error("error while trying to connect to database");
  }
}

export async function getAllProducts() {
  try {
    const Data = await pool.query("SELECT * FROM products");
    const products = await Data.rows;
    return products;
  } catch (error) {
    throw new Error("error while trying to connect to database");
  }
}

export async function getProductById(id: string): Promise<product | undefined> {
  const iD = parseInt(id);
  if (!Number.isInteger(iD)) {
    throw new Error("id should be a number");
  }

  try {
    const Data = await pool.query(
      `
      SELECT products.*,
      COALESCE(
          json_agg(
            json_build_object(
              'id', product_image.id,
              'imageUrl', product_image.image_url,
              'altText', product_image.alt_text,
              'isMain', product_image.is_main
            )
          ) FILTER (WHERE product_image.id IS NOT NULL),
          '[]'
        ) AS images
      FROM products
      LEFT JOIN product_image ON products.id = product_image.product_id
      WHERE products.id = $1
      GROUP BY products.id;
      `,
      [id]
    );
    const product: product = await Data.rows[0];
    return product;
  } catch (error) {
    console.log("error while trying to connnect to database", error);
  }
}

export async function getTotalNumberOfProducts() {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM products");
    const total = result.rows[0];
    return total.count;
  } catch (error) {
    console.log("error while querying database" + error);
  }
}
