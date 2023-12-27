import { useRef } from "react";
import useTimer from "./useTimerHook"


function App() {

  const [state, dispatch] = useTimer();
  const ref = useRef();

  if(state.minuto == 0 && state.segundo == 0){
    clearInterval(ref.current);
    console.log("chamando intervalo" + ref.current);
  }
  
  return (
    <div style={{padding: "40px"}}>
       <p>{state.timer}</p>
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
  );
}

export default App;
