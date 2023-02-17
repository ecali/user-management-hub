import { DialogContent, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import { UserModal } from "./components/UserModal";
import { User } from "./types/RandomUser";

function App() {
  const [opneModal, setOpenModal] = useState(false);
  const [currentUsers, setCurrentUsers] = useState<User[]>([]);
  const [gradient, setGradient] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => randomBackground, [])

  const randomBackground = () => {
    let firstColor = getColor();
    let secondColor = getColor();
    setGradient("linear-gradient(" + Math.round(Math.random() * 360) + "deg, " + firstColor + ", " + secondColor + ")");
  }
  const getColor = () => {
    const hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e"];
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color = color + hexValues[Math.round(Math.random() * 14)];
    }
    return color;
  }

  return (
    <>
      <div className="App flex jc-c ai-c fd-c" style={{ background: gradient }}>
        <p style={{ marginBottom: '10px' }}>Discover our amazing users - click here to find out more!</p>
        <button className="app-button" onClick={() => setOpenModal(true)}>
          OPEN MODAL
        </button>
        <button onClick={randomBackground} className="up">Change Background</button>
      </div>

      <Modal open={opneModal} onClose={() => setOpenModal(false)}>
        <DialogContent>
          <UserModal closeModal={() => setOpenModal(false)} currentUsers={currentUsers} setCurrentUsers={setCurrentUsers} />
        </DialogContent>
      </Modal>
    </>
  );
}

export default App;