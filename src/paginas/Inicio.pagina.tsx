import Filtros from "../componentes/personagens/filtros.componente";
import GradePersonagens from '../componentes/personagens/grade-personagens.componente';
import Paginacao from "../componentes/paginacao/paginacao.componente";
import store from '../store/index';
import { connect } from 'react-redux';
import { RootState } from '../types/personagensType';
import { bindActionCreators } from 'redux';
import { fetchPersonagensThunk } from "../store/actions/personagens.actions";
import { useEffect } from 'react';

/**
* Esta é a página principal. Aqui você deve ver o painel de filtro junto com a grade de personagens.
*
* Uso:
* ``` <PaginaInicio /> ```
*
* @returns Página inicio
*/

const PaginaInicio = () => {

  const { isFetching, personagens, errorMessage } = store.getState().personagens;

  useEffect(() => {
    fetchPersonagensThunk()(store.dispatch);
  },[])

  return (
    <div className="container">
      <div className="actions">
        <h3>Catálogo de Personagens</h3>
      </div>
      <Filtros />
      <Paginacao />
      {isFetching ? 
        <span className="carregando">Carregando...</span>
        :
        <GradePersonagens personagens={personagens}/>
      }
      {errorMessage && <span>Falha em obter os personagens: {errorMessage}</span>}
      </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  personagens: state.personagens
})

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ fetchPersonagensThunk }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(PaginaInicio);
