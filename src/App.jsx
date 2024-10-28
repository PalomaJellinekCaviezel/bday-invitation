import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BirthdayInvitation from "./pages/BirthdayInvitation";
import AdminLogin from "./components/AdminLogin";
import BirthdayForm from "./pages/BirthdayForm";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-form" element={<BirthdayForm />} />
          <Route path="/invitations/:id" element={<BirthdayInvitation />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
