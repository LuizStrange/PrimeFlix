import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from './pages/home';
import Filme from "./pages/filmes";
import Favoritos from "./pages/Favoritos";
import Header from "./components/Header";

import Erro from "./pages/erro";

function RoutesApp() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/filme/:id" element={<Filme/>} />
                <Route path="/favoritos" element={<Favoritos />}/>

                <Route path="*" element={<Erro />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;