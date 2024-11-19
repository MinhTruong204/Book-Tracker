import style from './Header.module.css';

function Header(props) {
    return (
        <div className={props.class}>
            <i className={`fa-solid fa-book ${style.logo}`}></i>
            <h1 className={style.heading}>Book Tracker</h1>
        </div>
    );
}

export default Header;
