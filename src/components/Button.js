import style from "./Button.module.css"

function Button({onClick, children, styleC}){
    return (<button style={styleC} className={style.button} onClick={onClick}>{children}</button>);
    
}

export default Button;