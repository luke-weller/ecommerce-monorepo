import { UUID } from 'crypto';
import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const [data, setData] = useState<{ id: UUID; name: string; description: string; price: number; }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/products/');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {data.map(item => (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>{item.description}</p>
            <p>${item.price}</p>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
