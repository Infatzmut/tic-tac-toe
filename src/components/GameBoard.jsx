const GameBoard = ({onSelectSquare, board}) => {
    // const [gameBoard, setGameBoard] = useState(initialGameBoard)
    
    // const handleSelectedSquare = (rowIndex, colIndex) => {
    //     setGameBoard(prevGameBoard => {
    //         const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     })

    //     onSelectSquare();
    // }
    return (
        <ol id="game-board">
            {board.map((row, rowIndex)=>{
                return (
                    <li key={rowIndex}>
                        <ol>
                            {row.map((playerSimbol, colIndex) => {
                                return (
                                    <li key={colIndex}>
                                        <button 
                                            onClick={() => onSelectSquare(rowIndex, colIndex)} 
                                            disabled={playerSimbol !== null}>
                                                {playerSimbol}
                                            </button>
                                    </li>
                                )
                            })}
                        </ol>
                    </li>
                )
            })}
        </ol>
    )
}

export default GameBoard;