import GradePersonagens from "../componentes/personagens/grade-personagens.componente";
import store from '../store/index';
import { connect } from 'react-redux';
import { RootState } from '../types/personagensType';
import { useEffect } from "react";
import { fetchFavPersonagensThunk, removerTodosFavs } from "../store/actions/personagens.actions";
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';

/**
 * Esta é a página de favoritos. Aqui você deve ver todos os personagens marcados como favoritos
 *
 * Uso:
 * ``` <PaginaFavoritos /> ```
 *
 * @returns Página de favoritos
 */
const PaginaFavoritos = () => {
  const { favIdPersonagens, favPersonagens, isFetching, errorMessage } = store.getState().personagens;
  
  //const personagensFiltrados = personagens.filter((personagem: Personagem) => personagem.favorito ?? personagem); 

  useEffect(() => {
    if(!favIdPersonagens.length) return;

    fetchFavPersonagensThunk(favIdPersonagens)(store.dispatch);
  },[])


  const removerFavsHandler = () => {
    store.dispatch(removerTodosFavs());
  }

  return (
    <div className="container">
      <Helmet>
        <title>Favoritos</title>
      </Helmet>
      <div className="actions">
        <h3>Personagens Favoritos</h3>
        <button disabled={!favIdPersonagens.length} className="danger" onClick={removerFavsHandler}>Remover favoritos</button>
      </div>
      {errorMessage && <span>Falha ao recuperar personagens favoritos: {errorMessage}</span>}
      {isFetching && <span>Carregando personagagens favoritos, aguarde...</span>}
      {!favIdPersonagens.length ? <span className="favoritos-vazio">Nenhum personagem favorito encontrado :( </span>: <GradePersonagens personagens={favPersonagens}/>}
    </div>
  );
};


const mapStateToProps = (state: RootState) => ({
  personagens: state.personagens
})

const mapDispatchToProps = (dispatch: any) => {
  return  bindActionCreators({ 
    removerTodosFavs, 
    fetchFavPersonagensThunk 
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginaFavoritos);
