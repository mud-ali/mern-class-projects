import { useState } from 'react'
import './App.css'
import jokes from './jokes'

const App = () => {

    const [jokeNum, setJokeNum] = useState(0);
    const [myJokes, setMyJokes] = useState([...jokes]);

    return (
        <div className="app">
            <h1>Javascript Jokes</h1>
            <div id="joke-container">
                {
                    myJokes[jokeNum].joke
                }
                <div className="actions-container">
                    <div className="likes" onClick={()=>{
                        setMyJokes(myJokes.map((joke, i) => {
                            return i === jokeNum ? { ...joke, likes: joke.likes + 1} : {...joke}
                        }))
                    }}>
                        ❤️ {
                            myJokes[jokeNum].likes
                        }
                    </div>
                    <button onClick={()=>setJokeNum((jokeNum + Math.ceil(Math.random() * myJokes.length)) % myJokes.length) }>
                        Random Joke
                    </button>
                    <button onClick={()=>setJokeNum((jokeNum + 1) % myJokes.length) }>
                        Next Joke
                    </button>
                </div>
            </div>


            <div id="top-joke">
                <h2>
                    Most Liked JS Joke:
                </h2>
                {
                    // get the most liked joke by sorting in reverse by likes
                    myJokes.toSorted((a,b)=> b.likes - a.likes)[0].joke
                } <span>&nbsp; ❤️</span> {
                    myJokes.toSorted((a,b)=> b.likes - a.likes)[0].likes
                }
            </div>

        </div>
    )
}

export default App
