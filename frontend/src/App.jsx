import { useState } from "react";
import Landing from "./components/Landing";
import PatientForm from "./components/PatientForm";
import ChatWidget from "./components/ChatWidget";

export default function App() {
  const [currentView, setCurrentView] = useState("landing");

  const handleRoute = (route) => {
    if (route === "/patient") {
      setCurrentView("patient");
    }
  };

  return (
    <div>
      {currentView === "landing" && <Landing />}
      {currentView === "patient" && <PatientForm />}

      <ChatWidget onRoute={handleRoute} />
    </div>
  );
}
