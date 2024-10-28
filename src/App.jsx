import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Router components
import Header from "./Header.jsx";
import Home from "./Home.jsx";
import Core from "./Core.jsx";
import AboutUs from "./Aboutus.jsx";
import LoginPage from "./Login.jsx";

const App = () => {
  return (
    <Router>
      {" "}
      {/* Wrap your components with Router */}
      <div className="App">
        <Header />
        <Routes>
          {" "}
          {/* Define your routes here */}
          <Route path="/" element={<Home />} /> {/* Home route */}
          <Route path="/core" element={<Core />} /> {/* Core route */}
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/login" element={<LoginPage />} />
          {}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
