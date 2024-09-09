import React from "react";
import { Link } from "react-router-dom";
function EmployeeTable({
  employees1,
  pagination,
  fetchEmployees,
  handleUpdateEmployee,
  handleDeleteEmployee,
}) {
  const headers = ["Name", "Email", "Phone", "Department", "Actions"];
  const { currentPage, totalPages } = pagination;

  console.log(pagination);

  const TableRow = ({ employee }) => {
    return <tr>
        <td>
          <Link to={`/${employee._id}`} className="text-decoration-none">
            {employee.name}
          </Link>
        </td>
        <td>{employee.email} </td>
        <td>{employee.phone}</td>
        <td>{employee.department}</td>
        <td>
          
           <i 
           className="fa-solid fa-pen-to-square md-4"
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            onClick={() => handleUpdateEmployee(employee)}
            disabled={currentPage === 1}
            title="Edit"
            >
            </i>
          
          <i 
           className='fa-solid fa-trash-can md-4'
            role="button"
            title="Delete"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            onClick={() => {handleDeleteEmployee(employee._id)}}
            
            disabled={totalPages === currentPage}
          >
          </i>
        </td>
      </tr>
  
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePagination(currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage <= totalPages) {
      handlePagination(currentPage-1);
    }
  };
  const handlePagination = (currPage) => {
    fetchEmployees("", currPage, 5);
  };

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees1.map((emp) => (
            <TableRow employee={emp} key={emp._id} />
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-itmes-center my-3">
        <span className="badge-bg-primary"></span>
        <div>
          <button
            className="btn btn-outline-primary me-2"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {pageNumbers.map((page) => (
            <button
              key={page}
              className={`btn btn-outline-primary me-1 
              ${currentPage === page ? "active" : ""}`}
              onClick={() => handlePagination(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="btn btn-outline-primary ms-2"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default EmployeeTable;
  