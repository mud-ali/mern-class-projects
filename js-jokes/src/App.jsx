import { useState } from 'react'
import './App.css'
import jokes from './jokes'

const App = () => {

    const [jokeNum, setJokeNum] = useState(0);
    const [myJokes, setMyJokes] = useState([...jokes]);

    return (
        <>
            <h1>Javascript Jokes</h1>
            <div id="joke-container">
                {
                    myJokes[jokeNum]?.joke ?? myJokes?.toString()
                }
                <div id="likes" onClick={()=>{
                    setMyJokes(myJokes.map((joke, i) => {
                        return i === jokeNum ? { ...joke, likes: joke.likes + 1} : {...joke}
                    }))
                }}>
                    ❤️ {
                        myJokes[jokeNum]?.likes
                    }
                </div>
            </div>

            <button onClick={()=>setJokeNum((jokeNum + 1) % jokes.length) }>
                Next Joke
            </button>

            <div id="top-joke">
                <h2>
                    Most Liked JS Joke:
                </h2>
                {
                    // get the most liked joke by sorting in reverse by likes
                    myJokes.toSorted((a,b)=> b.likes - a.likes)[0].joke
                }
                <br />
                ❤️ {
                    myJokes.toSorted((a,b)=> b.likes - a.likes)[0].likes
                }
            </div>

        </>
    )
}

export default App
