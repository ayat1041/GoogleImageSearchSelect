import { useState } from 'react';
import axios from 'axios';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedPoster, setSelectedPoster] = useState('');
  const [loading, setLoading] = useState(true);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    searchMoviePosters();
  };

  const handlePosterSelect = (poster) => {
    setSelectedPoster(poster);
  };

  const searchMoviePosters = () => {
    setLoading(true);
    const keyword = `${searchTerm}`;
    // const keyword = `${searchTerm} movie poster`;
    const accessKey = 'LhCIikgBgM1KLOk4BHfnKXgaaGH7j-fp8QsMvGJa_lA'; // Replace with your own Unsplash access key
  
    axios
      .get('https://api.unsplash.com/search/photos', {
        params: {
          query: keyword,
          per_page: 5,
          client_id: accessKey,
        },
      })
      .then((response) => {
        const posterResults = response.data.results.map((item) => item.urls.small);
        setResults(posterResults);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error searching movie posters:', error);
      });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} style={{display: "flex",flexWrap: "wrap",alignItems: "center",justifyContent:"center",gap: "24px", width: "100vw",maxWidth: "1280px",marginInline: "auto",marginTop:"100px"}}>
        <input style={{fontSize: "28px",padding: "12px", border: "1px solid #00000030",borderRadius:"8px"}} type="text" value={searchTerm} onChange={handleInputChange} />
        <button style={{}} type="submit">Search</button>
      </form>
      {loading? <p>loading</p> :
      <div style={{display: "flex",flexWrap: "wrap",gap: "24px", width: "100vw",maxWidth: "1280px",backgroundColor:"orange",marginInline: "auto",marginBlock:"100px"}}>
        {results.map((poster, index) => (
          <div
          key={index}
          style={{border: "2px solid teal",borderRadius: "8px"}}
          >
          <img
            src={poster}
            style={{height: "200px",maxWidth: "200px;"}}
            alt={`Movie Poster ${index}`}
            onClick={() => handlePosterSelect(poster)}
          />
          </div>
        ))}
      </div>
}
      <div>
        {selectedPoster && (
          <div>
            <h3>Selected Poster:</h3>
            <img src={selectedPoster} alt="Selected Movie Poster" />
            <button onClick={() => setSelectedPoster('')}>Submit</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
