// ==========================================
// IMPORTING DATABASE CONNECTION
// ==========================================
import { db } from "../config/db.js"; // Updated import

// ==========================================
// CREATE NEW USER
// ==========================================
export const createUser = async (userData) => {
  const { name, email, password, role } = userData;

  const createUserQuery = `
    INSERT INTO users (name, email, password, role)
    VALUES (?, ?, ?, ?)
  `;

  // Using db.execute with args
  const result = await db.execute({
    sql: createUserQuery,
    args: [name, email, password, role],
  });

  // In libSQL, lastInsertRowid is accessed via result.lastInsertRowid
  return {
    id: Number(result.lastInsertRowid),
    name,
    email,
    role,
  };
};

// ==========================================
// GET USER BY EMAIL
// ==========================================
export const getUserByEmail = async (email) => {
  // Added is_active and last_login to the SELECT statement
  const getUserQuery = `SELECT id, name, email, password, role, is_active, last_login FROM users WHERE email = ?`;

  const result = await db.execute({
    sql: getUserQuery,
    args: [email],
  });

  return result.rows[0];
};

// ==========================================
// GET USER BY ID
// ==========================================
export const getUserById = async (userId) => {
  const getUserQuery = `
    SELECT id, name, email, role, profile_image, created_at
    FROM users
    WHERE id = ?
  `;
  const result = await db.execute({
    sql: getUserQuery,
    args: [userId],
  });

  return result.rows[0];
};

// ==========================================
// GET ALL USERS (Admin Analytics Support)
// ==========================================
export const getAllUsers = async () => {
  // Added is_active to the SELECT statement
  const getUsersQuery = `
    SELECT id, name, email, role, created_at, is_active 
    FROM users 
    ORDER BY created_at DESC
  `;
  const result = await db.execute(getUsersQuery);
  return result.rows;
};

// ==========================================
// GET TOTAL USERS COUNT (Admin Dashboard Analytics)
// ==========================================
export const getTotalUsersCount = async () => {
  const countQuery = `SELECT COUNT(*) AS total_users FROM users`;

  const result = await db.execute(countQuery);
  return result.rows[0].total_users;
};

// ==========================================
// DELETE USER (Optional Admin Feature)
// ==========================================
export const deleteUser = async (userId) => {
  const deleteQuery = `DELETE FROM users WHERE id = ?`;

  const result = await db.execute({
    sql: deleteQuery,
    args: [userId],
  });

  return {
    deletedRows: result.rowsAffected, // libSQL uses rowsAffected instead of changes
  };
};

export const updateUserLastLogin = async (userId) => {
  const updateQuery = `UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?`;

  await db.execute({
    sql: updateQuery,
    args: [userId],
  });
};
