import { ReactNode } from "react";
import "../styles/question.scss";

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isHighlighted?: boolean;
  isAnswered?: boolean;
};

const Question = ({
  content,
  author,
  isHighlighted = false,
  isAnswered = false,
  children,
}: QuestionProps) => {
  return (
    <div
      className={`question ${isAnswered ? "answered" : ""} ${
        isHighlighted && !isAnswered ? "highlighted" : ""
      } `}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt="avatar" />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
};

export default Question;
