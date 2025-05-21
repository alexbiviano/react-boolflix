import { useState } from 'react'
import axios from 'axios'
import ReactCountryFlag from 'react-country-flag'



const languageToCountryCode = {  
  en: 'GB',  
  'en-US': 'US',  
  fr: 'FR',  
  it: 'IT',  
  es: 'ES',  
  de: 'DE',  
};  

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w342';  

function App() {  
  const [query, setQuery] = useState('');  
  const [results, setResults] = useState([]);  

  const searchMedia = async () => {  
    const apiKey = 'c33167e9d3011551d63c19014452e047'; 

    try {  
      const moviesResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=it_IT`);  
      const tvResponse = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}&language=it_IT`);  

      const combinedResults = [...moviesResponse.data.results, ...tvResponse.data.results];  
      
      const normalizedResults = combinedResults.map(item => ({  
        id: item.id,  
        title: item.title || item.name,  
        original_title: item.original_title || item.original_name,  
        original_language: item.original_language,  
        vote_average: item.vote_average,  
        media_type: item.media_type || (item.title ? 'movie' : 'tv'),  
        poster_path: item.poster_path,  
        overview: item.overview 
      }));  

      setResults(normalizedResults);  
    } catch (error) {  
      console.error('Errore durante la ricerca:', error);  
    }  
  };  

  const getStarRating = (vote) => {  
    return Math.ceil(vote / 2);  
  };  

  return (  
    <div className="container">  
      <header className="header">  
        <div className="logo">  
          <h1>Boolflix</h1> 
        </div>  
        <div className="search-bar">  
          <input   
            type="text"   
            className="form-control"   
            placeholder="Cerca nello streaming..."   
            value={query}  
            onChange={(e) => setQuery(e.target.value)}   
          />  
          <button className="btn btn-primary" onClick={searchMedia}>  
            Cerca  
          </button>  
        </div>  
      </header>  

      <div className="row">  
        {results.map((item) => {  
          const countryCode = languageToCountryCode[item.original_language] || item.original_language.toUpperCase();  
          const posterUrl = item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : 'path/to/default/image.png';  
          const starRating = getStarRating(item.vote_average);  

          return (  
            <div className="col-md-3 mb-4" key={item.id}>  
              <div className="card movie-card">  
                <img src={posterUrl} className="card-img-top" alt={item.title} />  
                <div className="card-body">  
                  <h5 className="card-title">{item.title}</h5>  
                  <p className="card-text">Voto: {item.vote_average}</p>  
                  <p className="card-text">  
                    Lingua:   
                    {item.original_language ? (  
                      <>  
                        <ReactCountryFlag  
                          countryCode={countryCode}  
                          svg  
                          style={{  
                            width: '1.5em',  
                            height: '1.5em',  
                            marginLeft: '0.5em',  
                            verticalAlign: 'middle'  
                          }}  
                        />  
                        {item.original_language.toUpperCase()}  
                      </>  
                    ) : (  
                      <span>N/A</span>  
                    )}  
                  </p>  
                  <div className="star-rating">  
                    {[...Array(5)].map((_, index) => (  
                      <span key={index} className={`star ${index < starRating ? 'filled' : ''}`}>★</span>  
                    ))}
                  </div>  
                </div>  
                <div className="card-overlay">  
                  <p className="card-overview">{item.overview}</p>  
                </div>  
              </div>  
            </div>  
          );  
        })}  
      </div>  
    </div>  
  );  
}  

export default App;  