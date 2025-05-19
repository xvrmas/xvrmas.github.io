import { useState } from 'react';
import './Apps.css';

function App() {
  const [tasques, setTasques] = useState([]);
  const [novaTasca, setNovaTasca] = useState('');

  const afegirTasca = () => {
    if (novaTasca.trim() === '')
      return;
    setTasques([...tasques, { text: novaTasca, complerta: false }]);
    setNovaTasca('');
  }

  const eliminarTasca = (index) => {
    setTasques(tasques.filter((_, i) => i !== index));
  }

  const toggleCompletada = (index) => {
    setTasques(tasques.map((tasques, i) =>
      i === index ? { ...tasques, complerta: !tasques.complerta } : tasques
    ));
  };

  return (

    <div className="App">
      <h3>Llista de coses a fer</h3>
      <input
        value={novaTasca}
        onChange={(e) => setNovaTasca(e.target.value)}
        placeholder='Nova tasca'
      />
      <button onClick={afegirTasca}>+</button>
      <ul>
        {tasques.map((tasques, index) => (
          <li key={index} style={{ textDecoration: tasques.complerta ? 'line-through' : 'none' }}>
            <span onClick={() => toggleCompletada(index)} style={{ cursor: 'pointer' }}>
              {tasques.text}
            </span>
            <button onClick={() => eliminarTasca(index)} style={{ marginLeft: '10px' }}>Eliminar</button>
          </li>

        ))}
      </ul>
    </div>

  );


};

export default App;


