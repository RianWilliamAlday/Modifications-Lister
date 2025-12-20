import { useState } from "react";
import Header from "../src/components/Header.jsx";
import GameSection from "../src/components/GameSection.jsx";
import ModSection from "../src/components/ModSection.jsx";
import Footer from "../src/components/Footer.jsx";
import Notification from "../src/components/Notification.jsx";
import PopUp from "../src/components/PopUp.jsx";

function App() {
  const [savedGameName, setSavedGameName] = useState('');
  const [notifMessage, setNotifMessage] = useState('');
  const [notifVisible, setNotifVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);

  function showPopup(message) {
        setPopupMessage(message);
        setPopupVisible(true);
    }

    function closePopup() {
        setPopupVisible(false);
    }

  function showNotification(message) {
    setNotifMessage(message);
    setNotifVisible(true);

    setTimeout(() => setNotifVisible(false), 3000);
  }

  return (
    <>
      <main className="bg-gray-200 min-h-screen">
      <Header webname="Modifications Lister"/>
      <GameSection 
          savedGameName={savedGameName}
          setSavedGameName={setSavedGameName}
          showNotification={showNotification}
          showPopup={showPopup}/>
      <ModSection 
          savedGameName={savedGameName}
          setSavedGameName={setSavedGameName}
          showPopup={showPopup}/>
      <Notification 
        message={notifMessage} 
        visible={notifVisible} />
      <PopUp
          message={popupMessage}
          visible={popupVisible}
          onClose={closePopup}
      />
      <Footer />
      </main>
    </>
  )
}

export default App
