import React, { useState } from "react";
import "./InsertRmployee.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InsertEmployee = () => {
  const navigate = useNavigate();
  //manage state
  const [employeeData, setEmployeedata] = useState({
    employeeID: "",
    name: "",
    address: "",
    nic: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeedata({
      ...employeeData,
      [name]: value,
    });
    console.log(employeeData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/api/employees", employeeData).then(() => {
      setEmployeedata({
        employeeID: "",
        name: "",
        address: "",
        nic: "",
      });
    });
    navigate("/");
  };

  return (
    <div>
      <h2>Employee Information Form</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label for="employee_id">Employee ID:</label>
          <input
            type="text"
            id="employee_id"
            name="employeeID"
            onChange={handleChange}
            value={employeeData.employeeID}
          />
        </div>
        <div>
          <label for="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={employeeData.name}
          />
        </div>
        <div>
          <label for="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            onChange={handleChange}
            value={employeeData.address}
          />
        </div>
        <div>
          <label for="nic">NIC:</label>
          <input
            type="text"
            id="nic"
            name="nic"
            onChange={handleChange}
            value={employeeData.nic}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default InsertEmployee;
