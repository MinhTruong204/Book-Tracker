import CloseButton from 'react-bootstrap/CloseButton';
import style from './OptionBox.module.css';
import { useState } from 'react';
function StatusOptionBox(props) {
    return (
        <div className={style.statusOptionBox}>
            <span className={style.statusDescribe}>In Progress</span>
            <StatusOption setStatusOption={props.setStatusOption} type="Reading"></StatusOption>
            <hr />
            <span className={style.statusDescribe}>To-do</span>
            <StatusOption setStatusOption={props.setStatusOption} type="To Read"></StatusOption>
            <hr />
            <span className={style.statusDescribe}>Complete</span>
            <StatusOption setStatusOption={props.setStatusOption} type="Read"></StatusOption>
        </div>
    );
}

function GenresOptionBox(props) {
    let genresElements = [];
    props.listGenres.forEach((element) => {
        genresElements.push(
            <div
                style={{ height: '3rem' }}
                className={`d-flex ps-3 align-items-center justify-content-start ${style.genresOptionBox__item}`}
                onClick={() =>
                    props.setGenresOption({
                        icon: element.genres.icon,
                        name: element.genres.name,
                    })
                }
            >
                <i className={element.genres.icon}></i>
                <p className="mb-0"> {element.genres.name}</p>
            </div>,
        );
    });

    return props.listGenres && <div className={style.genresOptionBox}>{genresElements}</div>;
}

function RatingOptionBox(props) {}

function StatusOption(props) {
    function setStatus() {
        try {
            props.setStatusOption(props.type);
        } catch (error) {}
    }
    switch (props.type) {
        case 'Reading':
            return (
                <div onClick={setStatus}>
                    <div className={style.statusOption}>
                        <span className={`${style.statusDot} ${style.readingDot} `}></span>
                        <span>Reading</span>
                    </div>
                </div>
            );
            break;
        case 'To Read':
            return (
                <div onClick={setStatus}>
                    <div className={style.statusOption}>
                        <span className={`${style.statusDot} ${style.toReadDot}`}></span>
                        <span>To Read</span>
                    </div>
                </div>
            );
            break;
        case 'Read':
            return (
                <div onClick={setStatus}>
                    <div className={style.statusOption}>
                        <span className={`${style.statusDot} ${style.readDot}`}></span>
                        <span>Read</span>
                    </div>
                </div>
            );
            break;

        default:
            break;
    }
}

function TextOption(props) {
    const [value, setValue] = useState(props.text);
    return (
        <div className="w-100">
            {props.active ? (
                <input
                    className={`w-100 ${style.input} p-2`}
                    defaultValue={value}
                    autoFocus
                    onBlur={() => props.unActiveInput(null)}
                    onChange={(element) => setValue(element.target.value)}
                    onKeyDownCapture={element => element.key === "Enter" && props.unActiveInput(null)}
                ></input>
            ) : (
                <p className="mb-0">{value || 'What is ' + props.type + ' ?'}</p>
            )}
        </div>
    );
}

function RatingOption(props) {
    let rateBlock = [];
    const [ratingNumber, setRatingNumber] = useState(props.data);
    for (let i = 0; i < 5; i++) {
        if (i <= ratingNumber)
            rateBlock.push(<i key={i} className={`fa-solid fa-star `} onClick={() => setRatingNumber(i)}></i>);
        else rateBlock.push(<i key={i} className={`fa-regular fa-star `} onClick={() => setRatingNumber(i)}></i>);
    }
    return <div className={style.ratingOption}>{rateBlock}</div>;
}
export { StatusOptionBox, StatusOption, TextOption, RatingOption, GenresOptionBox };
