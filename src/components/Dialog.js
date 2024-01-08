import { useEffect } from "react";
import style from "./Dialog.module.css";
import { FiCheck } from "react-icons/fi";
import { MdDoNotDisturb } from "react-icons/md";


export default function Dialog({stateTimer, dispatch, customStyle, setOpenDialog, SliderFoco, setPisca,
     openDialog, setSound, IntervalRef, BooleanRef}){
    useEffect(()=>{
        const focoMinutos = document.querySelector(".foco_minutos");
        const focoSegundos = document.querySelector(".foco_segundos");

        const descansoMinutos = document.querySelector(".descanso_minutos");
        const descansoSegundos = document.querySelector(".descanso_segundos");

        focoMinutos.value = stateTimer.InicialState.minuto;
        focoSegundos.value = stateTimer.InicialState.segundo;

        descansoMinutos.value = stateTimer.DescancoTimer.minuto;
        descansoSegundos.value = stateTimer.DescancoTimer.segundo;
    }, [openDialog]);

    function metodoSalvar(){
        const focoMinutos = document.querySelector(".foco_minutos");
        const focoSegundos = document.querySelector(".foco_segundos");

        const descansoMinutos = document.querySelector(".descanso_minutos");
        const descansoSegundos = document.querySelector(".descanso_segundos");

        let valueFocoMinuto = Math.round(focoMinutos.value);
        let valueFocoSegundo = Math.round(focoSegundos.value);

        let valueDescansoMinuto = Math.round(descansoMinutos.value);
        let valueDescansoSegundo = Math.round(descansoSegundos.value);

        let timerFoco = valueFocoMinuto.toString().padStart(2, 0) + ":" + valueFocoSegundo.toString().padStart(2, 0);
        let timerDescanso = valueDescansoMinuto.toString().padStart(2, 0) + ":" + valueDescansoSegundo.toString().padStart(2, 0);
        
        if(valueFocoMinuto === 0 && valueFocoSegundo === 0){
            valueFocoMinuto  = stateTimer.InicialState.minuto;
            valueFocoSegundo = stateTimer.InicialState.segundo;
            
            timerFoco =  stateTimer.InicialState.timer;
        }

        if(valueDescansoMinuto === 0 && valueDescansoSegundo === 0){
            valueDescansoMinuto  = stateTimer.DescancoTimer.minuto;
            valueDescansoSegundo = stateTimer.DescancoTimer.segundo;

            timerDescanso = stateTimer.DescancoTimer.timer;
        }

        if(!stateTimer.booleanFoco){  
            setTimeout(()=> dispatch({type:"editar", novoInicialState:{timer:timerFoco, minuto: valueFocoMinuto, segundo: valueFocoSegundo},
            novoDescansoTimer:{timer:timerDescanso, minuto: valueDescansoMinuto, segundo: valueDescansoSegundo }}), 300);             
        }else{
            dispatch({type:"editar", novoInicialState:{timer:timerFoco, minuto: valueFocoMinuto, segundo: valueFocoSegundo},
            novoDescansoTimer:{timer:timerDescanso, minuto: valueDescansoMinuto, segundo: valueDescansoSegundo }});
            setPisca(true);
            clearInterval(IntervalRef.current);
            BooleanRef.current = false;
        }  
        
        const musica = document.getElementById("musicaInput");
        setSound(URL.createObjectURL(musica.files[0]));
        console.log(JSON.stringify(musica.files[0]));
        console.log(musica.files[0]);
        localStorage.setItem("musica", "tetse");

        setOpenDialog(false);
        SliderFoco();
    }
    return (
    <div className={style.dialog} style={customStyle}>
    <div className={style.dialogBackground}/>
    <div className={style.dialogContent}>
      <h1>Configurações</h1>
      <div className={style.barraHorizontal}/>
      <div className={style.dialogContentInputsDivs}>
        <div className={style.inputField}>
            <label>Tempo de Foco</label>
            <div>
                <input className="foco_minutos" type="number" placeholder="Minutos"/>
                <input className="foco_segundos" type="number" placeholder="Segundos"/>
            </div>
        </div>
        <div className={style.inputField}>
            <label>Tempo de Descanso</label>
            <div>
                <input className="descanso_minutos" type="number" placeholder="Minutos"/>
                <input className="descanso_segundos" type="number" placeholder="Segundos"/>
            </div>
        </div>
      </div>
      <h2 className={style.musicaTitle}>Mudar Música</h2>
      <input className={style.musicaInput} id="musicaInput" type="file" />
      <div className={style.barraHorizontal}/>
      <div className={style.dialogContentButtons}>
        <button className={style.cancelar} onClick={()=>setOpenDialog(false)}> <MdDoNotDisturb/>  Cancelar</button>
        <button className={style.salvar} onClick={metodoSalvar}> <FiCheck/> Salvar</button>
      </div>

    </div>
  </div>
  );
}