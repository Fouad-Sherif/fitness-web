exports.calculateCalories = (req, res) => {
    const { age, gender, weight, height, activityLevel } = req.body;
  
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
  
    const activityMultiplier = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    };
  
    const calorieIntake = bmr * (activityMultiplier[activityLevel] || 1.2);
    res.json({ calorieIntake: Math.round(calorieIntake) });
  };
  