import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import './home.css';

// URL DA API = movie/now_playing?api_key=7c367335aea841578ae73a146f0d132f&language=pt-BR

function Home() {
    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: '7c367335aea841578ae73a146f0d132f',
                    language: 'pt-BR',
                    page: 1,
                }
            }) 

            setFilme(response.data.results.slice(0, 15));
            setLoading(false)
        }

        loadFilmes();
    }, []);

    if(loading) {
        return (
            <div className="loading">
                <h1>Carregando...</h1>
            </div>
        )
    }
    return (
        <div className="container">
            <div className="lista-filmes">
                {filme.map((filme) => {
                    return (
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;