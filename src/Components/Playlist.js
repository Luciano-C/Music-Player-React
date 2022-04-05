import React, { useState, useEffect } from "react";
import songs from "../Resources/songs";
import logo from "../logo.JPG"
import pickRandomFromArray from "../Resources/randomFromArray";



const Playlist = () => {
    const [currentSong, setCurrentSong] = useState({});
    const [audio] = useState(new Audio("https://assets.breatheco.de/apis/sound/files/mario/songs/castle.mp3"));
    const [isSongPlaying, setIsSongPlaying] = useState(false);
    const [repeatMode, setRepeatMode] = useState(false);
    const [suffleMode, setShuffleMode] = useState(false);
    const [inputValue, setInputValue] = useState(0)
    

    // Utiliza el evento onended para repetir la canción o detenerla dependiendo del modo.
    audio.onended = () => {
        if (!repeatMode) {
            stopMusic();
        }
        else {
            playMusic();
        }    
    };
    // Actualiza el valor del input range para que se mueva el ícono de acuerdo al tiempo de la canción.
    audio.ontimeupdate = () => {
        setInputValue(audio.currentTime);
    }

    // Crea html con lista de canciones para renderizar.
    let songListHTML = songs.map((x, i) => <li key={i} onClick={() => { setCurrentSong(songs[i]) }}><span className="songNumber">{i < 9 ? `0${i + 1}` : `${i + 1}`}</span><span className="songName">{x.name}</span></li>);

    // useEffect: Detiene canción actual, cambia la fuente del audio y reproduce la canción cuando hay un cambio en la canción seleccionada.
    useEffect(() => {
        pauseMusic();
        audio.src = currentSong.url;
        playMusic();
    }, [currentSong]);

    // Para cambiar el botón a play en la primera renderización.
    useEffect(() => {
        setIsSongPlaying(false)
    }, []);


    // Reproduce canción y actualiza el estado de isSongPlaying.
    const playMusic = () => {
        audio.play();
        setIsSongPlaying(true);
    };
    
    // Pausa canción y actualiza el estado de isSongPlaying.
    const pauseMusic = () => {
        audio.pause();
        setIsSongPlaying(false);
    };
    
    // Detiene canción y actualiza el estado de isSongPlaying. La detención es una combinación de pausa + .currentTime = 0.
    const stopMusic = () => {
        audio.pause();
        audio.currentTime = 0;
        setIsSongPlaying(false);
    };

    // Funcionalidad  de canción siguiente. Si el modo aleatorio esta desactivado toca la siguiente en la lista, si es la última reproduce la primera.
    // Si el modo aleatorio está activado, elige una canción al azar. Función para elegir importada de la carpeta Resources.
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
    // Funcionalidad  de canción anterior.
    const prevSong = () => {
        if (!suffleMode) {
            let currentIndex = songs.indexOf(currentSong);
            currentIndex === 0 ? setCurrentSong(songs[songs.length - 1]) : setCurrentSong(songs[currentIndex - 1]);
        }
        else {
            let otherSongs = songs.filter(x => x !== currentSong);
            setCurrentSong(pickRandomFromArray(otherSongs));
        }; 
    };
    // Funcionalidad para subir volumen.
    const volumeUp = () => {
        if (audio.volume + 0.1 <= 1) {
            audio.volume += 0.1
        }
        else {
            audio.volume = 1;
        };
    };

    // Funcionalidad para bajar volumen.
    const volumeDown = () => {
        if (audio.volume - 0.1 >= 0) {
            audio.volume -= 0.1;
        }
        else {
            audio.volume = 0;
        };
    };
    // Funcionalidad del botón para modo repetición.
    const repeatModeHandler = () => {
        if (repeatMode) {
            setRepeatMode(false);
        }
        else {
            setRepeatMode(true);
        }
    }
    // Funcionalidad del botón para modo aleatorio.
    const suffleModeHandler = () => {
        if (suffleMode) {
            setShuffleMode(false);
        }
        else {
            setShuffleMode(true);
        }
    }


    // Renderizado. input range tiene su valor asociado a la variable de estado inputValue, lo que permite en conjunto con el evento ontimeupdate de 
    // la línea 27 que se mueva el ícono con el tiempo. La propiedad onChange cambia el currentTime de acuerdo al valor de input, lo que permite adelantar o retroceder la canción.
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