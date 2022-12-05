import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import "../styles/auth.scss";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

const Home = () => {
  const [roomCode, setRoomCode] = useState("");

  const navigate = useNavigate();

  const { signInWithGoogle, user } = useAuth();

  const handleCreateRoom = async () => {
    if (!user) {
      await signInWithGoogle();
    }

    navigate("/rooms/new");
  };

  const handleJoinRoom = async (e: FormEvent) => {
    e.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("Room does not exists.");
      return;
    }

    if (roomRef.val().endedAt) {
      alert("Room already closed");
      return;
    }

    navigate(`rooms/${roomCode}`);
  };

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="illustration" />
        <strong>Crie salas de Q&A ao-vivo</strong>
        <p>Tire as duvidas da sua audiencia em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="logo" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="logo google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form action="" onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="digite o codigo da sala"
              onChange={(e) => setRoomCode(e.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;
