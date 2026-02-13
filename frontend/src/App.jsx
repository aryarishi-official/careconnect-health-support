import { useState } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import TabsSection from "./components/TabsSection";
import ChatWidget from "./components/ChatWidget";
import PatientModal from "./components/PatientModal";
import VolunteerModal from "./components/VolunteerModal";

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);
  const [chatResetSignal, setChatResetSignal] = useState(0);
  const [requests, setRequests] = useState([]);

  const handleRoute = (route) => {
    if (route === "/patient") {
      setModalOpen(true);
    }

    if (route === "/volunteer") {
      setVolunteerModalOpen(true);
    }
  };

  // 🔥 Now receives real request data
  const handleModalClose = (requestData) => {

  if (requestData) {
    // Real submission
    setRequests(prev => [requestData, ...prev]);

    // Trigger success reset
    setChatResetSignal({
      type: "success",
      id: requestData.id
    });

  } else {
    // Just closed modal — no submission
    setChatResetSignal({
      type: "normal"
    });
  }

  setModalOpen(false);
  setVolunteerModalOpen(false);
  setChatOpen(true);
};



  return (
    <>
      <Header />
      <HeroSection onActivateChat={() => setChatOpen(true)} />
      <TabsSection requests={requests} />

      <ChatWidget
        onRoute={handleRoute}
        forceOpen={chatOpen}
        resetSignal={chatResetSignal}
      />

      <PatientModal
  open={modalOpen}
  onClose={() => handleModalClose(null)}
  onSuccess={handleModalClose}
/>

      <VolunteerModal
  open={volunteerModalOpen}
  onClose={() => handleModalClose(null)}
  onSuccess={handleModalClose}
/>
    </>
  );
}
