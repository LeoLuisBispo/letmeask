import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

import "../styles/auth.scss";
import Button from "../components/Button";
import { database } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";

const NewRoom = () => {
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = async (e: FormEvent) => {
    e.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    navigate(`/rooms/${firebaseRoom.key}`);
  };

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="illustration" />
        <strong>Crie salas de Q&A ao-vivo</strong>
        <p>Tire as duvidas da sua audiencia em tempo real</p>
        <h2>Criar uma nova sala</h2>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="logo" />
          <h2>Criar uma nova sala</h2>
          <form action="" onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default NewRoom;
