import React, { useState } from 'react';
import "./index.scss"
const MyForm = () => {
  const [formData, setFormData] = useState({
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
    field6: '',
    field7: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='container-form'>
        <label htmlFor="field1">Name:</label>
        <input type="text" id="field1" name="name" value={formData.field1} onChange={handleChange} required className='form-field'/>

        <label htmlFor="field2">:</label>
        <input type="text" id="field2" name="" value={formData.field2} onChange={handleChange} required />

        <label htmlFor="field3">:</label>
        <input type="text" id="field3" name="" value={formData.field3} onChange={handleChange} required />

        <label htmlFor="field4">:</label>
        <input type="text" id="field4" name="" value={formData.field4} onChange={handleChange} required />

        <label htmlFor="field5">:</label>
        <input type="text" id="field5" name="" value={formData.field5} onChange={handleChange} required />

        <label htmlFor="field6">:</label>
        <input type="text" id="field6" name="" value={formData.field6} onChange={handleChange} required />

        <label htmlFor="field7">:</label>
        <input type="text" id="field7" name="" value={formData.field7} onChange={handleChange} required />

        <button type="submit" style={{backgroundColor: "#1677ff"}}>Submit</button>
      </form>
    </div>
  );
};

export default MyForm;
