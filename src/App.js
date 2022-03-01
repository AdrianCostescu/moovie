import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Reset from "./pages/Reset.js";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Favorite from "./pages/Favorite";
import { DataContext } from "./components/Context";
import { GlobalStyle } from "./GlobalStyles";
import { apolloClient } from "./graphql/client";
import Administrator from "./pages/Administrator.js";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <DataContext.Provider value={{ data: [] }}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="admin" element={<Administrator />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="reset" element={<Reset />} />
            <Route path="/" element={<Home />} />
            <Route path="movies/:id" element={<Movies />} />
            <Route path="favorite" element={<Favorite />} />
          </Routes>
        </BrowserRouter>
      </DataContext.Provider>
    </ApolloProvider>
  );
}

export default App;
