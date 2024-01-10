
import { useEffect, useRef, useState } from "react";
import useTimer from "./hooks/useTimerHook"
import "./App.css"
import Button from "./components/Button.js"
import { FaGear } from "react-icons/fa6";
import toque from "./assets/audio/despertador.mp3";
import Dialog from "./components/Dialog.js";
import {GetData, criaDB} from "./components/IndexedDB";

function App() {

  function DescancoAnimation(event){
    event.target.style.backgroundColor = "#214130";
  }

  function DescancoAnimationReverse(event){
    event.target.style.backgroundColor = "#E2E8CE";
  }

  function SliderFoco(){
    if(!stateTimer.booleanFoco){                        
      booleanRef.current = false;
      const button = document.querySelector(".slider_div button:nth-child(1)")
      const button2 = document.querySelector(".slider_div button:nth-child(2)")
      const element = document.querySelector(".tampa");

      element.classList.remove("tampa_with_animation");
      element.classList.add("tampa_with_animation_reverse");

      const audio = document.getElementById("tagAudio");
      audio.pause();
      audio.currentTime = 0;

      button.classList.remove("button_color_white");
      button.classList.add("button_color_black");
      button2.classList.add("button_color_white");
      button2.classList.remove("button_color_black");
      
      setTimeout(() =>{
        dispatch({ type: "foco" });
        clearInterval(ref.current);   
        setPisca(true);
      }, 300);
    }               
  }
  function SliderDescanso(){
    if(stateTimer.booleanFoco){     
      booleanRef.current = false;
      const element = document.querySelector(".tampa");
      const button1 = document.querySelector(".slider_div button:nth-child(1)")
      const button = document.querySelector(".slider_div button:nth-child(2)")

      element.classList.remove("tampa_with_animation_reverse");
      element.classList.add("tampa_with_animation");

      button.classList.remove("button_color_white");
      button.classList.add("button_color_black");
      button1.classList.remove("button_color_black");
      button1.classList.add("button_color_white");
      const audio = document.getElementById("tagAudio");
      audio.pause();
      audio.currentTime = 0;
      setTimeout(() =>{
        dispatch({ type: "descanco" });
        clearInterval(ref.current);     
        setPisca(true);
      }, 300);
    }   
  }
  

  const [values, dispatch, stateTimer] = useTimer();
  const ref = useRef();
  const booleanRef = useRef(false);
  const [pisca , setPisca] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const estadoBotaoDescanco = stateTimer.bDescanco?{display: "inline"}:{display: "none"};
  const segundosAtuais = values.minuto * 60 + values.segundo;
  
  let segundosIniciais = null;

  const [sound, setSound] = useState(toque);

  useEffect(()=>{
    criaDB();
    GetData(1)
    .then((valorRecuperado) => {
      setSound(valorRecuperado.conteudo);
    }).catch((e) => console.log())

    GetData(2)
    .then((valorRecuperado) => {
      const novoInicialState = valorRecuperado.conteudo;
      GetData(3)
      .then((valorRecuperado1) => {     
        const novoDescansoTimer = valorRecuperado1.conteudo;
        
        dispatch({type:"editar", novoInicialState,
        novoDescansoTimer});
    })
    
    .catch((e) => console.log())
    }).catch((e) => console.log())

  }, []);

  if(stateTimer.working && !stateTimer.descansoIniciado){
    segundosIniciais = stateTimer.InicialState.minuto * 60 + stateTimer.InicialState.segundo;
  }else if(stateTimer.working && stateTimer.descansoIniciado){
    segundosIniciais = stateTimer.DescancoTimer.minuto * 60 + stateTimer.DescancoTimer.segundo;
  }
  else{
    segundosIniciais = 0;
  }
  const porcentagem1 = segundosIniciais?(segundosAtuais / segundosIniciais) * 100:0;

  if(values.minuto === 0 && values.segundo === 0){
    clearInterval(ref.current);
    const audio = document.getElementById("tagAudio");
    audio.play();
    ref.current = setInterval(()=>{
      dispatch({ type: "aumentar" });
    }, 1000);
    
  }
  
  
  return (
    <section className="section_timer">

        <div className="slider_div" style={{marginBottom: "20px"}}>
            <button className="button_color_black" onClick={()=>{
              SliderFoco();  
            }}>Foco</button>
            <button className="button_color_white"  onClick={()=>{
              SliderDescanso();
            }}>Descanço</button>
            <div className="tampa"></div>
        </div>
        
        <div className="timer_circle" style={{backgroundImage: `conic-gradient(#E2E8CE ${porcentagem1? porcentagem1: 0}% , #243125 0%)`}}>
          <div className="timer_inner_circle">
            <p className="timer_inner_value" style={{opacity : pisca?"1":"0"}}>{values.timer}</p>
            <Button styleC={{...estadoBotaoDescanco, backgroundColor: "#E2E8CE"}} onMouseOver={DescancoAnimation}  
            onMouseOut={DescancoAnimationReverse} onClick={()=>SliderDescanso()}>Descanço</Button>
          </div>
        </div>
        <div className="container_buttons">
          <Button onClick={()=>{
            if(!booleanRef.current){
              clearInterval(ref.current);
              setPisca(true);
              booleanRef.current = !booleanRef.current;
              ref.current = setInterval(() => {               
              dispatch({ type: "decremento" });                      
               }, 10);
            }
          }}>Iniciar</Button>

          <Button onClick={()=>{
            clearInterval(ref.current);
            if(!stateTimer.working){
              dispatch({ type: "resetar" });
              const audio = document.getElementById("tagAudio");
              audio.pause();
              audio.currentTime = 0;
            }else{
              ref.current = setInterval(() => {
                setPisca(pisca => !pisca);
               }, 700);
            }
            booleanRef.current = false;          
          }}>Parar</Button>

          <Button onClick={()=>{
             clearInterval(ref.current);
             booleanRef.current = false;
             const audio = document.getElementById("tagAudio");
             audio.pause();
             audio.currentTime = 0;
             dispatch({ type: "resetar" });
             setPisca(true);
          }}>Resetar</Button>

          <FaGear onClick={()=> setOpenDialog(!openDialog)} className="configuration"/>
        </div>
        
        <audio id="tagAudio" loop src={sound}>
        </audio>
        
        <Dialog BooleanRef={booleanRef} IntervalRef={ref} setSound={setSound} openDialog={openDialog}  setPisca={setPisca} SliderFoco={SliderFoco} setOpenDialog={setOpenDialog} dispatch={dispatch} stateTimer={stateTimer}
         customStyle={openDialog?{display: "flex"}:{display: "none"}}/>
        
    </section>
  );
}

export default App;
