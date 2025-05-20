import { useState } from 'react'
import axios from 'axios'

function App() {  
  const [query, setQuery] = useState('');  
  const [movies, setMovies] = useState([]);  

  const searchMovies = async () => {  
    const apiKey = 'c33167e9d3011551d63c19014452e047'; 
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);  
    setMovies(response.data.results);  
  };  

  return (  
    <div className="container">  
      <h1 className="my-4">Cerca Film</h1>  
      <div className="input-group mb-3">  
        <input   
          type="text"   
          className="form-control"   
          placeholder="Cerca un film..."   
          value={query}  
          onChange={(e) => setQuery(e.target.value)}   
        />  
        <button className="btn btn-primary" onClick={searchMovies}>  
          Cerca  
        </button>  
      </div>  

      <div className="row">  
        {movies.map((movie) => (  
          <div className="col-md-4 mb-4" key={movie.id}>  
            <div className="card">  
              <div className="card-body">  
                <h5 className="card-title">{movie.title}</h5>  
                <h6 className="card-subtitle mb-2 text-muted">{movie.original_title}</h6>  
                <p className="card-text">Lingua: {movie.original_language}</p>  
                <p className="card-text">Voto: {movie.vote_average}</p>  
              </div>  
            </div>  
          </div>  
        ))}  
      </div>  
    </div>  
  );  
}  

export default App;  

