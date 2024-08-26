import "./App.css";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import EmployeeList from "./components/EmployeeList";
import InsertEmployee from "./components/InsertEmployee";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowEmployeeDetail from "./components/ShowEmployeeDetail";
import UpdateEmployee from "./components/UpdateEmployee";


function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/insert" element={<InsertEmployee />} />
          <Route path="/showdetails/:id" element={<ShowEmployeeDetail />} />
          <Route path="/updatedetails/:id" element={<UpdateEmployee />} />
          
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
