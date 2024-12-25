import React, { useState } from 'react';

const AddGymForm = ({ navigate }) => {
  const [location, setLocation] = useState('');
  const [pricePerMonth, setPricePerMonth] = useState('');
  const [pricePer3Months, setPricePer3Months] = useState('');
  const [pricePer1Year, setPricePer1Year] = useState('');
  const [message, setMessage] = useState('');

  const addGym = async () => {
    try {
      const response = await fetch('http://localhost:666/gymlocations/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location,
          pricePerMonth: parseFloat(pricePerMonth),
          pricePer3Months: parseFloat(pricePer3Months),
          pricePer1Year: parseFloat(pricePer1Year),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add gym');
      }

      setMessage('Gym added successfully!');
      // Optional: Navigate to a different page or reset the form.
      setLocation('');
      setPricePerMonth('');
      setPricePer3Months('');
      setPricePer1Year('');
      navigate("addpersonaltrainers");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="form-section">
      <h3>Add Gym</h3>
      <form>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
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
        <button type="button" onClick={addGym}>
          Add Gym
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default AddGymForm;
