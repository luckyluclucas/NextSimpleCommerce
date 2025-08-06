/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */

exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("users", {
    id: "id",
    name: {
      type: "varchar(255)",
      unique: true,
      notNull: true,
    },
    email: { type: "varchar(255)", unique: true, notNull: true },
    emailVerified: { type: "timestamp" },
    image: { type: "TEXT" },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    password: { type: "text" },
    role: { type: "varchar(50)", notNull: true, default: "user" },
  });

  pgm.createTable("sessions", {
    id: "id",
    userId: {
      type: "integer",
      notNull: true,
      references: "users(id)",
      onDelete: "CASCADE",
    },
    expires: { type: "timestamp", notNull: true },
    sessionToken: { type: "varchar(255)", notNull: true },
  });

  pgm.createTable("accounts", {
    id: "id",
    userId: {
      type: "integer",
      notNull: true,
      references: "users(id)",
      onDelete: "CASCADE",
    },
    type: { type: "varchar(255)", notNull: true },
    provider: { type: "varchar(255)", notNull: true },
    providerAccountId: { type: "varchar(255)", notNull: true },
    refresh_token: { type: "text" },
    access_token: { type: "text" },
    expires_at: { type: "BIGINT" },
    id_token: { type: "text" },
    scope: { type: "text" },
    session_state: { type: "text" },
    token_type: { type: "text" },
  });

  pgm.createTable(
    "verification_token",
    {
      identifier: { type: "text", notNull: true },
      expires: { type: "timestamp", notNull: true },
      token: { type: "text", notNull: true },
    },
    { primaryKey: ["identifier", "token"] }
  );

  pgm.createTable("products", {
    id: "id",
    title: { type: "varchar(255)", notNull: true },
    price: { type: "decimal(10, 4)", notNull: true },
    description: { type: "text", notNull: true },
    stock: { type: "integer", notNull: true },
    width: { type: "numeric(10,2)", notNull: true },
    height: { type: "numeric(10,2)", notNull: true },
    length: { type: "numeric(10,2)", notNull: true },
    weight: { type: "numeric(10,3)", notNull: true },
    isActive: { type: "boolean", default: true },
    is_freeShipping_enable: { type: "boolean", default: false },
    is_in_promotion: { type: "boolean", default: false },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });

  pgm.createTable("product_image", {
    id: "id",
    product_id: {
      type: "integer",
      notNull: true,
      references: "products(id)",
      onDelete: "CASCADE",
    },
    is_main: { type: "boolean", default: false },
    alt_text: { type: "varchar(255)" },
    image_url: { type: "varchar(255)" },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });
  pgm.createTable("cart", {
    id: "id",
    user_id: {
      type: "integer",
      notNull: true,
      references: "users(id)",
      onDelete: "CASCADE",
      unique: true,
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });

  pgm.createTable("cart_items", {
    id: "id",
    user_id: { type: "integer", references: "users(id)", onDelete: "CASCADE" },
    cart_id: { type: "integer", references: "cart(id)", onDelete: "CASCADE" },
    product_id: {
      type: "integer",
      references: "products(id)",
      notNull: true,
      onDelete: "CASCADE",
    },
    quantity: { type: "integer" },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
