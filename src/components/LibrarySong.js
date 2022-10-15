import React from "react";

const LibrarySong = ({
  song,
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
}) => {
  const songSelectHandler = async () => {
    setCurrentSong(song);
    // Add active state
    const newSongs = songs.map((songOther) => {
      if (songOther.id === song.id) {
        return {
          ...song, // Kaikki muut pysyy samana
          active: true, // vain active muuttuu
        };
      } else {
        return {
          ...songOther,
          active: false,
        };
      }
    });
    await setSongs(newSongs);
  };
  // Check if song is playing
  if (isPlaying) audioRef.current.play();
  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
