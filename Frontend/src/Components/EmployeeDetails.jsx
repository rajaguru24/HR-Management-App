import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { notify } from "../utils";
import { GetEmployeeById } from "../api";
const EmployeeDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [empDetails, setEmpDetails] = useState([]);

  const fetchEmpById = async () => {
    try {
      const res = await GetEmployeeById(id);
      setEmpDetails(res.data);

    } catch (err) {
      notify("Failed to fetch employeee", "err");
    }
  };

  useEffect(() => {
    fetchEmpById();
  }, [id]);

  

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h3>Employee Details</h3>
        </div>
        <div className="card-body">
          <div className="row ">
            <div className="col">
              <img
                src={empDetails.profileImage}
                alt={empDetails.name}
                className="img-fluid rounded"
              />
            </div>

            <div className="col-md-9">
              <h4>{empDetails.name}</h4>
              <p>
                <strong>Email:</strong>
                {empDetails.email}
              </p>
              <p>
                <strong>Phone:</strong>
                {empDetails.phone}
              </p>
              <p>
                <strong>Department:</strong>
                {empDetails.department}
              </p>
              <p>
                <strong>Salary:</strong>
                {empDetails.salary}
              </p>
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/")}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
