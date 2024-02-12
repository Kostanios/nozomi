import React from "react";
import {authStore} from "./store/auth.store";
import {
  Routes,
  Route
} from "react-router-dom";
import {LoginPage} from "./components/pages/LoginPage/LoginPage";
import {Redirect} from "./components/Redirect/Redirect";
import {MedicationPage} from "./components/pages/MedicationPage/MedicationPage";
import "./App.css";
import {RegPage} from "./components/pages/RegPage/RegPage";

function App() {
  const user = authStore(state => state);

  return (
    <div className="App">
      <Routes>
          {user && <Route path="/" Component={MedicationPage} />}
          <Route path="/login" Component={LoginPage}/>
          <Route path="/reg" Component={RegPage}/>
          <Route path="/" Component={() => <Redirect to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
