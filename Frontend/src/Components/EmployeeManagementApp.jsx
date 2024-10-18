import EmployeeTable from "./EmployeeTable";
import React, { useEffect, useState } from "react";
import { DeleteEmployeeById, GetAllEmployees } from "../api";
import AddEmployee from "../Components/AddEmployee";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
const EmployeeManagementApp = () => {
  const [showModal, setShowModal] = useState(false);
  const [updateEmpObj, setUpdateEmpObj] = useState(null);
  const [employeeData, setEmployeeData] = useState({
    employees: [],
    pagination: {
      totalEmployees: 0,
      currentPage: 1,
      totalPages: 1,
      pageSize: 5,
    },
  });

  const fetchEmployees = async (search = "", page = 1, limit = 5) => {
    try {
      const { data } = await GetAllEmployees(search, page, limit);
      console.log(data);
      setEmployeeData(data);
    } catch (err) {
      alert("error", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddEmployee = () => {
    setShowModal(true);
  };
  const handleUpdateEmployee = async (empObj) => {
    setUpdateEmpObj(empObj);
    setShowModal(true);
  };

  const handleSearch = (e) => {
    fetchEmployees(e.target.value);
  };
  const handleDeleteEmployee = async (emp) => {
    console.log(emp);
    try {
      const { success, message } = await DeleteEmployeeById(emp);
      if (success) {
        toast.success(message, "success");
      } else {
        toast.error(message, "err");
      }
    } catch (err) {
      alert("error", err);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-3">
      <h1>HR ManagementApp</h1>
      <div className="w-100 d-flex justify-content-center ">
        <div className="w-80 border bg-light p-3 " style={{ width: "80%" }}>
          <div className="d-flex justify-content-between mb-3">
            <button
              className="btn btn-primary"
              onClick={() => handleAddEmployee(true)}
            >
              ADD
            </button>
            <div className="d-flex justify-content-center align-items-center">
              <input
                onChange={handleSearch}
                type="text"
                placeholder="Search Employees"
                className=" "
              />
            </div>
            <div className="d-flex justify-content-end align-items-end">
              <button className="btn btn-danger ">
                <Link to="/">Logout</Link>
              </button>
            </div>
          </div>
          <EmployeeTable
            employees1={employeeData.employees}
            pagination={employeeData.pagination}
            fetchEmployees={fetchEmployees}
            handleUpdateEmployee={handleUpdateEmployee}
            handleDeleteEmployee={handleDeleteEmployee}
          />

          {
            <AddEmployee
              fetchEmployees={fetchEmployees}
              showModal={showModal}
              setShowModal={setShowModal}
              updateEmpObj={updateEmpObj}
            />
          }
        </div>
      </div>
      {<ToastContainer />}
    </div>
  );
};

export default EmployeeManagementApp;
