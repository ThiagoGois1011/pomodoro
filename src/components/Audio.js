import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';

const AudioPlayer = ({ src }) => {
  const [sound, setSound] = useState(null);

  useEffect(() => {
    // Carregando o arquivo de áudio
    const sound = new Howl({
      src: [src],
    });

    setSound(sound);

    // Limpando o som ao desmontar o componente
    return () => {
      sound.unload();
    };
  }, [src]);

  const play = () => {
    if (sound) {
      sound.play();
    }
  };

  const pause = () => {
    if (sound) {
      sound.pause();
    }
  };

  return (
    <div>
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
    </div>
  );
};

export default AudioPlayer;
