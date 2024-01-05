import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';

const AudioPlayer = ({ src, getControls }) => {
  const [sound, setSound] = useState(null);

  useEffect(() => {
    // Carregando o arquivo de áudio
    const sound = new Howl({
      src: [src],
    });
    sound.loop(true);
    
    setSound(sound);
    
    play = () => {
      if (sound) {
        sound.play();
      }
    };
  
    pause = () => {
      if (sound) {
        sound.pause();
      }
    };
    getControls(play, pause);

    return () => {
      sound.unload();
    };
  }, [src]);

  let play = null;
  let pause = null;
};

export default AudioPlayer;
