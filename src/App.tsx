import React, { useState } from "react";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import MakerTickets from "./components/MakerTickets";
import Tickets from "./components/Tickets";
import "./styles.css";

const App: React.FC = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userProfile, setUserProfile] = useState<"admin" | "user" | null>(null);

  const handleShowRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleLoginSuccess = (isAdmin: boolean) => {
    const profile = isAdmin ? "admin" : "user";
    setUserProfile(profile);
    setShowRegister(false);
    setShowLogin(false);
  };

  const handleShowHome = () => {
    setShowRegister(false);
    setShowLogin(false);
    setUserProfile(null);
  };

  const handleLogout = () => {
    setUserProfile(null);
  };

  return (
    <div className="app-container">
      <h1>Ticket Solver</h1>
      {userProfile && (
        <div className="user-info">
          <p>Você está logado como: {userProfile}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      {userProfile === null && !showRegister && !showLogin && (
        <div className="button-container">
          <button onClick={handleShowRegister}>Criar Conta</button>
          <button onClick={handleShowLogin}>Fazer Login</button>
        </div>
      )}
      {showRegister && <RegisterForm handleShowHome={handleShowHome} />}
      {showLogin && (
        <LoginForm
          handleLoginSuccess={handleLoginSuccess}
          handleShowHome={handleShowHome}
        />
      )}
      {userProfile === "user" && <Tickets />}
      {userProfile === "admin" && (
        <>
          <h2>Área de Administração</h2>
          <MakerTickets />
        </>
      )}
    </div>
  );
};

export default App;
