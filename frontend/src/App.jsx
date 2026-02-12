import { useState } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import TabsSection from "./components/TabsSection";
import ChatWidget from "./components/ChatWidget";
import PatientModal from "./components/PatientModal";

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [chatResetSignal, setChatResetSignal] = useState(0);

  const handleRoute = (route) => {
    if (route === "/patient") {
      setModalOpen(true);
    }
  };

  const handleFormSuccess = () => {
    setModalOpen(false);
    setChatResetSignal(prev => prev + 1);
  };

  return (
    <>
      <Header />
      <HeroSection onActivateChat={() => setChatOpen(true)} />
      <TabsSection />

      <ChatWidget
        onRoute={handleRoute}
        forceOpen={chatOpen}
        resetSignal={chatResetSignal}
      />

      <PatientModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleFormSuccess}
      />
    </>
  );
}
