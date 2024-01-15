import { useReducer } from "react";


let InicialState = {timer: "25:00" , minuto: 25, segundo: 0};
let DescansoTimer = {timer: "05:00" , minuto: 5, segundo: 0};
let working = true;
let bDescanso = false;
let descansoIniciado = false;
let booleanFoco = true;


function reducer(state, action){
    switch(action.type){
        case "decremento" :{
            const minuto = state.minuto;
            const segundo = state.segundo;
            bDescanso = false;
            working = true;
            if(segundo != 0){
                return {
                    timer: minuto.toString().padStart(2, 0) + ":" + (segundo - 1).toString().padStart(2, 0),
                    minuto: minuto,
                    segundo: segundo - 1
                }
            }else if(minuto != 0){
                return {
                    timer: (minuto - 1).toString().padStart(2, 0) + ":" + 59 ,
                    minuto: minuto - 1,
                    segundo: 59
                } 
            }else{
                return {
                    timer: "00:00" ,
                    minuto: 0,
                    segundo: 0
                } 
            }
               
        }
        case "resetar":{
            working = true;
            bDescanso = false;
            if(descansoIniciado){
                return DescansoTimer;
                
            }else{
                return InicialState;
            }
            
        }case "descanso":{
            working = true;
            descansoIniciado = true;
            bDescanso = false;
            booleanFoco = false;
            return DescansoTimer;
        }case "foco":{
            working = true;
            descansoIniciado = false;
            bDescanso = false;
            booleanFoco = true;
            return InicialState;
        }
        case "aumentar":{
            const minuto = state.minuto;
            const segundo = state.segundo;
            working = false;
            if(!descansoIniciado){
                bDescanso = true;
            }
            
            if(segundo != 60){
                return {
                    timer: "- " + minuto.toString().padStart(2, 0) + ":" + (segundo + 1).toString().padStart(2, 0),
                    minuto: minuto,
                    segundo: segundo + 1
                }
            }else{
                return {
                    timer: "- " + (minuto + 1).toString().padStart(2, 0) + ":" + "00" ,
                    minuto: minuto + 1,
                    segundo: 0
                } 
            }       
        }case "editar":{
            working = true;
            descansoIniciado = false;
            bDescanso = false;
            booleanFoco = true;

            InicialState = action.novoInicialState;
            DescansoTimer = action.novoDescansoTimer;
            
            return InicialState;
        }case "resetarPadrao":{
            working = true;
            descansoIniciado = false;
            bDescanso = false;
            booleanFoco = true;

            InicialState =  {timer: "25:00" , minuto: 25, segundo: 0};
            DescansoTimer = {timer: "05:00" , minuto: 5, segundo: 0};
            
            return InicialState;
        }
        default:{
            return{
                timer: "00:00",
                minuto: 0,
                segundo: 0
            }
        }
    }

}



export default function useTimer(){
    const [state, dispatch] = useReducer(reducer, InicialState);

    return [state, dispatch, {working, InicialState, DescansoTimer: DescansoTimer, bDescanso: bDescanso, descansoIniciado, booleanFoco}];
} 
