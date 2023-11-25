import React, {  useEffect, useState } from 'react'

const Player = ({setSongs,setCurrentSong,songs,songInfo,setSongInfo,audioRef,isPlaying,setIsPlaying,currentSong}) => {

  
  const playSongHandler=()=>{
if(isPlaying){
  audioRef.current.pause();
  setIsPlaying(!isPlaying);
}else{
  audioRef.current.play();
  setIsPlaying(!isPlaying);
}
  }

  const getTime=(time)=>{
    return(
      Math.floor(time/60)+":"+("0"+Math.floor(time%60)).slice(-2)
    )
  }
  const dragHandler=(e)=>{
    audioRef.current.currentTime=e.target.value;
    setSongInfo({...setSongInfo,currentTime:e.target.value})
  }
  const skipTrackHandler=async(direction)=>{
    let currentIndex=songs.findIndex((song)=>song.id===currentSong.id);
    if(direction==='skip-forward'){
      await setCurrentSong(songs[(currentIndex+1)%songs.length]);
      activeLibraryHandler(songs[(currentIndex+1)%songs.length])
    }if(direction==='skip-back'){
      if((currentIndex-1)%songs.length===-1){
        if(isPlaying) audioRef.current.play();
        await setCurrentSong(songs[songs.length-1]);
        activeLibraryHandler(songs[songs.length-1])
         return;
      }
      activeLibraryHandler(songs[(currentIndex-1)%songs.length])
        await setCurrentSong(songs[(currentIndex-1)%songs.length]);
    }
    if(isPlaying) audioRef.current.play();
  }
  const activeLibraryHandler=(nextPrev)=>{
    const newSongs=songs.map((song)=>{
      if(song.id===nextPrev.id){
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
  }
  const trackAnim={
    transform:`translateX(${songInfo.animationPercentage}%)`
  }
  return (
    <div className='player'>
        <div className='time-control'>
        <p>{getTime(songInfo.currentTime)}</p>
       <div style={{background:`linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`}} className='track'>
       <input onChange={dragHandler} 
       min={0} max={songInfo.duration || 0} 
       value={songInfo.currentTime} type='range'/>
          <div style={trackAnim} className='animate-track'></div></div>  
          <p>{songInfo.duration?getTime(songInfo.duration):'0:00'}</p>
        </div>
        <div className='play-control'>
        <i onClick={()=>skipTrackHandler('skip-back')} className='fa-solid fa-angle-left fa-2xl'></i>
        <i onClick={playSongHandler} className={isPlaying?'fa-solid fa-pause fa-2xl' : 'fa-solid fa-play fa-2xl'}></i>
        <i onClick={()=>skipTrackHandler('skip-forward')} className='fa-solid fa-angle-right fa-2xl'></i>
           
        </div>
       </div>
  )
}

export default Player