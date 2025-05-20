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
        poster_path: item.poster_path 
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
      <h1 className="my-4">Cerca Film e Serie TV</h1>  
      <div className="input-group mb-3">  
        <input   
          type="text"   
          className="form-control"   
          placeholder="Cerca..."   
          value={query}  
          onChange={(e) => setQuery(e.target.value)}   
        />  
        <button className="btn btn-primary" onClick={searchMedia}>  
          Cerca  
        </button>  
      </div>  

      <div className="row">  
        {results.map((item) => {  
          const countryCode = languageToCountryCode[item.original_language] || item.original_language.toUpperCase();  
          const posterUrl = item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : 'path/to/default/image.png';  

          return (  
            <div className="col-md-4 mb-4" key={item.id}>  
              <div className="card">  
                <img src={posterUrl} className="card-img-top" alt={item.title} /> 
                <div className="card-body">  
                  <h5 className="card-title">{item.title}</h5>  
                  <h6 className="card-subtitle mb-2 text-muted">{item.original_title}</h6>  
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
                  <p className="card-text">Voto: {item.vote_average}</p>  
                  <p className="card-text">Tipo: {item.media_type}</p>  
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