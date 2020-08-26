const API_KEY = "92036cd40c0e1112f1d9e6dab2c4a657";

const requests = {
	fetchtrending: `/trending/movie/week?api_key=${API_KEY}&language=en-US`,
	fetchoriginals: `/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_networks=213`,
	fetchpopular: `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
	fetchromantic: `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
	fetchcomedy: `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
	fetchaction: `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
	fetchdrama: `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=18`,
	fetchtoprated: `/tv/top_rated?api_key=${API_KEY}&language=en-US`,
	fetchupcoming: `/movie/upcoming?api_key=${API_KEY}&language=en-US`
	//similar_tv_shows
}

export default requests;

//{"genres":[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},
//{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},
//{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},
//{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},
//{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},
//{"id":10752,"name":"War"},{"id":37,"name":"Western"}]}