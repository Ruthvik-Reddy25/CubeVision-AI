import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Instructions from "./pages/Instructions";
import Capture from "./pages/Capture";
import Result from "./pages/Result";
import Detection from "./pages/Detection";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/capture" element={<Capture />} />
        <Route path="/detection" element={<Detection />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;