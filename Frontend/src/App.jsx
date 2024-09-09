import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import EmployeeManagementApp from "./Components/EmployeeManagementApp";
import EmployeeDetails from "./Components/EmployeeDetails";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Navigate to="employee" />} /> */}
          <Route path="/" element={<EmployeeManagementApp />} />
          <Route path="/:id" element={<EmployeeDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
