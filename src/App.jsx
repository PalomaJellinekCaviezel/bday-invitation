import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BirthdayInvitation from "./pages/BirthdayInvitation";
import AdminLogin from "./components/AdminLogin";
import BirthdayForm from "./pages/BirthdayForm";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/admin" element={<BirthdayForm />} />
          <Route path="/invitation/:id" element={<BirthdayInvitation />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
