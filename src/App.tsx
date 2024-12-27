import { BrowserRouter as Router, Routes, Route } from "react-router";
import DashBoardLayout from "@component/layouts/DashBoardLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashBoardLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
