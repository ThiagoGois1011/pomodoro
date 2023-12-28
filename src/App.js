import { useRef } from "react";
import useTimer from "./hooks/useTimerHook"
import "./App.css"
import Button from "./components/Button.js"


function App() {

  const [state, dispatch] = useTimer();
  const ref = useRef();

  if(state.minuto == 0 && state.segundo == 0){
    clearInterval(ref.current);
    console.log("chamando intervalo" + ref.current);
  }
  
  return (
    <section className="section_timer">

      <div className="timer_container">
        <div className="timer_circle">
          <div className="timer_inner_circle">
            <p className="timer_inner_value">{state.timer}</p>
          </div>
        </div>
        <div className="container_buttons">
          <Button onClick={()=>{
            console.log("clicked")
          }}>edit</Button>
        </div>

      </div>

       


       <div className="none">
       <button onClick={() =>{
         ref.current = setInterval(() => {
          dispatch({ type: "decremento" });       
         }, 1000);
       }}> Iniciar</button>


       <button onClick={() =>{
        clearInterval(ref.current);
       }}>pausar</button>

       <button onClick={()=>{
        clearInterval(ref.current);
        dispatch({ type: "resetar" });
       }}>reset</button>


       <button onClick={()=>{
        const campoM = document.getElementById("minuto");
        const campoS = document.getElementById("segundo");
          dispatch({ type: "editar",
            campos: [campoM.value, campoS.value] });
       }}>edit</button>


       <label>minuto</label>
       <input type="number" id="minuto"/>
       <label>segundo</label>
       <input type="number" id="segundo"/>
       </div>
    </section>
  );
}

export default App;
