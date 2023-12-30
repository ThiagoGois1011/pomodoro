import { useRef, useState } from "react";
import useTimer from "./hooks/useTimerHook"
import "./App.css"
import Button from "./components/Button.js"


function App() {

  const [values, dispatch, stateTimer] = useTimer();
  const ref = useRef();
  const booleanRef = useRef(false);
  const [pisca , setPisca] = useState(true);
 
  const segundosAtuais = values.minuto * 60 + values.segundo;
  let segundosIniciais = null;

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
    console.log("entrando if")
    ref.current = setInterval(()=>{
      dispatch({ type: "aumentar" });
    }, 1000);
    
  }
  
  
  return (
    <section className="section_timer">

      <div className="timer_container">
        <div className="timer_circle" style={{backgroundImage: `conic-gradient(#a52222 ${porcentagem1? porcentagem1: 0}% , #22a543 0%)`}}>
          <div className="timer_inner_circle">
            <p className="timer_inner_value" style={{opacity : pisca?"1":"0"}}>{values.timer}</p>

            <Button styleC={stateTimer.bDescanco?{display: "inline"}:{display: "none"}} onClick={()=>{
            clearInterval(ref.current);
            dispatch({ type: "descanco" });  
            booleanRef.current = false; 
          }}>Descanço</Button>
          </div>
        </div>
        <div className="container_buttons">
          <Button onClick={()=>{
            clearInterval(ref.current);
            setPisca(true);
            if(!booleanRef.current){
              booleanRef.current = !booleanRef.current;
              ref.current = setInterval(() => {
                dispatch({ type: "decremento" });       
               }, 10);
            }
          }}>Iniciar</Button>

          <Button onClick={()=>{
            clearInterval(ref.current);
            booleanRef.current = false;
            ref.current = setInterval(() => {
              setPisca(pisca => !pisca);
             }, 700);
          }}>Parar</Button>

          <Button onClick={()=>{
             clearInterval(ref.current);
             booleanRef.current = false;
             dispatch({ type: "resetar" });
             setPisca(true);
          }}>Resetar</Button>
        </div>

      </div>       
    </section>
  );
}

export default App;
