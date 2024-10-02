import { Route, Routes } from "react-router-dom";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Main from "./component/Main";
import MovieDetail from "./component/MovieDetail";
import Search from "./component/Search";
import MovieList from "./component/MovieList";
import TvList from "./component/TvList";
import TvDetail from "./component/TvDetail";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movie_list" element={<MovieList />} />
        <Route path="/tv_list" element={<TvList />} />
        <Route path="/movie_detail" element={<MovieDetail />} />
        <Route path="/tv_detail" element={<TvDetail />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
