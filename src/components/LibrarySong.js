import React from 'react'
const LibrarySong = ({setSongs,isPlaying,audioRef,song,setCurrentSong,id, songs}) => {
  const songSelectHandler=async()=>{
    const selectrsSong=songs.filter((state)=>
      state.id===id
    );
    await setCurrentSong(selectrsSong[0]);
    const newSongs=songs.map((song)=>{
      if(song.id===id){
        return{
          ...song,
          active:true,
        };
      }else{
        return{
          ...song,
          active:false,
        }
      }
    });
    setSongs(newSongs);
    audioRef.current.play();
    if(isPlaying) audioRef.current.play();
  }
 
  
  return (
    <div onClick={songSelectHandler}
     className={`library-song ${song.active ? 'selected' : ""}`}>
        <img alt={song.name} src={song.cover}></img>
       <div className='song-description'>
       <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
         </div> 
    </div>
  )
}

export default LibrarySong;