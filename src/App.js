import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      //console.log(response);
      setRepositories(response.data);
    });
  }, [] );


  async function handleAddRepository() {
    // TODO

    const response = await api.post('repositories',{
      title: `Desafio com JS ${Date.now()}`,
      url: `https://github.com/raicherodrigo/desafio-conceitos-node/ ${Date.now()}`,
      techs: ["Node.js", "JavaScript"]
    });

    console.log(setRepositories);
    const repositorie = response.data;

    setRepositories([...repositories, repositorie]);

  }

  async function handleRemoveRepository(id) {
     await api.delete(`repositories/${id}`);
    //console.log(id);

    setRepositories(repositories.filter(repositorie => repositorie.id !== id));
    
  }

  
  return (
    <div>
      <ul data-testid="repository-list">
         {repositories.map(repositorie => <li key={repositorie.id}>{repositorie.title}

          <button onClick={() => handleRemoveRepository(repositorie.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
