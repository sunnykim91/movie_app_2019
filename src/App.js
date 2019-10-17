import React from 'react';
import axios from 'axios';
import Movie from './Movie';

class App extends React.Component {

  state = {
    isLoading: true,
    movies: []
  };

  // 비동기로 처리하는 async await 는 axios를 처리할때까지 기다려주게 한다.
  getMovies = async () => {
    const {
      data: { 
        data: { movies } 
      }
    } = await axios.get('https://yts-proxy.now.sh/list_movies.json');
    this.setState({movies, isLoading: false});
  }

  componentDidMount() {
    this.getMovies();
  }

  render() {

    const { isLoading, movies } = this.state;

    return (
      <section className="container">
          {isLoading ? (
            <div className="loader">
              <span className="loader__text">Loading...</span>
            </div>
          ) : (
            <div className="movies">
              {movies.map(movie => (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres={movie.genres}
                />
              )
              )}
            </div>  
          ) 
        }
      </section>
    );
  }

}

export default App;
