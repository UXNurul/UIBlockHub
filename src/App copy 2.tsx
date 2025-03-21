import { useEffect, useState } from 'react';
import './App.css';

interface Component {
  id: number;
  framework: string;
  type: string;
  variant?: string;
  html: string;
}

function App() {
  const [components, setComponents] = useState<Component[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://apiuiblockhub.pages.dev/get-components')
      .then((res) => res.json())
      .then((data) => {
        setComponents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching components:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Components</h1>
      <ul>
        {components.map((comp) => (
          <li key={comp.id}>
            <strong>{comp.framework} {comp.type} ({comp.variant || 'N/A'})</strong>
            <div dangerouslySetInnerHTML={{ __html: comp.html }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;