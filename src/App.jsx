import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BirthdayInvitation from "./pages/BirthdayInvitation";
import BirthdayForm from "./pages/BirthdayForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/form-data-bday" element={<BirthdayForm />} />
        <Route path="/invitation/:id" element={<BirthdayInvitation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
