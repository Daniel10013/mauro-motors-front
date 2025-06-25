import style from "./loader.module.css";

export default function Loader() {
    return (
        <div style={
            {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100vw",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 9999,
                background: "white",
                overflow: "hidden"
            }}>
            <div className={style.spinner}></div>
            <h1>Carregando...</h1>
        </div>
    )
}