import React, { useState, useEffect } from "react";
import songs from "../Resources/songs";
import logo from "../logo.JPG"
import pickRandomFromArray from "../Resources/randomFromArray";

/* [{ "id": 1, "category": "game", "name": "Mario Castle", "url": "https://assets.breatheco.de/apis/sound/files/mario/songs/castle.mp3" }] */

const Playlist = () => {
    const [currentSong, setCurrentSong] = useState({});
    const [audio] = useState(new Audio("https://assets.breatheco.de/apis/sound/files/mario/songs/castle.mp3"));
    const [isSongPlaying, setIsSongPlaying] = useState(false);
    const [repeatMode, setRepeatMode] = useState(false);
    const [suffleMode, setShuffleMode] = useState(false);
    const [inputValue, setInputValue] = useState(0)
    

    audio.onended = () => {
        if (!repeatMode) {
            stopMusic();
        }
        else {
            playMusic();
        }    
    };

    audio.ontimeupdate = () => {
        setInputValue(audio.currentTime);
    }


    let songListHTML = songs.map((x, i) => <li key={i} onClick={() => { clickHandler(i) }}><span className="songNumber">{i < 9 ? `0${i + 1}` : `${i + 1}`}</span><span className="songName">{x.name}</span></li>);

    useEffect(() => {
        pauseMusic();
        audio.src = currentSong.url;
        playMusic();
    }, [currentSong]);

    // Para cambiar el botón a play en la primera renderización
    useEffect(() => {
        setIsSongPlaying(false)
    }, []);


    const clickHandler = (i) => {
        setCurrentSong(songs[i]);
    }



    const playMusic = () => {
        audio.play();
        setIsSongPlaying(true);
    }

    const pauseMusic = () => {
        audio.pause();
        setIsSongPlaying(false);
    };

    const stopMusic = () => {
        audio.pause();
        audio.currentTime = 0;
        setIsSongPlaying(false);
    };

    const nextSong = () => {
        if (!suffleMode) {
            let currentIndex = songs.indexOf(currentSong);
            currentIndex < songs.length -1 ? setCurrentSong(songs[currentIndex + 1]) : setCurrentSong(songs[0]);
        }
        else {
            let otherSongs = songs.filter(x => x !== currentSong);
            setCurrentSong(pickRandomFromArray(otherSongs));
        }; 
    };

    const prevSong = () => {
        if (!suffleMode) {
            let currentIndex = songs.indexOf(currentSong);
            currentIndex === 0 ? setCurrentSong(songs[songs.length - 1]) : setCurrentSong(songs[currentIndex - 1]);
        }
        else {
            let otherSongs = songs.filter(x => x !== currentSong);
            setCurrentSong(pickRandomFromArray(otherSongs));
        }; 
    }

    const volumeUp = () => {
        if (audio.volume + 0.1 <= 1) {
            audio.volume += 0.1
        }
        else {
            audio.volume = 1;
        }
        console.log(audio.volume);
    }
    const volumeDown = () => {
        if (audio.volume - 0.1 >= 0) {
            audio.volume -= 0.1;
        }
        else {
            audio.volume = 0;
        }
        
        console.log(audio.volume);
    }

    const repeatModeHandler = () => {
        if (repeatMode) {
            setRepeatMode(false);
        }
        else {
            setRepeatMode(true);
        }
    }

    const suffleModeHandler = () => {
        if (suffleMode) {
            setShuffleMode(false);
        }
        else {
            setShuffleMode(true);
        }
    }


    return (
        <div className="musicPlayer">
            <img id="logo" src={logo} alt="sloth logo" />
            <ul className="playlist">
                {songListHTML}
            </ul>
            <div className="controls">
                <i className="fas fa-caret-square-left" onClick={() => {prevSong()}}></i>
                {isSongPlaying === true ? <i className="fas fa-pause-circle" onClick={() => { pauseMusic() }}></i> : <i className="fas fa-play" onClick={() => { playMusic() }}></i>}
                <i className="fas fa-caret-square-right" onClick={() => nextSong()}></i>
                <i className="fas fa-volume-down" onClick={() => {volumeDown()}}></i>
                <i className="fas fa-volume-up" onClick={() => {volumeUp()}}></i>
                <i className="fas fa-repeat" style={repeatMode ? {backgroundColor:"rgb(69, 245, 148)"}:{backgroundColor:"transparent"}} onClick={() => {repeatModeHandler()}}></i>
                <i className="fas fa-random" style={suffleMode ? {backgroundColor:"rgb(69, 245, 148)"}:{backgroundColor:"transparent"}} onClick={() => {suffleModeHandler()}}></i>
                <input type="range" id="timer" min={0} max={audio.duration} default = {0} value={inputValue} onChange={(e)=>{audio.currentTime = e.target.value}}></input>
  
            </div>
        </div>
    )
}







export default Playlist;