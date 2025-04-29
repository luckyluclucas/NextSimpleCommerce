import "server-only";
import pool from "./pool";
import bcrypt from "bcryptjs";

export async function CreateUser(userData: {
  username: string;
  email: string;
  password: string;
}) {
  const username = userData.username;
  const email = userData.email;
  const salt = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync(userData.password, salt);

  try {
    const userExists = await pool.query(
      "SELECT 1 FROM users WHERE email = $1 OR name = $2 LIMIT 1;",
      [email, username],
    );

    if (userExists.rowCount > 0) {
      throw new Error("Username or email already in use");
      return { message: "Invalid Credentials" };
    }
  } catch (error) {
    console.log("error on database query", error);
    throw Error;
  }

  try {
    const { rows } = await pool.query(
      "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING name, image;",
      [username, email, password],
    );
    console.log(rows[0]);
    return rows[0];
  } catch (error) {
    console.log("Database query failed: ", error);
    throw error;
  }
}
