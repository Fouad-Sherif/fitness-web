const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./fitness.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');

    // Create Users Table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        ISADMIN BOOLEAN NOT NULL DEFAULT 0
      )
    `);


    db.run(`
        CREATE TABLE IF NOT EXISTS gymlocations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          Location TEXT NOT NULL,
          pricepermonth REAL NOT NULL,
          priceper3months REAL NOT NULL,
          priceper1year REAL NOT NULL,
        )
      `);


      db.run(`
        CREATE TABLE IF NOT EXISTS personaltrainers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          Trainername TEXT NOT NULL,
          gymid INTEGER NOT NULL,
          pricepermonth REAL NOT NULL,
          priceper3months REAL NOT NULL,
          priceper1year REAL NOT NULL,
          FOREIGN KEY (gymid) REFERENCES gymlocations(id) 
        )
      `);


      db.run(`
        CREATE TABLE IF NOT EXISTS booking (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userid INTEGER NOT NULL,
          gymid INTEGER NOT NULL,
          trainerid INTEGER ,
          FOREIGN KEY (userid) REFERENCES users(id),
           FOREIGN KEY (gymid) REFERENCES gymlocations(id),
            FOREIGN KEY (trainerid) REFERENCES personaltrainers(id),
          
        )
      `);
  

   
    
  }
});

module.exports = db;
