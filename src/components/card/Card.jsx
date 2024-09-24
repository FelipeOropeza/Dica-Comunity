import "./Card.css";

function Card({ titulo, body, likes, comments }) {
  return (
    <div id="card">
      <h2>{titulo}</h2>
      <p>{body}</p>
      <div className="card-stats">
        <div className="likes">
          <span>{likes} curtidas</span>
        </div>
        <div className="comments">
          <span>{comments} comentários</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
