import { useRef, useState } from "react";
import useTimer from "./hooks/useTimerHook"
import "./App.css"
import Button from "./components/Button.js"


function App() {

  const [values, dispatch, stateTimer] = useTimer();
  const ref = useRef();

  const segundosAtuais = values.minuto * 60 + values.segundo;
  let segundosIniciais = null;
  let primeira = true

  if(stateTimer.working){
    segundosIniciais = stateTimer.InicialState.minuto * 60 + stateTimer.InicialState.segundo;
  }else if(primeira){
    primeira = false;
    segundosIniciais = 0;
  }else{
    segundosIniciais = stateTimer.DescancoTimer.minuto * 60 + stateTimer.DescancoTimer.segundo;
  }
  const porcentagem1 = (segundosAtuais / segundosIniciais) * 100;

  if(values.minuto == 0 && values.segundo == 0){
    clearInterval(ref.current);
    dispatch({ type: "descanco" });     
  }
  
  return (
    <section className="section_timer">

      <div className="timer_container">
        <div className="timer_circle" style={{backgroundImage: `conic-gradient(#a52222 ${segundosAtuais? porcentagem1: 0}% , #22a543 0%)`}}>
          <div className="timer_inner_circle">
            <p className="timer_inner_value">{values.timer}</p>
          </div>
        </div>
        <div className="container_buttons">
          <Button onClick={()=>{
            ref.current = setInterval(() => {
              dispatch({ type: "decremento" });       
             }, 10);
          }}>Iniciar</Button>

          <Button onClick={()=>{
            clearInterval(ref.current);
          }}>Pausar</Button>

          <Button onClick={()=>{
             clearInterval(ref.current);
             dispatch({ type: "resetar" });
          }}>Resetar</Button>
        </div>

      </div>       
    </section>
  );
}

export default App;
