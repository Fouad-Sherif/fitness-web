const db = require('../database/db');

exports.addWorkout = (req, res) => {
  const { userId, name, duration, caloriesBurned } = req.body;
  const sql = `INSERT INTO workouts (user_id, name, duration, calories_burned) VALUES (?, ?, ?, ?)`;

  db.run(sql, [userId, name, duration, caloriesBurned], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID });
  });
};

exports.getWorkouts = (req, res) => {
  const { userId } = req.params;
  const sql = `SELECT * FROM workouts WHERE user_id = ?`;

  db.all(sql, [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};
