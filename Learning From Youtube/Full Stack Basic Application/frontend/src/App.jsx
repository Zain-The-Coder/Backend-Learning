import { useEffect, useState } from "react"
import axios from "axios";


function App() {
  const [jokes , setJokes] = useState([]);

  useEffect(() => {
    axios.get('/api/jokes')
    .then((res) => {
      console.log(res)
      setJokes(res.data)
    }) .catch((e) => {
      console.log(e);
    })
    
  } , [])

  return (
    <>
    <h1>Chai And Full Stack</h1>
    <p>Jokes : {jokes.length}</p>
    {jokes.map((joke) => (
      <div key={joke.id}>
        <h3>{joke.title}</h3>
        <p>{joke.content}</p>
      </div>
    ))}
    </>
  )
}

export default App
