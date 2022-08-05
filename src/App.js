import './App.css';
import React , {useState, useEffect} from 'react';
import Formulario from './components/Formulario.js';
import ListadoImagenes from './components/ListadoImagenes.js';

function App() {

  const [busqueda, guardarBusqueda] = useState('');
  const [listadoImagen, guardarListado] = useState([]);
  const [paginaActual, guardarParginaActual] = useState(1);
  const [totalPaginas, guardarTotalPaginas] = useState(1);



  useEffect(()=>{
    const consultarApi = async() =>{
      if(busqueda === '') return;
  
      const imagenesPorPagina = 30;
      const key = '19618666-a5885f53679841ed33619bdf0';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarListado(resultado.hits);

      //Calculo del total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);

      guardarTotalPaginas(calcularTotalPaginas);
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth'});

    }
    consultarApi();

  },[busqueda, paginaActual]);

  //definir la pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1;
    if (nuevaPaginaActual === 0 ) return;
    guardarParginaActual(nuevaPaginaActual);

  }

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1;
    if (nuevaPaginaActual > totalPaginas ) return;
    guardarParginaActual(nuevaPaginaActual);
  }


  return (
    <div className="container">
      <div className="jumbotron">
          <p className="lead text-center">Buscador de imagenes</p>
          <Formulario 
            guardarBusqueda={guardarBusqueda}
          />
          <div className="row justify-content-center">
              <ListadoImagenes 
                  imagenes={listadoImagen}
              />

              { (paginaActual ===1)? null : (
              
                <button 
                  type="button"
                  className="bbtn btn-info mr-1"
                  onClick={paginaAnterior}>
                    &laquo; Anterior
                </button>
            
              )}

              { (paginaActual === totalPaginas) ? null : (

              <button 
                type="button"
                className="bbtn btn-info mr-1"
                onClick={paginaSiguiente}>
                  Siguiente &raquo;
              </button>

              )}
          </div>
      </div>      
    </div>
  );
}

export default App;
