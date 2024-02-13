import React, { useEffect } from "react";
import { Button } from "antd";
import {
    Routes,
    Route,
    useNavigate
} from "react-router-dom";

import { LoginPage } from "./components/pages/LoginPage/LoginPage";
import { MedicationPage } from "./components/pages/MedicationPage/MedicationPage";
import { authStore } from "./store/auth.store";
import { RegPage } from "./components/pages/RegPage/RegPage";
import { clearJWT, setJWT } from "./config/axiosConfig";
import "./App.css";


function App() {
  const navigate = useNavigate();
  const user = authStore(state => state.user);
  const getCurrentUser = authStore(state => state.getCurrentUser);
  const logOut = authStore(state => state.logOut);

  const token = localStorage.getItem('token');
  if (token) {
     setJWT(token);
  }

  useEffect(() => {
    !user && getCurrentUser(
        () => navigate('/'),
        () => {
            navigate('/login');
            clearJWT();
        }
    );
  }, []);

  return (
    <div className="App">
        {
            user && (
                <h1 className="AuthoredHeader">
                    <span>{user.username}</span>
                    <Button onClick={() => logOut(() => navigate('/login'))}>Log Out</Button>
                </h1>
            )
        }
      <Routes>
          {user && <Route path="/" Component={MedicationPage} />}
          <Route path="/login" Component={LoginPage}/>
          <Route path="/reg" Component={RegPage}/>
      </Routes>
    </div>
  );
}

export default App;
