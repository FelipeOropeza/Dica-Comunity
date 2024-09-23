import React, { useState} from "react";

import "./Formpost.css";

function Formpost({ onSubmit }) {
  const [titulo, setTitulo] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = { titulo, body };

    onSubmit(formData);

    setTitulo("");
    setBody("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={titulo}
          placeholder="Enter post title"
          onChange={(e) => setTitulo(e.target.value)}
        />
        <label>Content:</label>
        <textarea
          value={body}
          placeholder="Enter post content"
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <input type="submit" value="Register Post" />
      </form>
    </div>
  );
}

export default Formpost;
