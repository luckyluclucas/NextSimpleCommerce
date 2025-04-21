import "server-only"
import pool from "./pool";
export async function getProductData(){
  
  const Data = await pool.query('SELECT * FROM products')
  const products =  Data.rows
  return products 
}
