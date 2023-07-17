import { useState } from 'react';
import axios from 'axios';

function PosterSelect() {
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
    const keyword = `${searchTerm} movie scenes`;
    const apiKey = import.meta.env.VITE_APIKEY;
    const cx = import.meta.env.VITE_CX;
  
    axios
      .get('https://www.googleapis.com/customsearch/v1', {
        params: {
          q: keyword,
          cx: cx,
          searchType: 'image',
          num: 5,
          key: apiKey,
        },
      })
      .then((response) => {
        const posterResults = response.data.items.map((item) => item.link);
        setResults(posterResults);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error searching movie posters:', error);
      });
  };

  return (
    <div style={{display: "flex", overflow:"hidden",flexDirection: "column",width: "100vw",maxWidth: "1280px",marginInline: "auto",backgroundColor:"#00dbd730"}}>
      <form onSubmit={handleFormSubmit} style={{display: "flex",flexWrap: "wrap",alignItems: "center",justifyContent:"center",gap: "24px", width: "100vw",maxWidth: "1280px",marginInline: "auto",marginTop:"100px"}}>
        <input style={{fontSize: "28px",padding: "12px", border: "1px solid #00000030",borderRadius:"8px"}} type="text" value={searchTerm} onChange={handleInputChange} />
        <button style={{width:"max-content",padding:"18px",fontWeight:"bold",fontSize:"20px",color:"white",border:"none",backgroundColor:"teal",borderRadius:"8px",boxShadow:"1px 1px 4px #00000050"}} type="submit">Search</button>
      </form>
      {loading? <p>Loading...</p> :
      <div style={{display: "flex",padding:"20px",flexWrap: "wrap",gap: "24px", width: "100vw",maxWidth: "1280px",marginInline: "auto",marginBlock:"100px"}}>
        {results.map((poster, index) => (
          <div
          key={index}
          style={{border: "2px solid teal",borderRadius: "8px"}}
          >
          <img
            src={poster}
            style={{height: "200px",maxWidth: "160px;"}}
            alt={`Movie Poster ${index}`}
            onClick={() => handlePosterSelect(poster)}
          />
          </div>
        ))}
      </div>
}
      <div>
        {selectedPoster && (
          <div style={{display:"flex",margin:"18px",border:"1px solid #00000020",borderRadius:"8px",gap:"18px",flexDirection:"column",justifyContent:"center",alignItems:"center",width: "100vw",maxWidth: "1280px",textAlign:"center",marginInline:"auto",padding:"14px"}}>
            <img style={{height: "200px",maxWidth: "600px"}} src={selectedPoster} alt="Selected Movie Poster" />
            <button style={{color:"white",width:"max-content",padding:"12px",fontWeight:"bold",fontSize:"20px",border:"none",backgroundColor:"teal",borderRadius:"8px",boxShadow:"1px 1px 4px #00000050"}} onClick={() => setSelectedPoster('')}>Submit</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PosterSelect;
