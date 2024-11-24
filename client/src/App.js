import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ForgetPassword from "./components/auth/ForgetPassword";
import VerifyOpt from "./components/auth/VerifyOpt";
import UpdatePassword from "./components/auth/UpdatePassword";
import Super from "./components/Super";
import Dashboard from "./components/auth/Dashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/forget/password" element={<ForgetPassword />} />
          <Route path="/dashboard" element={<Dashboard/>}/>

          <Route element={<Super />}>
            <Route path="/otp/verify" element={<VerifyOpt />} />
            <Route path="/update/pass" element={<UpdatePassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
