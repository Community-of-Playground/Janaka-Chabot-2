require('dotenv').config();
const { Pool } = require('pg');

// Setup database connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Data yang akan dimasukkan atau diperbarui
const messageData = {
    numbers: ["089666123888", "081234567890"],
    group_names: ["AI JNP", "Data Science Squad"]
};

// Fungsi untuk melakukan seeding
async function seedDatabase() {
    try {
        // Insert atau update data di baris pertama
        await pool.query(
            `INSERT INTO grup_wa (id, message_data) 
             VALUES (1, $1) 
             ON CONFLICT (id) 
             DO UPDATE SET message_data = EXCLUDED.message_data, timestamp = CURRENT_TIMESTAMP`,
            [messageData]
        );

        console.log('Database seeding completed successfully!');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        // Tutup koneksi database
        await pool.end();
    }
}

// Jalankan fungsi seeding
seedDatabase();