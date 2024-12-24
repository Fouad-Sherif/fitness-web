import React, { useState, useEffect } from 'react';

const ChooseGymAndTrainer = ({ navigate, userId }) => {
  const [gyms, setGyms] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [selectedGym, setSelectedGym] = useState('');
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [gymPrices, setGymPrices] = useState({});
  const [trainerPrices, setTrainerPrices] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch gyms data
    const fetchGyms = async () => {
      try {
        const response = await fetch('http://localhost:666/gymlocations/get');
        if (!response.ok) {
          throw new Error('Failed to fetch gyms');
        }
        const data = await response.json();
        setGyms(data);
      } catch (error) {
        setMessage(error.message);
      }
    };

    fetchGyms();
  }, []);

  const handleGymChange = async (gymId) => {
    setSelectedGym(gymId);
    setSelectedTrainer(''); // Reset trainer selection

    // Fetch gym prices
    const gym = gyms.find((g) => g.id === parseInt(gymId));
    setGymPrices({
      pricePerMonth: gym.pricePerMonth,
      pricePer3Months: gym.pricePer3Months,
      pricePer1Year: gym.pricePer1Year,
    });

    // Fetch trainers for the selected gym
    try {
      const response = await fetch(`http://localhost:666/trainers?gymId=${gymId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch trainers');
      }
      const data = await response.json();
      setTrainers(data);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleTrainerChange = (trainerId) => {
    setSelectedTrainer(trainerId);
    const trainer = trainers.find((t) => t.id === parseInt(trainerId));
    setTrainerPrices({
      pricePerMonth: trainer.pricePerMonth,
      pricePer3Months: trainer.pricePer3Months,
      pricePer1Year: trainer.pricePer1Year,
    });
  };

  const handleSubmit = async () => {
    if (!selectedGym) {
      setMessage('Please select a gym');
      return;
    }

    try {
      const response = await fetch('http://localhost:666/booking/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          gymId: parseInt(selectedGym),
          trainerId: selectedTrainer ? parseInt(selectedTrainer) : null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking');
      }

      setMessage('Your booking has been submitted!');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="form-section">
      <h3>Choose Gym and Personal Trainer</h3>

      <label htmlFor="gym">Select Gym:</label>
      <select
        id="gym"
        value={selectedGym}
        onChange={(e) => handleGymChange(e.target.value)}
        required
      >
        <option value="" disabled>
          Select Gym
        </option>
        {gyms.map((gym) => (
          <option key={gym.id} value={gym.id}>
            {gym.location}
          </option>
        ))}
      </select>

      {selectedGym && (
        <div>
          <h4>Gym Prices:</h4>
          <p>Price per Month: {gymPrices.pricePerMonth}</p>
          <p>Price per 3 Months: {gymPrices.pricePer3Months}</p>
          <p>Price per 1 Year: {gymPrices.pricePer1Year}</p>
        </div>
      )}

      {selectedGym && (
        <div>
          <label htmlFor="trainer">Select Personal Trainer:</label>
          <select
            id="trainer"
            value={selectedTrainer}
            onChange={(e) => handleTrainerChange(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Trainer
            </option>
            {trainers.map((trainer) => (
              <option key={trainer.id} value={trainer.id}>
                {trainer.trainerName}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedTrainer && (
        <div>
          <h4>Trainer Prices:</h4>
          <p>Price per Month: {trainerPrices.pricePerMonth}</p>
          <p>Price per 3 Months: {trainerPrices.pricePer3Months}</p>
          <p>Price per 1 Year: {trainerPrices.pricePer1Year}</p>
        </div>
      )}

      <button type="button" onClick={handleSubmit}>
        Submit
      </button>

      <p>{message}</p>
    </div>
  );
};

export default ChooseGymAndTrainer;
