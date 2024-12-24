const db = require('../database/db');

exports.getPersonalTrainers = (req,res) => {
    const sql = `SELECT * FROM personaltrainers`;

    db.all(sql , [] , (err ,rows) => {
        if(err) return res.status(500).json({error: err.message});
        res.json(rows);
    });
};

exports.addPersonalTrainer = (req , res) =>{
    const {trainerName , gymId , pricePerMonth , priceper3Months , pricePerYear } =req.body;
    const sql =`INSERT INTO gymlocations (Trainername, gymid, pricepermonth, priceper3months, priceper1year) VALUES (?, ?, ?, ?)`;

    db.run(sql , [trainerName , gymId , pricePerMonth , priceper3Months , pricePerYear], function(err) {
        if(err) return res.status(500).json({error: err.message});
        res.status(201).json({id:this.lastID});
    });
};