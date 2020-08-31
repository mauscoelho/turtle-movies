export async function getMovies() {
  try {
    const response = await fetch(
      "https://tender-mclean-00a2bd.netlify.app/mobile/movies.json"
    );
    const movies = await response.json();
    console.log("movies", movies);
    return movies;
  } catch (error) {
    console.error(error);
  }
}
