import React, { useState } from "react";
import axios from "axios";
import { FiUser, FiMail, FiLock, FiPhone, FiAtSign } from "react-icons/fi"; // Importing icons
import "../styles/SignupForm.css";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    mobile: "",
    gender: "",
    image: null, // Add image field
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setImagePreview(URL.createObjectURL(file)); // Preview the selected image
  };

  const validateForm = () => {
    const newErrors = {};

    // Check if all fields are filled
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm password is required.";
    if (!formData.age) newErrors.age = "Age is required.";
    if (!formData.mobile) newErrors.mobile = "Mobile number is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.image) newErrors.image = "Profile image is required.";

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (formData.email && !emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password validation (min 8 characters, at least one letter and one number)
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (formData.password && !passwordPattern.test(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long, containing letters, numbers, and a special character.";
    }

    // Password match validation
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    // Age validation (must be a number and greater than 18)
    if (formData.age && (isNaN(formData.age) || formData.age < 18)) {
      newErrors.age = "Age must be a number and at least 18.";
    }

    // Mobile validation (should be a valid number, no special characters)
    const mobilePattern = /^[0-9]{10}$/;
    if (formData.mobile && !mobilePattern.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If there are no errors, form is valid
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formDataToSend = new FormData();
      formDataToSend.append("image", formData.image);
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("age", formData.age);
      formDataToSend.append("mobile", formData.mobile);
      formDataToSend.append("gender", formData.gender);

      try {
        const response = await axios.post(
          "https://nodeproject-7ofz.onrender.com/api/signup", //http://localhost:5000/api/signup 
          formDataToSend,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("User registered successfully!");
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error during registration:", error);
        alert("Registration failed!");
      }
    }
  };

  return (
    <div className="signup-form">
      <h2>Signup Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <FiUser className="input-icon" />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>
        <div className="input-group">
          <FiUser className="input-icon" />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
        <div className="input-group">
          <FiMail className="input-icon" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="input-group">
          <FiLock className="input-icon" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="input-group">
          <FiLock className="input-icon" />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>
        <div className="input-group">
          <FiAtSign className="input-icon" />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />
          {errors.age && <span className="error">{errors.age}</span>}
        </div>
        <div className="input-group">
          <FiPhone className="input-icon" />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
          {errors.mobile && <span className="error">{errors.mobile}</span>}
        </div>
        <div className="input-group">
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <span className="error">{errors.gender}</span>}
        </div>
        <div className="input-group">
          <label>Profile Image:</label>
          <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
          {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
          {errors.image && <span className="error">{errors.image}</span>}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default SignupForm;
