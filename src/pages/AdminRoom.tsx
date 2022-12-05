import { useParams, useNavigate } from "react-router-dom";
import logoImg from "../assets/images/logo.svg";
import DeleteImg from "../assets/images/delete.svg";
import CheckImg from "../assets/images/check.svg";
import AnswerImg from "../assets/images/answer.svg";
import Button from "../components/Button";
import Question from "../components/Question";
import RoomCode from "../components/RoomCode";

import useRoom from "../hooks/useRoom";

import "../styles/room.scss";
import { database } from "../services/firebase";

type RoomParams = {
  id: string;
};

const AdminRoom = () => {
  const navigate = useNavigate();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { questions, title } = useRoom(roomId as string);

  const handleEndRoom = async () => {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    navigate("/");
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm("tem certeza que deseka excluir esta pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  };

  const handleCheckQuestionAnswered = async (questionId: string) => {
    await database
      .ref(`rooms/${roomId}/questions/${questionId}`)
      .update({ isAnswered: true });
  };

  const handleHighlightQuestion = async (questionId: string) => {
    await database
      .ref(`rooms/${roomId}/questions/${questionId}`)
      .update({ isHighlighted: true });
  };

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask" />
          <div>
            <RoomCode code={roomId as string} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar Sala
            </Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAnswered(question.id)}
                    >
                      <img src={CheckImg} alt="marcar responder pergunta" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={AnswerImg} alt="dar destaque pergunta" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={DeleteImg} alt="remover pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default AdminRoom;
