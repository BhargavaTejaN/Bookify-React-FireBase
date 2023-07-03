import { Routes, Route } from "react-router-dom";

// page imports
import Home from "./pages/Home/Home";
import Signup from "./pages/Siginup/Signup";
import Login from "./pages/Login/Login";

// import components
import NavBar from "./components/NavBar/NavBar";

// css imports
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import List from "./pages/List/List";
import BookDetail from "./pages/Details/Details";
import Orders from "./pages/Orders/Orders";
import ViewOrderDetails from "./pages/ViewOrderDetails/ViewOrderDetails";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-listing" element={<List />} />
        <Route path="/view-book/:id" element={<BookDetail />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<ViewOrderDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
