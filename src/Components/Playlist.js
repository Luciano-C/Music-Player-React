import React, { useState, useEffect } from "react";
import songs from "../Resources/songs";
import logo from "../logo.JPG"

/* [{ "id": 1, "category": "game", "name": "Mario Castle", "url": "https://assets.breatheco.de/apis/sound/files/mario/songs/castle.mp3" }] */

const Playlist = () => {
    const [currentSong, setCurrentSong] = useState({});
    const [audio, setAudio] = useState(new Audio());
    const [isSongPlaying, setIsSongPlaying] = useState(false);
   
    audio.onended = () => {
        stopMusic();
    };  
    let songListHTML = songs.map((x, i) => <li key={i} onClick={() => {selectSongObject(x.name)}}><span className="songNumber">{i < 9 ? `0${i + 1}` : `${i + 1}`}</span><span className="songName">{x.name}</span></li>);

    useEffect(() => { 
        setAudio(new Audio(currentSong.url));
    }, [currentSong])

  

    const selectSongObject = (requiredSong) => {
        let songObject = songs.filter(x => x.name === requiredSong).reduce(x => x);
        setCurrentSong(songObject);
    }


    const playMusic = () => {
        audio.play();
        setIsSongPlaying(true);
 
    }

    const pauseMusic = () => {
        audio.pause();
        setIsSongPlaying(false);

    }

   const stopMusic = () => {
       audio.pause();
       audio.currentTime = 0;
       setIsSongPlaying(false);
   }



    return (
        <div className="musicPlayer">
            <img id="logo" src={logo} alt="sloth logo"/>
            <ul className="playlist">
                {songListHTML}
            </ul>
            <div className="controls">
                <i className="fas fa-caret-square-left"></i>
                {isSongPlaying === true ? <i className="fas fa-pause-circle" onClick={() => {pauseMusic()}}></i> : <i className="fas fa-play" onClick={() => {playMusic()}}></i> }
                    
                <i className="fas fa-caret-square-right" onClick={() => console.log("hola")}></i>
            </div>

        </div>
    )
}







export default Playlist;