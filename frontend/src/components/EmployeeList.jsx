import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeCard from "./EmployeeCard";
import "./EmployeeList.css";
import jsPDF from "jspdf";
import "jspdf-autotable";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = employees.filter((employee) =>
      employee.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredEmployees(filtered);
  }, [searchQuery, employees]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/employees")
      .then((res) => {
        setEmployees(res.data);
        setFilteredEmployees(res.data);
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

  const generatePDF = () => {
    const pdf = new jsPDF();

    // Set up letterhead
    pdf.setFontSize(16);
    pdf.setFont("Arial", "bold");
    pdf.text("Company Name", 10, 10);
    pdf.setFontSize(12);
    pdf.setFont("Arial", "normal");
    pdf.text("Address Line 1", 10, 17);
    pdf.text("Address Line 2", 10, 24);
    pdf.text("City, State, ZIP", 10, 31);
    pdf.text("Phone Number", 10, 38);

    // Add some space before the table
    pdf.setFontSize(14);
    pdf.text("Employee List", 10, 50);

    // Table setup
    const tableColumn = ["Name"];
    const tableRows = filteredEmployees.map((employee) => [employee.name]);

    pdf.autoTable({
      startY: 55, // Position table slightly below the "Employee List" text
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
      headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] }, // Header background color and text color
      styles: { fontSize: 12 },
      margin: { horizontal: 10 },
      columnStyles: { 0: { cellWidth: "auto" } }, // Adjust column width
    });

    // Save the PDF
    pdf.save("employees.pdf");
  };

  // const genaratePDF = () => {
  //   const doc = new jsPDF();

  //   const tableColumn = [" Employee Name", "Employee ID"];
  //   const tableRow = [];

  //   filteredEmployees.forEach((employee) => {
  //     const employeeData = [employee.name, employee._id];
  //     tableRow.push(employeeData);
  //   });

  //   doc.autoTable(tableColumn, tableRow, { startY: 20 });
  //   doc.text("Employee List", 14, 15);
  //   doc.save("employee.pdf");
  // };

  const employeesList =
    filteredEmployees.length === 0
      ? "No employees found!"
      : filteredEmployees.map((employee) => (
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
        <div className="button">
          <button onClick={generatePDF}>download PDF</button>
        </div>

        <div className="list">{employeesList}</div>
      </div>
    </div>
  );
};

export default EmployeeList;
