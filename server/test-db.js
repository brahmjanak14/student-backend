import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: "postgresql://postgres:Password%40123@localhost:5432/test",
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ Connection failed:", err);
  } else {
    console.log("✅ Connected:", res.rows);
  }
  pool.end();
});
