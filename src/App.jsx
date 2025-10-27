import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [first, setFirst] = useState("?")
  const [second, setSecond] = useState("?")
  const [third, setThird] = useState("?")
  const [user, setUser] = useState("")
  const [message, setMessage] = useState("")
  const [userwin, setUserwin] = useState(0)
  const [userloss, setUserloss] = useState(0)
  const [spinning, setSpinning] = useState(false)

  // Load stored scores on mount
  useEffect(() => {
    setUserwin(Number(localStorage.getItem("wins")) || 0)
    setUserloss(Number(localStorage.getItem("losses")) || 0)
  }, [])

  // Save scores when they change
  useEffect(() => {
    localStorage.setItem("wins", userwin)
    localStorage.setItem("losses", userloss)
  }, [userwin, userloss])

  function generateNumbers() {
    if (user === "") {
      setMessage("⚠️ Please enter a number first!")
      return
    }

    setSpinning(true)
    setMessage("🎡 Spinning...")

    const spinInterval = setInterval(() => {
      setFirst(Math.floor(Math.random() * 10))
      setSecond(Math.floor(Math.random() * 10))
      setThird(Math.floor(Math.random() * 10))
    }, 100)

    setTimeout(() => {
      clearInterval(spinInterval)
      setSpinning(false)

      const n1 = Math.floor(Math.random() * 10)
      const n2 = Math.floor(Math.random() * 10)
      const n3 = Math.floor(Math.random() * 10)
      const sum = n1 + n2 + n3

      setFirst(n1)
      setSecond(n2)
      setThird(n3)

      if (parseInt(user) === sum) {
        setMessage(`🎉 You Won! The sum was ${sum}`)
        setUserwin(prev => prev + 1)
      } else {
        setMessage(`😢 You Lost! The sum was ${sum}`)
        setUserloss(prev => prev + 1)
      }

      setUser("") // Clear input after result
    }, 1000)
  }

  function resetScore() {
    setUserwin(0)
    setUserloss(0)
    localStorage.removeItem("wins")
    localStorage.removeItem("losses")
    setMessage("Scores reset successfully!")
  }

  return (
    <div className="container">
      <h1>🎲 Test Your Luck and Win!</h1>

      <div className="digits">
        <h2>{first}</h2>
        <h2>{second}</h2>
        <h2>{third}</h2>
      </div>

      <div>
        <input
          type="number"
          min="0"
          max="27"
          placeholder="Choose a number between 0–27"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </div>

      <button onClick={generateNumbers} disabled={!user || spinning}>
        {spinning ? "Spinning..." : "Spin the Wheel!"}
      </button>

      <h3>{message}</h3>

      <div className="scoreboard">
        <h3>🏆 Total Wins: {userwin}</h3>
        <h3>💀 Total Losses: {userloss}</h3>
      </div>

      <button onClick={resetScore} className="reset-btn">
        Reset Score
      </button>
    </div>
  )
}

export default App
