import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Reset from "./pages/Reset.js";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Favorite from "./pages/Favorite";
import { GlobalStyle } from "./GlobalStyles";
import { apolloClient } from "./graphql/client";
import Administrator from "./pages/Administrator.js";
import MyProfile from "./pages/MyProfile.js";
import Categories from "./pages/Categories.js";
import CategoriesType from "./components/CategoriesType.js";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
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
          <Route path="profile" element={<MyProfile />} />
          <Route path="categories" element={<Categories />}></Route>
          <Route path="categories/:props" element={<CategoriesType />}></Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
