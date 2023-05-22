import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from '../../services/api';
import './filme.css';
import { toast } from "react-toastify";

function Filme() {
    const {id} = useParams();
    const [filme, setfilme] = useState({}); 
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: '7c367335aea841578ae73a146f0d132f',
                    language: 'pt-BR',
                }
            })
            .then((resp) => {
                setfilme(resp.data);
                setLoading(false)
            })
            .catch(()=> {
                console.log("Filme não encontrado!")
                navigate("/", {replace: true});
                return;
            })
        }

        loadFilme();

        return () => {
            console.log("COMPONENTE FOI DESMOTADO")
        }
    }, [navigate, id])

    function salvarFilme() {
        const minhaLista = localStorage.getItem("@primeFlix");

        let filmeSalvos = JSON.parse(minhaLista) || []; // Se caso tenha, ele vai exercutar minha lista com um json e caso nao tenha, ELE VAI TER UMA ARRAY VAZIA

        const hasFilmes = filmeSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id) // SOme é um metedo para verificar se dentro da lista tem um ITEM que eu queira usar.

        if(hasFilmes) {
            toast.warn("Filme já está salvo na lista!")
        } else {
            filmeSalvos.push(filme);
            localStorage.setItem("@primeFlix", JSON.stringify(filmeSalvos));
            toast.success("Filme salvo com sucesso!")
        }
    }

    if(loading) {
        return (
            <div className="filme-info">
                <h1>Carregando Detalhes...</h1>
            </div>
        )
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse:</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average}/10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com.br/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;