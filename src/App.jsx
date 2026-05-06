import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cat, setCat] = useState(null);

  const fetchCat = async () => {
    try {
      const res = await fetch(
        "https://api.freeapi.app/api/v1/public/cats/cat/random"
      );
      const data = await res.json();
      setCat(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCat();
  }, []);

  if (!cat) return <div className="loading">Loading...</div>;

  return (
    <div className="page">
      <div className="card">
        {/* LEFT IMAGE */}
        <div className="image-box">
          <img
            src={cat.image || cat.url || cat.image?.url}
            alt={cat.name}
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="content">
          <p className="tag">FEATURED BREED</p>

          <h1>{cat.name}</h1>

          <p className="description">{cat.description}</p>

          <div className="info">
            <div>
              <span>Origin</span>
              <h3>{cat.origin}</h3>
            </div>
            <div>
              <span>Life span</span>
              <h3>{cat.life_span}</h3>
            </div>
            <div>
              <span>Weight</span>
              <h3>{cat.weight?.metric} kg</h3>
            </div>
          </div>

          <div className="traits">
            {cat.temperament
              ?.split(", ")
              .slice(0, 6)
              .map((t, i) => (
                <span key={i}>{t}</span>
              ))}
          </div>

          <button onClick={fetchCat}>Next Cat</button>
        </div>
      </div>
    </div>
  );
}

export default App;