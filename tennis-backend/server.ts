import express from "express";
import mysql, { RowDataPacket, OkPacket } from "mysql2/promise";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: {
    ca: process.env.DB_SSL_CA ? process.env.DB_SSL_CA : undefined,
  },
});

// Add a workout
app.post("/workouts", async (req, res) => {
  const { googleId, date, technique, email, name } = req.body;

  try {
    // Check if the user exists
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT id FROM users WHERE google_id = ?",
      [googleId]
    );
    const user = rows[0];
    let userId = user?.id;

    // If user doesn't exist, create a new user
    if (!userId) {
      const [result] = await pool.query<OkPacket>(
        "INSERT INTO users (google_id, email, name) VALUES (?, ?, ?)",
        [googleId, email, name]
      );
      userId = result.insertId; // OkPacket has insertId
    }

    // Add the workout
    await pool.query(
      "INSERT INTO workouts (user_id, date, technique) VALUES (?, ?, ?)",
      [userId, date, technique]
    );
    res.status(201).send("Workout added");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding workout");
  }
});

// Fetch daily challenges
app.get("/daily-challenges", async (req, res) => {
  const { googleId, date } = req.query;

  try {
    const [challenges] = await pool.query<RowDataPacket[]>(
      `SELECT c.challenge, c.completed
       FROM daily_challenges c
       JOIN users u ON c.user_id = u.id
       WHERE u.google_id = ? AND c.date = ?`,
      [googleId, date]
    );
    res.json(challenges);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching daily challenges");
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));