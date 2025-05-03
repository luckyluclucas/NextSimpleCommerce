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
    name: { type: "varchar(255)", unique: true, notNull: true },
    email: { type: "varchar(255)", unique: true, notNull: true },
    emailVerified: { type: "timestamp" },
    image: { type: "TEXT" },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    password: { type: "text" },
  });

  pgm.createTable("sessions", {
    id: "id",
    userId: { type: "integer", notNull: true },
    expires: { type: "timestamp", notNull: true },
    sessionToken: { type: "varchar(255)", notNull: true },
  });

  pgm.createTable("accounts", {
    id: "id",
    userId: { type: "integer", notNull: true },
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

  pgm.createTable("verification_token", {
    identifier: { type: "text", notNull: true, primaryKey: true },
    expires: { type: "timestamp", notNull: true },
    token: { type: "text", notNull: true },
  });

  pgm.createTable("products", {
    id: "id",
    title: { type: "varchar(255)", notNull: true },
    price: { type: "decimal(10, 2)", notNull: true },
    description: { type: "text", notNull: true },
    stock: { type: "integer", notNull: true },
    image: { type: "text", notNull: true },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => { };
