import { useParams } from "react-router-dom";

function Perfil() {
  const {id} = useParams();
  return <><h1>{id}</h1></>;
}

export default Perfil;
