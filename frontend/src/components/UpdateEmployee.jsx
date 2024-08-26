import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

function UpdateEmployee() {
  const [employee, setEmployees] = useState({
    employeeID: "",
    name: "",
    address: "",
    nic: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/employees/${id}`)
      .then((res) => {
        setEmployees({
          employeeID: res.data.employeeID,
          name: res.data.name,
          address: res.data.address,
          nic: res.data.nic,
        });
      })
      .catch((err) => {
        console.log("Error from Update Employee", err);
      });
  }, [id]);

  const onChange = (e) => {
    console.log(e.target.value);
    setEmployees({ ...employee, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      employeeID: employee.employeeID,
      name: employee.name,
      address: employee.address,
      nic: employee.nic,
    };
    axios
      .put(`http://localhost:3000/api/employees/${id}`, data)
      .then((res) => {
        navigate(`/showdetails/${id}`);
      })
      .catch((err) => {
        console.log("Error in Update");
      });
  };

  return (
    <div>
      <div className="UpdateEmployee">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                Show Employee List
              </Link>
            </div>
          </div>

          <div className="col-md-8 m-auto">
            <form noValidate onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="title">Employee ID</label>
                <input
                  type="text"
                  placeholder="Title of Employee"
                  name="employeeID"
                  className="form-control"
                  value={employee.employeeID}
                  onChange={onChange}
                />
              </div>
              <br />

              <div className="form-group">
                <label htmlFor="isbn">name</label>
                <input
                  type="text"
                  placeholder="name"
                  name="name"
                  className="form-control"
                  value={employee.name}
                  onChange={onChange}
                />
              </div>
              <br />

              <div className="form-group">
                <label htmlFor="author">address</label>
                <input
                  type="address"
                  placeholder="address"
                  name="address"
                  className="form-control"
                  value={employee.address}
                  onChange={onChange}
                />
              </div>
              <br />

              <div className="form-group">
                <label htmlFor="author">nic</label>
                <input
                  type="number"
                  placeholder="nic"
                  name="nic"
                  className="form-control"
                  value={employee.nic}
                  onChange={onChange}
                />
              </div>
              <br />

              <br />

              <button
                type="submit"
                className="btn btn-outline-info btn-lg btn-block"
              >
                Update Employee
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateEmployee;
