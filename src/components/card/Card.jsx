import "./Card.css";

function Card(pros) {
  const titulo = pros.titulo;
  const body = pros.body;
  return (
    <div id="card">
      <h2>{titulo}</h2>
      <p>{body}</p>
    </div>
  );
}

export default Card;
