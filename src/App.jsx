import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import GameOver from "./components/GameOver";


const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const INITIAL_GAME_BOARD = [
  [null, null,null],
  [null, null,null],
  [null, null,null]
]

const WINNING_COMBINATIONS = [
  [
    { row: 0, column: 0 },
    { row: 0, column: 1 },
    { row: 0, column: 2 },
  ],
  [
    { row: 1, column: 0 },
    { row: 1, column: 1 },
    { row: 1, column: 2 },
  ],
  [
    { row: 2, column: 0 },
    { row: 2, column: 1 },
    { row: 2, column: 2 },
  ],
  [
    { row: 0, column: 0 },
    { row: 1, column: 0 },
    { row: 2, column: 0 },
  ],
  [
    { row: 0, column: 1 },
    { row: 1, column: 1 },
    { row: 2, column: 1 },
  ],
  [
    { row: 0, column: 2 },
    { row: 1, column: 2 },
    { row: 2, column: 2 },
  ],
  [
    { row: 0, column: 0 },
    { row: 1, column: 1 },
    { row: 2, column: 2 },
  ],
  [
    { row: 0, column: 2 },
    { row: 1, column: 1 },
    { row: 2, column: 0 },
  ],
]

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player == "X") {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function deriveWinner(gameBoard, players){
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymmbol = gameBoard[combination[0].row][combination[0].column] 
    const secondSquareSymmbol = gameBoard[combination[1].row][combination[1].column] 
    const thirdquareSymmbol = gameBoard[combination[2].row][combination[2].column] 

    if (
      firstSquareSymmbol && 
      firstSquareSymmbol === secondSquareSymmbol 
      && firstSquareSymmbol === thirdquareSymmbol) {
      winner = players[firstSquareSymmbol];
    } 
  }

  return winner;
}

function deriveGameBoar(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
  for ( const turn of gameTurns) {
      const {square, player} = turn;
      gameBoard[square.row][square.col] = player
  }
  return gameBoard
}

function App() {
  // const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2'
  })
  
  const activePlayer = deriveActivePlayer(gameTurns);

 const gameBoard = deriveGameBoar(gameTurns)

  const winner = deriveWinner(gameBoard, players)

  const hasDraw = gameTurns.length === 9 && !winner 

  const handleSelectSquare = (rowIndex, colIndex) => {
    // setActivePlayer((currentActivePlayer) => currentActivePlayer === 'X'? 'O': 'X')
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns]
      return updatedTurns;
    })
  }

  const handleRematch = () => {
    setGameTurns([]);
  }

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [symbol]: newName
    }) )
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
         <Player initialName={PLAYERS.X} symbol={"X"} isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange}/>
         <Player initialName={PLAYERS.O} symbol={"O"} isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRematch}/>}
        <GameBoard 
          onSelectSquare={handleSelectSquare} 
          activePlayerSymbol={activePlayer} 
          board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
