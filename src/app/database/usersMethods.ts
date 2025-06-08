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
      [email, username]
    );

    if (userExists.rowCount != null) {
      return { message: "Invalid Credentials" };
    }
  } catch (error) {
    console.log("error on database query", error);
    throw Error;
  }

  try {
    const { rows } = await pool.query(
      "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING name, image;",
      [username, email, password]
    );
    console.log(rows[0]);
    return rows[0];
  } catch (error) {
    console.log("Database query failed: ", error);
    throw error;
  }
}

export async function AuthenticateUser(email: string, password: string) {
  if (!email || !password) {
    console.log(email, password);
    throw new Error(
      "INVALID CREDENTIALS, ONE OR TWO OF THE INPUTS ARE MISSING OR UNDEFINED"
    );
  }
  try {
    const e = email.toLowerCase().trim().toString();
    const result = await pool.query(
      "SELECT name, id, image, password FROM users WHERE email = $1",
      [e]
    );
    let user = result.rows[0];
    if (!user) {
      throw new Error("user does not exists");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      console.log("password is incorrect");
      throw new Error("invalid credentials");
    }

    const { password: _, ...userWithoutPass } = user;
    user = userWithoutPass;
    return user;
  } catch (error) {
    console.log("error on fetching database", error);
    return;
  }
}

export async function updateUserImage(userId: string, image: string) {
  const id = parseInt(userId);

  if (typeof id !== "number" || Number.isNaN(id)) {
    throw new Error("invalid id");
  }

  try {
    const result = await pool.query(
      "UPDATE users SET image = $1 WHERE id = $2",
      [image, id]
    );

    return;
  } catch (error) {
    console.log("error fetching database", error);
    return false;
  }
}

export async function getUserRole(userId: string): Promise<string | boolean> {
  const id = parseInt(userId);

  if (isNaN(id) || typeof id !== "number") {
    return false;
  }

  try {
    const result = await pool.query("SELECT role FROM users WHERE id = $1", [
      id,
    ]);
    const { role } = result.rows[0];
    return role;
  } catch (error) {
    console.log("error while fetching database", error);
    return false;
  }
}
