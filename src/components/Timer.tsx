import React, { useEffect, useRef, useState } from 'react';
import { Player } from '../models/Player';
import { Colors } from '../models/Colors';

interface TimerProps {
	currentPlayer: Player | null;
	restart: () => void;
}

const Timer: React.FC<TimerProps> = ({ currentPlayer, restart }) => {
	const [blackTime, setBlackTime] = useState(180);
	const [whiteTime, setWhiteTime] = useState(180);

	const timer = useRef<null | ReturnType<typeof setInterval>>(null);

	useEffect(() => {
		startTimer();
	}, [currentPlayer]);

	function startTimer() {
		if (timer.current) {
			clearInterval(timer.current);
		}

		const callback =
			currentPlayer?.color === Colors.BLACK ? decrementBlackTime : decrementWhiteTime;

		timer.current = setInterval(callback, 1000);
	}

	function decrementBlackTime() {
		setBlackTime((prev) => prev - 1);
	}

	function decrementWhiteTime() {
		setWhiteTime((prev) => prev - 1);
	}

	function handleRestart() {
		setWhiteTime(180);
		setBlackTime(180);

		restart();
	}

	return (
		<div className="timer">
			<div>
				<button onClick={handleRestart}>Restart game</button>
			</div>
			<h2>Black - {blackTime}</h2>
			<h2>White - {whiteTime}</h2>
		</div>
	);
};

export default Timer;
