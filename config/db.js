import mysql from 'mysql2/promise';

// Initialize a connection pool with parameters drawn safely from your .env variables
const dbPool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'experiment57_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// --- CONNECTION VERIFICATION TEST BLOCK ---
// Immediately attempt to acquire a test connection link from the pool
try {
    const connection = await dbPool.getConnection();
    console.log("🟢 DATABASE LINK ESTABLISHED: Node connected to experiment57_db successfully.");
    connection.release(); // Return the link back to the pool pool instantly
} catch (error) {
    console.error("🔴 CRITICAL DATABASE FAULT: Connection failed.");
    console.error(`Reason: ${error.message}`);
}

// Export the module pool for our controllers to use later
export default dbPool;
