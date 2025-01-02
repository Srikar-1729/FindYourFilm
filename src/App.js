import React,{useState} from 'react';

import './App.css';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import genres from './genres.js';
import Button from '@mui/material/Button';
import axios from 'axios';
import MovieCard from './MovieCard.js';

function App() {
  const [genre,setGenre] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [data,setData] = useState([]);
  const [isLoading,setLoading] = useState(false);

  const BEARER_TOKEN = process.env.REACT_APP_BEARER_TOKEN; 
  const api_key = process.env.REACT_APP_API_KEY_OMDB;
  
  const handleGenre = (event,value) =>{
    console.log(value);
    if(value.length==0){
      setGenre("");
      setIsVisible(false);
    } 
    else{
      let s = value[0].id;
      for(let i=1;i<value.length;i++){
        s+=','+value[i].id;
      }
      setGenre(s);
    }
   
  };


  const fetchData = async () => {
    try {
      setLoading(true);
      let query = `language=en-US&sort_by=vote_count.desc&with_genres=${genre}`;
      console.log(query);
  
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?${query}`,
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
            Accept: "application/json",
          },
        }
      );
  
      const films = response.data.results;

     
      const detailedData = await Promise.all(
        films.map(async (film) => {
          const ele = {
            title: film.title,
            plot: film.overview,
            image: "https://image.tmdb.org/t/p/w500"+film.poster_path,
          };
  
          const [info, ott] = await fetchSecondaryData(film.id);
          
          ele.runtime = info.Runtime;
          ele.cast = info.Actors;
          ele.dir = info.Director;
          ele.dor = info.Released;
          ele.imdbRat = info.imdbRating;
          
          let otts = ott[0];
          for(let i=1;i<ott.length;i++){
            otts += ', '+ott[i];
          }

          ele.ott = otts;
          // data.push(ele);
          return ele;
        })
      );
      
     
      setData(detailedData);
      setLoading(false);
      setIsVisible(true);
      

    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  

  const fetchSecondaryData = async (id) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`, 
          Accept: "application/json",  // Include Bearer token in Authorization header
        },
      });
      const imdb_id = response.data.imdb_id;
      const response2 = await axios.get(`https://www.omdbapi.com/?i=${imdb_id}&apikey=${api_key}`);
      const response3 = await axios.get(`https://api.themoviedb.org/3/movie/${id}/watch/providers`, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`, 
          Accept: "application/json",  
        },
      });
     
    const x = response3?.data?.results?.IN?.flatrate || [];
    const ott = x.map((item) => item.provider_name);
      
      const arr = [response2.data,ott];
      console.log(arr);
      return arr;
      
    } catch (err) {
      console.log(err.message);
    } finally {
      
    }
  };

  return (
    <div className="App">
      <div>
        <p class="tagline">Bored? Want to watch a movie? But don't know which. Then </p>
        <h1 class="majorHead">FYF - Find Your Film </h1>
      </div>
      
      
      

      <div className="filters">
          <Autocomplete
            multiple
            id="tags-outlined"
            options={genres}
            onChange={handleGenre}
            getOptionLabel={(option) => option.name}
            sx={{ width: 300}}
            
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Select Genre"
                placeholder="Genre"
              />
            )}
          />
          {/* <Autocomplete
          disablePortal
          options={["Newest to Oldest","Oldest to Newest"]}
          sx={{ width: 200 }}
          onChange={(event,value)=>{
            setOrder(value);
          }}
          renderInput={(params) => <TextField {...params} label="Sort by" />} */}
        {/* /> */}
        <Button variant="contained" color="success" onClick={fetchData} >Search</Button>
      </div>

      {isLoading && <p>Loading...</p>}

      {isVisible && <div class="list" >
          <div class="scroll">
            {data.length>0 && data.map((film)=>{
              // const info = fetchSecondaryData(film.id);
              console.log(data);
               return(<MovieCard
                 plot={film.plot} 
                 image={film.image} 
                 title={film.title} 
                 runtime={film.runtime}
                 date={film.dor}
                 dir={film.dir}
                 cast={film.cast}
                 imdbRat={film.imdbRat}
                 ott={film.ott}/>);
            }
            
            )}
          
         
          
          </div>
          
        
      </div>}
      
    </div>
  );
}

export default App;
