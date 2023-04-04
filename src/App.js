import { useEffect, useState } from 'react';
import './CSS/App.css';

export default function App() {

  const [conteudo, setConteudo] = useState(<></>);
  const [busca, setBusca] = useState("");

  function translateStatus(status) {
    switch (status) {
      case 'Alive':
        return 'Vivo'
      // break

      case 'Dead':
        return 'Morto'

      case 'unknown':
        return 'Desconhecido'

      default:
        return status
    }
  }

  function translateGender(gender) {
    switch (gender) {
      case 'Male':
        return 'Homem'
      // break

      case 'Female':
        return 'Mulher'

      case 'unknown':
        return 'Desconhecido'

      case 'Genderless':
        return 'Sem Gênero'

      default:
        return gender
    }
  }

  function translateSpecies(species) {
    switch (species) {
      case 'Human':
        return 'Humano'

      case 'Alien':
        return 'Alienígena'

      case 'Robot':
        return 'Robô'

      case 'unknown':
        return 'Desconhecido'

      default:
        return species
    }
  }

  async function carregarTodosOsPersonagens() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    const result = await fetch(
      "https://rickandmortyapi.com/api/character" + busca,
      requestOptions
    )
      .then(response => response.text())
      .then(result => { return result })
      .catch(error => console.log('error', error))

    const char = JSON.parse(result)

    return char.results;
  }

  async function listaPersonagem() {
    const todosPersonagens = await carregarTodosOsPersonagens();

    return todosPersonagens.map(personagem =>
      <div className='card char'>
        <img src={personagem.image} alt={personagem.name} />
        <h1>{personagem.name}</h1>
        <p><strong>Espécie:</strong> {translateSpecies(personagem.species)}</p>
        <p><strong>Gênero:</strong> {translateGender(personagem.gender)}</p>
        <p className='lista-secundaria'>
          Participações:
          {
            personagem.episode.map(ep => (
              <span key={personagem.name + (ep.split('episose/')[1])}>
                Ep - {(ep.split('episode/')[1])},
              </span>
            ))
          }
        </p>
        <p><strong>Status:</strong> {translateStatus(personagem.status)}</p>
      </div>
    )
  }

  useEffect(() => {
    async function carregar() {
      setConteudo(await listaPersonagem());
    }

    carregar();
  }, [busca])

  return (
    <div className="App">
      <header className="cabecalho">
        <h1>Rick and Morty API</h1>
      </header>

      <div className='filtros'>
        <span className='filtros-titulos'>Filtros</span>
        <div className='filtro status'>
          <b>Status</b>
          <span onClick={() => setBusca("?status=live")}>Vivo</span>
          <span onClick={() => setBusca("?status=dead")}>Morto</span>
          <span onClick={() => setBusca("?status=unknown")}>Desconhecido</span>
        </div>

        <div className='filtro genero'>
          <b>Gênero</b>
          <span onClick={() => setBusca("?gender=Male")}>Masculino</span>
          <span onClick={() => setBusca("?gender=Female")}>Feminino</span>
          <span onClick={() => setBusca("?gender=less")}>Sem Gênero</span>
          <span onClick={() => setBusca("?gender=unknown")}>Desconhecido</span>
        </div>
      </div>

      <div className="lista-principal">
        {conteudo}
      </div>
    </div>
  );
}