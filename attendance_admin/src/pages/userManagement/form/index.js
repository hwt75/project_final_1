import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  getData,
  loadStatus,
  addUser
} from "../../../redux/dataSlice";
import "./index.scss"
const MyForm = ({closeModal}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    address: '',
    phoneNumber: '',
    hometown: ''
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
    console.log('Form submitted:', formData);
    dispatch(addUser(formData));
    closeModal();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="studentId">Student Id:</label>
          <input type="text" id="studentId" name="studentId" value={formData.studentId} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">PhoneNumber:</label>
          <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="hometown">Hometown:</label>
          <input type="text" id="hometown" name="hometown" value={formData.hometown} onChange={handleChange} />
        </div>

        <button type="submit" className='button-submit'>Submit</button>
      </form>
    </div>
  );
};

export default MyForm;
