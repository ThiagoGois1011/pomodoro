import { useReducer } from "react";


let InicialState = {timer: "25:00" , minuto: 25, segundo: 0};
let DescancoTimer = {timer: "05:00" , minuto: 5, segundo: 0};
let working = true;


function reducer(state, action){
    switch(action.type){
        case "decremento" :{
            const minuto = state.minuto;
            const segundo = state.segundo;
            
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
            return InicialState;
        }
        case "editar":{
            
            const objeto = {
                timer: (action.campos[0] ).toString().padStart(2, 0) + ":" + (action.campos[1]).toString().padStart(2, 0) ,
                minuto: action.campos[0],
                segundo: action.campos[1]
            };
            InicialState = objeto;
            return objeto;
        }
        case "descanco":{
            working = false;
            return DescancoTimer;
        }
    }

}



export default function useTimer(){
    const [state, dispatch] = useReducer(reducer, InicialState);

    return [state, dispatch, {working, InicialState, DescancoTimer}];
} 
