import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "coma",
    port: parseInt(process.env.DB_PORT || "3307"), // 포트 3307 기본값
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export default pool;
