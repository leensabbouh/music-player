import React from 'react'
import LibrarySong from './LibrarySong';
const Library = ({LibraryStatus,isPlaying,audioRef,songs,setCurrentSong,setSongs}) => {
  return (
    <div className={`library ${LibraryStatus ? 'active-library' : ""}`}>
        <h2>Library</h2>
        <div className='library-songs'>
        {songs.map(song=> <LibrarySong  id={song.id} setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} songs={songs} song={song} setCurrentSong={setCurrentSong} key={song.id}/>)}
        </div>
    </div>
  )
}

export default Library