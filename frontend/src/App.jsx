import { useState } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import TabsSection from "./components/TabsSection";
import ChatWidget from "./components/ChatWidget";
import PatientModal from "./components/PatientModal";

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleRoute = (route) => {
    if (route === "/patient") {
      setModalOpen(true);
    }
  };

  return (
    <>
      <Header />
      <HeroSection onActivateChat={() => setChatOpen(true)} />
      <TabsSection />

      <ChatWidget onRoute={handleRoute} forceOpen={chatOpen} />
      <PatientModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
