import style from './WallPapper.module.css';

function WallPapper(props) {
    return <img className={style.img} src={props.src}></img>;
}

export default WallPapper;
