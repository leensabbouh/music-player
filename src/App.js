
import { useRef, useState } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import Data from "./Data";
import Library from "./components/Library";
import "../src/styles/app.scss";
import Nav from "./components/Nav";
function App() {
  const audioRef=useRef(null);
  const [songs,setSongs]=useState(Data);
  const [currentSong,setCurrentSong]=useState(songs[0]);
  const [isPlaying,setIsPlaying]=useState(false);
  const [songInfo,setSongInfo]=useState({
    currentTime:0,
    duration:0,
    animationPercentage:0,
  });
  const[LibraryStatus,setLibraryStatus]=useState(false);
  const timeUpdateHandler=(e)=>{
    const current=e.target.currentTime;
    const duration=e.target.duration;
    const roundedCurrent=Math.round(current);
    const roundedDuration=Math.round(duration);
    const animate=Math.round((roundedCurrent/roundedDuration)*100);
    setSongInfo({...songInfo,currentTime:current,duration:duration,animationPercentage:animate})
     }
     const songEndHandler=async()=>{
      let currentIndex=songs.findIndex((song)=>song.id===currentSong.id);
        await setCurrentSong(songs[(currentIndex+1)%songs.length]);
        if(isPlaying) audioRef.current.play();
      
     }
  return (
    <div className={`App ${LibraryStatus?"library-active":""}`}>
      <Nav LibraryStatus={LibraryStatus} setLibraryStatus={setLibraryStatus} />
     <Song currentSong={currentSong}/>
      <Player setSongs={setSongs} setCurrentSong={setCurrentSong} currentSong={currentSong} songs={songs} songInfo={songInfo} setSongInfo={setSongInfo} audioRef={audioRef} setIsPlaying={setIsPlaying} isPlaying={isPlaying}/>
      <Library 
      LibraryStatus={LibraryStatus} setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong}/>
      <audio onEnded={songEndHandler} onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
   
    </div>
  );
}

export default App;
