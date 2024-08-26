import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeCard from "./EmployeeCard";
import "./EmployeeList.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterdEmployees, setfilterdEmployees] = useState([]);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();

    const filterd = employees.filter((employee) =>
      employee.name.toLowerCase().includes(lowerCaseQuery)
    );
    setfilterdEmployees(filterd);
  }, [searchQuery, employees]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/employees")
      .then((res) => {
        setEmployees(res.data);
        setfilterdEmployees(res.data);
      })
      .catch(() => {
        console.log("Error while getting data");
      });
  }, []);

  const onDeleteClick = (id) => {
    axios
      .delete(`http://localhost:3000/api/employees/${id}`)
      .then(() => {
        setEmployees(employees.filter((employee) => employee._id !== id));
      })
      .catch((err) => {
        console.log("delete error", err);
      });
  };

  const employeesList =
    filterdEmployees.length === 0
      ? "No employees found!"
      : filterdEmployees.map((employee) => (
          <EmployeeCard
            key={employee._id}
            employee={employee}
            onDelete={onDeleteClick}
          />
        ));

  return (
    <div className="Show_EmployeeList">
      <div className="container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search employees ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="list">{employeesList}</div>
      </div>
    </div>
  );
};

export default EmployeeList;
