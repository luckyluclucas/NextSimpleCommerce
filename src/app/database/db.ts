import "server-only";
import pool from "./pool";

export async function getProductData(offset: number, limit: number) {
  if (offset === undefined || limit === undefined) {
    throw new Error(
      `one or two arguments are missing out, please provide a limit and an offset`,
    );
  }

  if (isNaN(limit) || isNaN(offset) || limit <= 0 || offset < 0) {
    console.log(limit + offset);
    throw new Error(
      `Invalid Input: Please provide exactly two arguments. Both arguments must be integers greater than zero.`,
    );
  }

  try {
    const Data = await pool.query("SELECT * FROM products LIMIT $1 OFFSET $2", [
      limit,
      offset,
    ]);
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

export async function getProductById(id: number) {
  if (isNaN(parseInt(id))) {
    throw new Error("id should be a number");
  }

  try {
    const Data = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    const product = await Data.rows;
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
