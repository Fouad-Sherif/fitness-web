exports.addBooking = (req, res) => {
    const { userId, gymId, trainerId } = req.body;
    const sql = `INSERT INTO booking (userid, gymid, trainerid) VALUES (?, ?, ?)`;

    db.run(sql, [userId, gymId, trainerId], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID });
    });
};
