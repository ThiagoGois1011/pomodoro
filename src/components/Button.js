import style from "./Button.module.css"

function Button({onClick, children, styleC, onMouseOver, onMouseOut}){
    return (<button onMouseOver={onMouseOver} onMouseOut={onMouseOut} style={styleC} className={style.Button} onClick={onClick}>{children}</button>); 
}

export default Button;