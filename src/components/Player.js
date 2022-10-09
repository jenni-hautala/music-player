import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { faPause } from "@fortawesome/free-solid-svg-icons/faPause";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";

const Player = ({
  isPlaying,
  setIsPlaying,
  currentSong,
  audioRef,
  setSongInfo,
  songInfo,
  songs,
  setCurrentSong,
  setSongs,
}) => {
  // UseEffect
  useEffect(() => {
    // Add active state
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
        return {
          ...song, // Kaikki muut pysyy samana
          active: true, // vain active muuttuu
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  }, [currentSong]);

  // Event Handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  /**
   * For formatting time nicely
   * @param {*} time
   */
  const getTime = (time) =>
    `${Math.floor(time / 60)}:${("0" + Math.floor(time % 60)).slice(-2)}`;
  const dragHandler = (e) => {
    // Päivitetään audiokohta siihen mihin draggaillaan
    audioRef.current.currentTime = e.target.value;

    // Rangen eri arvot kun draggaillaan: e.target.value
    // Päivitetään songInfo-objektin currentTime siihen mihin draggaillaan
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id); // Ei saada nykyisen biisin indexiä muuten ku vertaamalla sitä koko laulujen listaan
    if (direction === "skip-forward") {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]); // Menee ympäri kun steppaa yli
    } else if ((currentIndex - 1) % songs.length === -1) {
      setCurrentSong(songs[songs.length - 1]);
    } else {
      setCurrentSong(songs[(currentIndex - 1) % songs.length]);
    }
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration || 0} // TODO: poisti errorin, mutta onko paras vaihtoehto
          type="range"
          value={songInfo.currentTime}
          onChange={dragHandler}
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
