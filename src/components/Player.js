import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";

const Player = () => {
	return(
		<div className="player">
			<div className="time-control">
				<p>Start time</p>
				<input type="range"/>
				<p>End Time</p>
			</div>
			<div className="play-control">
				<FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft}/>
				<FontAwesomeIcon className="play" size="2x" icon={faPlay}/>
				<FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight}/>
			</div>
		</div>
	)
}

export default Player;
