import { Link } from "react-router-dom";
import "./Card.css";

function Card({ titulo, body, likes, comments, slug }) {
  
  console.log(slug);
  return (
    <div id="card">
      {slug ? (
        <Link to={`/postagem/${slug}`} className="card-link">
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
        </Link>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default Card;
