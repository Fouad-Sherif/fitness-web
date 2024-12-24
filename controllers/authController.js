const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database/db');

const SECRET_KEY = 'fouad_is_writing';

exports.register = (req, res) => {
  const { username,email, password,isAdmin  } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const sql = `INSERT INTO users (username,email, password,ISADMIN) VALUES (?, ?, ?, ?)`;

  db.run(sql, [username,email, hashedPassword,isAdmin], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM users WHERE email = ?`;

  db.get(sql, [email], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user || !bcrypt.compareSync(password, user.password))
      return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id , ISADMIN : user.ISADMIN }, SECRET_KEY, { expiresIn: '1h' });

    res.cookie("token", token ,{
        httpOnly:true,
        secure:true,
    });

    res.json({ message: "Logged In successfully" , isAdmin : user.ISADMIN });
  });
};
