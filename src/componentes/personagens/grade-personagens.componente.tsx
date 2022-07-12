import "./grade-personagem.css";
import CardPersonagem from "./card-personagem.componente";
import { Personagem } from "../../types/personagensType";

type Props = {
  personagens: Personagem[] | undefined,
}
/**
 * Grade de personagens para a página inicial
 *
 * Você precisará adicionar as funções necessárias para exibir e paginar os personagens
 *
 *
 * @returns Elemento JSX
 */
const GradePersonagem = ({personagens}: Props) => {

  return (
    <div className="grade-personagens">
      {personagens && 
        personagens.map((personagem: Personagem) => {
        return <CardPersonagem key={personagem.id} personagem={personagem} />
      })
      }
    </div>
  );
};

export default GradePersonagem;
