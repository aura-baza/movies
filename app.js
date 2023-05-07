let pagina = 1;
const btnAnterior = document.getElementById("btn_anterior");
const btnSiguiente = document.getElementById("btn_siguiente");
btnSiguiente.addEventListener("click", () => {
  if (pagina < 1000) {
    pagina += 1;
    getMovies();
  }
});
btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    pagina -= 1;
    getMovies();
  }
});
const getMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=e17acfd98e5cf3cc361c808fdcfa3bcd&languaje=es-ca&page=${pagina}`
    );
    //si la respuesta es correcta
    if (response.status === 200) {
      const data = await response.json();
      let movies = "";
      data.results.forEach((movie) => {
        console.log(movie);
        movies += `
        <div class="movie">
        <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
        <h3 class="title">${movie.title}</h3>
        </div>
        `;
      });
      document.getElementById("container").innerHTML = movies;
    } else if (response.status === 401) {
      console.log("Algo anda mal");
    } else if (response.status === 404) {
      console.log("La pelicula que que buscas no existe");
    } else {
      console.log("hubo un error, no se que pasó");
    }
  } catch (error) {
    console.log(error);
  }
};
getMovies();
