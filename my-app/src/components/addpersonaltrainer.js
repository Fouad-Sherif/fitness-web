import React, { useState, useEffect } from 'react';

const AddTrainerForm = ({ navigate }) => {
  const [trainerName, setTrainerName] = useState('');
  const [gymId, setGymId] = useState('');
  const [gyms, setGyms] = useState([]);
  const [pricePerMonth, setPricePerMonth] = useState('');
  const [pricePer3Months, setPricePer3Months] = useState('');
  const [pricePer1Year, setPricePer1Year] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
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

  const addTrainer = async () => {
    try {
      const response = await fetch('http://localhost:666/personaltrainers/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trainerName,
          gymId: parseInt(gymId),
          pricePerMonth: parseFloat(pricePerMonth),
          pricePer3Months: parseFloat(pricePer3Months),
          pricePer1Year: parseFloat(pricePer1Year),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add trainer');
      }

      setMessage('Trainer added successfully!');
      // Optional: Reset form fields or navigate to another page.
      setTrainerName('');
      setGymId('');
      setPricePerMonth('');
      setPricePer3Months('');
      setPricePer1Year('');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="form-section">
      <h3>Add Personal Trainer</h3>
      <form>
        <input
          type="text"
          placeholder="Trainer Name"
          value={trainerName}
          onChange={(e) => setTrainerName(e.target.value)}
          required
        />
        <br />
        <select
          value={gymId}
          onChange={(e) => setGymId(e.target.value)}
          required
        >
          <option value="" disabled>
            Select Gym
          </option>
          {gyms.map((gym) => (
            <option key={gym.id} value={gym.id}>
              {gym.Location}
            </option>
          ))}
        </select>
        <br />
        <input
          type="number"
          placeholder="Price per Month"
          value={pricePerMonth}
          onChange={(e) => setPricePerMonth(e.target.value)}
          required
        />
        <br />
        <input
          type="number"
          placeholder="Price per 3 Months"
          value={pricePer3Months}
          onChange={(e) => setPricePer3Months(e.target.value)}
          required
        />
        <br />
        <input
          type="number"
          placeholder="Price per 1 Year"
          value={pricePer1Year}
          onChange={(e) => setPricePer1Year(e.target.value)}
          required
        />
        <br />
        <button type="button" onClick={addTrainer}>
          Add Trainer
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default AddTrainerForm;
