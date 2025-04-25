import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { Pool } = require("pg");
import { faker } from "@faker-js/faker";

export async function seedFakeProductsOnDatabase(TotalNumberOfproducts) {
  const ProductsToBeInserted = [];
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  function CreateFakeProduct(TotalNumberOfproducts) {
    for (let i = 0; i < TotalNumberOfproducts; i++) {
      const product = {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({ min: 100, max: 10000 }),
        stock: Math.floor(Math.random() * 100),
        image:
          "https://images.unsplash.com/photo-1722888061836-b3bae5fc5320?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      };
      ProductsToBeInserted.push(product);
    }
  }

  async function seedProducts() {
    const values = [];

    const placeholders = ProductsToBeInserted.map((_, i) => {
      const base = i * 5;
      values.push(
        ProductsToBeInserted[i].title,
        ProductsToBeInserted[i].description,
        ProductsToBeInserted[i].price,
        ProductsToBeInserted[i].stock,
        ProductsToBeInserted[i].image,
      );

      return `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4}, $${base + 5})`;
    });

    const query = `INSERT INTO products (title, description, price, stock, image) VALUES ${placeholders.join(", ")}`;
    console.log("seeding products...");
    await pool.query(query, values);
    await pool.end();
    console.log(
      `succesfully inserted ${TotalNumberOfproducts} in table products`,
    );
  }

  CreateFakeProduct(TotalNumberOfproducts);
  await seedProducts();
}

seedFakeProductsOnDatabase(100);
