import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    fetchUserData(page);
  }, [page]);

  async function fetchUserData(page) {
    setLoading(true);
    try {
      let res = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`);
      
      const totalCount = Number(res.headers["x-total-count"]);
    const totalPage = Math.ceil(totalCount / 10);
    
      setTotalPage(totalPage)
      setUserData(res.data);
      setLoading(false);
    } catch (error) {
      setErr(true);
      setLoading(false);
    }
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (err) {
    return <h2>Something went wrong...</h2>;
  }


  return (
    <>
    <h1 className="title">Todo App</h1>
    <div className="container">
      {userData &&
        userData.length > 0 &&
        userData.map((post) => (
          <div  key={post.id}>
            <h3>
            {post.id} { ` .   `}
            {post.title}
            </h3>
          </div>
        ))}
        <div className="btn">
          <button disabled={page === 1} onClick={()=> setPage(page - 1)}>prev</button>
          <p>page: {page}</p>
          <button disabled={page === totalPage} onClick={()=> setPage(page + 1)}>next</button>
        </div>
    </div>
    </>
  );
}

export default App;
