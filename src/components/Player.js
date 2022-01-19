import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { faPause } from "@fortawesome/free-solid-svg-icons/faPause";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";

const Player = ({ isPlaying, setIsPlaying, currentSong }) => {
	// Ref
	const audioRef = useRef(null);

	// State
	const [songInfo, setSongInfo] = useState({
		// Huom! Nää ei saa olla null
		currentTime: 0,
		duration: 0,
	})

	// Event Handlers
	const playSongHandler = () => {
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	}
	const timeUpdateHandler = (e) => {
		// console.log(e)
		const current = e.target.currentTime;
		const duration = e.target.duration;
		// Setting song info as an object
		// current time changes
		setSongInfo({...songInfo,
						currentTime: current,
						duration
					})
	}
	/**
	 * For formatting time nicely
	 * @param {*} time
	 */
	const getTime = (time) =>
			`${Math.floor(time / 60)}:${('0' + Math.floor(time % 60)).slice(-2)}`
	const dragHandler = (e) => {
		// Päitetään audiokohta siihen mihin draggaillaan
		audioRef.current.currentTime = e.target.value;

		// Rangen eri arvot kun draggaillaan: e.target.value
		// Päivitetään songInfo-objektin currentTime siihen mihin draggaillaan
		setSongInfo({...songInfo, currentTime: e.target.value});
	}

	return(
		<div className="player">
			<div className="time-control">
				<p>{getTime(songInfo.currentTime)}</p>
				<input
					min={0}
					max={songInfo.duration}
					type="range"
					value={songInfo.currentTime}
					onChange={dragHandler}
				/>
				<p>{getTime(songInfo.duration)}</p>
			</div>
			<div className="play-control">
				<FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft}/>
				<FontAwesomeIcon
					onClick={playSongHandler}
					className="play"
					size="2x"
					icon={isPlaying ? faPause : faPlay}
				/>
				<FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight}/>
			</div>
			<audio
				onLoadedMetadata={timeUpdateHandler}
				onTimeUpdate={timeUpdateHandler}
				ref={audioRef}
				src={currentSong.audio}

			></audio>
		</div>
	)
}

export default Player;
