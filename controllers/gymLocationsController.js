const db = require('../database/db');

exports.getGymLocations = (req,res) => {
    const sql = `SELECT * FROM gymlocations`;

    db.all(sql , [] , (err ,rows) => {
        if(err) return res.status(500).json({error: err.message});
        res.json(rows);
    });
};

exports.addGymLocation = (req , res) =>{
    const {location , pricePerMonth, pricePer3Months, pricePer1Year} =req.body;
    const sql =`INSERT INTO gymlocations (Location, pricepermonth, priceper3months, priceper1year) VALUES (?, ?, ?, ?)`;

    db.run(sql , [location ,  pricePerMonth, pricePer3Months, pricePer1Year], function(err) {
        if(err) return res.status(500).json({error: err.message});
        res.status(201).json({id:this.lastID});
    });
};