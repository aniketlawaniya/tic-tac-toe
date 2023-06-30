import "./styles.css";
import { useState } from "react";
const Cell = ({ mark, disabled, onClick }) => {
  return (
    <button disabled={disabled} onClick={onClick} className="cell">
      {mark}
    </button>
  );
};

const CELLS_IN_LINE = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 6, 8],
  [0, 4, 8],
  [2, 6, 8]
];

const determineWinner = (board) => {
  for (let i = 0; i < CELLS_IN_LINE.length; i++) {
    const [x, y, z] = CELLS_IN_LINE[i];

    if (board[x] !== null && board[x] === board[y] && board[y] === board[z]) {
      return board[x];
    }
  }
  return null;
};
export default function App() {
  const [currentPlayer, seCurrentPlayer] = useState("X");
  const [board, setBoard] = useState(Array(9).fill(null));
  const winner = determineWinner(board);

  const getStatus = () => {
    if (winner !== null) {
      return `Player ${winner} wins`;
    }
    if (!board.includes(null)) {
      return "Draw, Please Reset";
    }
    return `Player ${currentPlayer} turn`;
  };
  return (
    <div className="App">
      <p>{getStatus()}</p>
      <div className="board">
        {Array(9)
          .fill(null)
          .map((_, index) => index)
          .map((cellIndex) => (
            <Cell
              mark={board[cellIndex]}
              disabled={board[cellIndex] || winner}
              onClick={() => {
                const newBoard = [...board];
                newBoard[cellIndex] = currentPlayer;
                setBoard(newBoard);
                seCurrentPlayer(currentPlayer === "X" ? "0" : "X");
              }}
            />
          ))}
      </div>

      <button
        onClick={() => {
          setBoard(Array(9).fill(null));
          seCurrentPlayer("X");
        }}
      >
        Reset
      </button>
    </div>
  );
}
