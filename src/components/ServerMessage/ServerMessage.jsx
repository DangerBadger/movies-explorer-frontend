import './ServerMessage.scss';

function ServerMessage({ error }) {
  return (
    <p className="server-message">{error}</p>
  );
}

export default ServerMessage;
