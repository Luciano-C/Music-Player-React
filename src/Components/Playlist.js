import React, { useState, useEffect } from "react";
import songs from "../Resources/songs";
import logo from "../logo.JPG"

/* [{ "id": 1, "category": "game", "name": "Mario Castle", "url": "https://assets.breatheco.de/apis/sound/files/mario/songs/castle.mp3" }] */

const Playlist = () => {
    const [currentSong, setCurrentSong] = useState({});
    const [audio] = useState(new Audio("https://assets.breatheco.de/apis/sound/files/mario/songs/castle.mp3"));
    const [isSongPlaying, setIsSongPlaying] = useState(false);
    const [repeateMode, setRepeatMode] = useState(false);

    audio.onended = () => {
        if (!repeateMode) {
            stopMusic();
        }
        else {
            playMusic();
        }
        
    };



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
        let currentIndex = songs.indexOf(currentSong);
        currentIndex < songs.length -1 ? setCurrentSong(songs[currentIndex + 1]) : setCurrentSong(songs[0]);
    };

    const prevSong = () => {
        let currentIndex = songs.indexOf(currentSong);
        currentIndex === 0 ? setCurrentSong(songs[songs.length - 1]) : setCurrentSong(songs[currentIndex - 1]);
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
        if (repeateMode) {
            setRepeatMode(false);
        }
        else {
            setRepeatMode(true);
            console.log(repeateMode);
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
                <i className="fas fa-repeat" style={repeateMode ? {backgroundColor:"rgb(69, 245, 148)"}:{backgroundColor:"transparent"}} onClick={() => {repeatModeHandler()}}></i>
                {/* <i className="fas fa-align-justify"></i> */}
            </div>
        </div>
    )
}







export default Playlist;