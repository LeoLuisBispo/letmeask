import copyImg from "../assets/images/copy.svg";

import "../styles/room-code.scss";

type RoomCodeProps = {
  code: string | "";
};

const RoomCode = (props: RoomCodeProps) => {
  const copyRoomCodetoClipboard = () => {
    navigator.clipboard.writeText(props.code);
  };

  return (
    <button className="room-code">
      <div>
        <img
          src={copyImg}
          alt="copyroomcode"
          onClick={copyRoomCodetoClipboard}
        />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  );
};

export default RoomCode;
