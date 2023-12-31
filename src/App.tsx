import React, { useEffect, useState } from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import { Board } from './models/Board';
import { Player } from './models/Player';
import { Colors } from './models/Colors';
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';

function App() {
	const [board, setBoard] = useState(new Board());
	const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
	const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
	const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

	useEffect(() => {
		restart();
		setCurrentPlayer(whitePlayer);
	}, []);

	function restart() {
		const newBoard = new Board();

		newBoard.initCells();
		newBoard.addFigures();

		setCurrentPlayer(whitePlayer);
		setBoard(newBoard);
	}

	function swapPlayer() {
		setCurrentPlayer(currentPlayer?.color === Colors.BLACK ? whitePlayer : blackPlayer);
	}

	return (
		<div className="app">
			<Timer currentPlayer={currentPlayer} restart={restart} />
			<BoardComponent
				board={board}
				setBoard={setBoard}
				currentPlayer={currentPlayer}
				swapPlayer={swapPlayer}
			></BoardComponent>
			<div>
				<LostFigures title="Black Figures" figures={board.lostBlackFigures} />
				<LostFigures title="White Figures" figures={board.lostWhiteFigures} />
			</div>
		</div>
	);
}

export default App;
