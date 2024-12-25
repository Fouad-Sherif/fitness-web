const db = require('../database/db');

exports.getPersonalTrainers = (req,res) => {
    const sql = `SELECT * FROM personaltrainers`;

    db.all(sql , [] , (err ,rows) => {
        if(err) return res.status(500).json({error: err.message});
        res.json(rows);
    });
};

exports.addPersonalTrainer = (req , res) =>{
    const {trainerName , gymId , pricePerMonth, pricePer3Months, pricePer1Year } =req.body;
    const sql =`INSERT INTO  personaltrainers (Trainername, gymid, pricepermonth, priceper3months, priceper1year) VALUES (?, ?, ?, ?,?)`;

    db.run(sql , [trainerName , gymId ,pricePerMonth, pricePer3Months, pricePer1Year], function(err) {
        if(err) return res.status(500).json({error: err.message});
        res.status(201).json({id:this.lastID});
    });
};

exports.getPersonalTrainerByGymID = (req, res) => {
    const { gymId } = req.query; 
  
    if (!gymId) {
      return res.status(400).json({ error: "gymId is required" });
    }
  
    const sql = `SELECT * FROM personaltrainers WHERE gymid = ?`;
  
    db.all(sql, [gymId], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows); 
    });
  };