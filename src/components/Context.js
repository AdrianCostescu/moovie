import { createContext } from "react";

export const DataContext = createContext();

// const [data, setData] = useState();

// useEffect(() => {
//   fetch("http://localhost:8000/movies")
//     .then((res) => res.json())
//     .then((data) => setData(data))
//     // TODO: Handle error case
//     .catch((error) => console.log(error));
// }, []);
