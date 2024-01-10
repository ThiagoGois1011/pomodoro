import { useEffect } from "react";
import style from "./Dialog.module.css";
import { FiCheck } from "react-icons/fi";
import { MdDoNotDisturb } from "react-icons/md";
import { SetData, removerObjeto} from "./IndexedDB";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import toque from "../assets/audio/despertador.mp3";


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

    function metodoControle(salvar){
        if(salvar){
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
        }else{
            SetData({timer:timerFoco, minuto: valueFocoMinuto, segundo: valueFocoSegundo}, 2);
        }

        if(valueDescansoMinuto === 0 && valueDescansoSegundo === 0){
            valueDescansoMinuto  = stateTimer.DescancoTimer.minuto;
            valueDescansoSegundo = stateTimer.DescancoTimer.segundo;

            timerDescanso = stateTimer.DescancoTimer.timer;
        }else{
            SetData({timer:timerDescanso, minuto: valueDescansoMinuto, segundo: valueDescansoSegundo }, 3);  
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
            const audio = document.getElementById("tagAudio");
            audio.pause();
            audio.currentTime = 0;
        }  
        
        const musica = document.getElementById("musicaInput");
        
        
        const reader = new FileReader();
        
        reader.onload = function (e) {
            setSound(e.target.result);
            const str = e.target.result;
            SetData(str, 1);          
        };
        if(musica.files[0]){
            reader.readAsDataURL(musica.files[0]);
        }
        }else{
            removerObjeto(1);
            removerObjeto(2);
            removerObjeto(3);

            if(!stateTimer.booleanFoco){  
                setTimeout(()=> dispatch({type:"resetarPadrao"}), 300);             
            }else{
                dispatch({type:"resetarPadrao"});
                setPisca(true);
                clearInterval(IntervalRef.current);
                BooleanRef.current = false;
                const audio = document.getElementById("tagAudio");
                audio.pause();
                audio.currentTime = 0;
            } 
            setSound(toque); 
        }
        
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
        <button onClick={()=>{metodoControle(false)}} className={style.resetar}><HiAdjustmentsHorizontal/>Resetar</button>
        <button className={style.cancelar} onClick={()=>setOpenDialog(false)}> <MdDoNotDisturb/>  Cancelar</button>
        <button className={style.salvar} onClick={()=>{metodoControle(true)}}> <FiCheck/> Salvar</button>
      </div>

    </div>
  </div>
  );
}