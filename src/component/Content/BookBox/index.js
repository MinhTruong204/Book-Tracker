import { useState, useContext, useEffect, useMemo, useRef } from 'react';

import Container from 'react-bootstrap/Container';
import ProgressBar from 'react-bootstrap/ProgressBar';
import CloseButton from 'react-bootstrap/CloseButton';

import { StatusOptionBox, StatusOption, TextOption, RatingOption, GenresOptionBox } from './OptionBox/OptionBox';
import { ActiveInputContext, ActiveInputProvider } from '../Context/ActiveInputContext';
import style from './BookBox.module.css';

import { DataContext } from '~/component/Content/Context/DataContext';
import { handleData } from '~/component/Content/Context/ApiRequest';
function BookBox(props) {
    const [activeInput, setActiveInput] = useState(null);
    const [data, setData] = useState(props.data);
    const [img, setImg] = useState(data.img);
    const allData = useContext(DataContext)
    const checkRerender = useRef(false);
    function handleAciveInput(name) {
        setActiveInput(name);
    }

    function saveData() {
        const contentElement = document.querySelectorAll('.' + style.detailInfo__describe);
        const nameElement = document.querySelector('.' + style.name).getElementsByTagName('p')[0];
        const statusElement = contentElement.item(0).getElementsByTagName('span')[1];
        const authorElement = contentElement.item(1).getElementsByTagName('p')[0];
        const descriptionElement = contentElement.item(2).getElementsByTagName('p')[0];
        const genresNameElement = contentElement.item(3);
        const genresIconElemt = contentElement.item(3).getElementsByTagName('i')[0];
        const totalPageElement = contentElement.item(4).getElementsByTagName('p')[0];
        const curPageElement = contentElement.item(5).getElementsByTagName('p')[0];
        const ratingElement = contentElement.item(7).getElementsByClassName('fa-solid');
        const imageElement = document.querySelector('.' + style.img).getElementsByTagName('img')[0];
        setData({
            ...data,
            name: nameElement != undefined ? nameElement.innerHTML : '',
            status: statusElement != undefined ? statusElement.innerHTML : '',
            author: authorElement != undefined ? authorElement.innerHTML : '',
            description: descriptionElement != undefined ? descriptionElement.innerHTML : '',
            genres: {
                name: genresNameElement != undefined ? genresNameElement.textContent : '',
                icon: genresIconElemt != undefined ? genresIconElemt.className : '',
            },
            totalPage: totalPageElement != undefined ? totalPageElement.innerHTML : '',
            curPage: curPageElement != undefined ? curPageElement.innerHTML : '',
            progress:
                Math.floor((parseInt(curPageElement.innerHTML) / parseInt(totalPageElement.innerHTML)) * 100) || 0,
            rating: ratingElement != undefined ? ratingElement.length : '',
            img: imageElement != undefined ? imageElement.src : '',
            id: props.type == 'new' ? allData[allData.length - 1].id + 1 : allData[allData.length - 1].id,
        });

    }
    const rerender = useMemo(() => {
        if (checkRerender.current) handleData(data, props.type == 'new' ? 'POST' : 'PUT');
        checkRerender.current = true;
    }, [data]);

    function deleteData() {
        handleData(data, "DELETE")
    }
    try {
        return (
            <div className={style.bookBox}>
                <div className={style.content}>
                    <Container className={style.container}>
                        {/* Infomation */}
                        <div className={style.info}>
                            <div className={`${style.name} `}>
                                {/* <cite>{data.name}</cite>  */}
                                <InfoItem
                                    type="name"
                                    data={data.name}
                                    handleAciveInput={handleAciveInput}
                                    activeInput={activeInput}
                                ></InfoItem>
                            </div>

                            <div className={style.detailInfo}>
                                <ul className={style.detailInfo__list}>
                                    <InfoItem
                                        type="status"
                                        data={data.status}
                                        handleAciveInput={handleAciveInput}
                                        activeInput={activeInput}
                                    ></InfoItem>
                                    <InfoItem
                                        type="author"
                                        data={data.author}
                                        handleAciveInput={handleAciveInput}
                                        activeInput={activeInput}
                                    ></InfoItem>
                                    <InfoItem
                                        type="description"
                                        data={data.description}
                                        handleAciveInput={handleAciveInput}
                                        activeInput={activeInput}
                                    ></InfoItem>
                                    <InfoItem
                                        type="genres"
                                        data={data.genres}
                                        handleAciveInput={handleAciveInput}
                                        activeInput={activeInput}
                                    ></InfoItem>
                                    <InfoItem
                                        type="totalPage"
                                        data={data.totalPage}
                                        handleAciveInput={handleAciveInput}
                                        activeInput={activeInput}
                                    ></InfoItem>
                                    <InfoItem
                                        type="curPage"
                                        data={data.curPage}
                                        handleAciveInput={handleAciveInput}
                                        activeInput={activeInput}
                                    ></InfoItem>
                                    <InfoItem
                                        type="progress"
                                        data={data.progress}
                                        handleAciveInput={handleAciveInput}
                                        activeInput={activeInput}
                                    ></InfoItem>
                                    <InfoItem
                                        type="rating"
                                        data={data.rating}
                                        handleAciveInput={handleAciveInput}
                                        activeInput={activeInput}
                                    ></InfoItem>
                                </ul>
                            </div>
                            <div className='d-flex justify-content-end'>
                                {props.type == "old" && 
                                <button
                                    style={{ height: '3rem' }}
                                    type="button"
                                    className="btn btn-primary m-3"
                                    onClick={() => deleteData()}
                                >
                                    Delete
                                </button>}
                                
                                <button
                                    style={{ height: '3rem' }}
                                    type="button"
                                    className="btn btn-primary m-3"
                                    onClick={() => saveData()}
                                >
                                    Save
                                </button>
                            </div>
                        </div>

                        {/* Image */}
                        <div className={`${style.img} d-flex flex-column align-items-center `}>
                            <img className="flex-grow-1 img" src={img} style={{ maxWidth: '100%' }}></img>
                            <button
                                style={{ transform: 'translateY(-10rem)' }}
                                className="w-25 border-0 btn btn-primary mt-3"
                                onClick={() => {
                                    let url = prompt('Please enter your url image :');
                                    if (url == null || url == '') {
                                        alert('Not valid');
                                    } else {
                                        setImg(url);
                                    }
                                }}
                            >
                                Change
                            </button>
                        </div>

                        {/* Tool Bar */}

                        <CloseButton onClick={() => props.handleClick()} />
                    </Container>
                </div>
            </div>
        );
    } catch (error) {
        console.log(error);
    }
}

function InfoItem(props) {
    switch (props.type) {
        case 'name':
            return (
                <div
                    className="flex-grow-1 h-100 d-flex flex-column justify-content-center"
                    onClick={(e) => props.handleAciveInput(props.type)}
                >
                    <TextOption
                        unActiveInput={props.handleAciveInput}
                        active={props.activeInput == 'name'}
                        text={props.data}
                        type={props.type}
                    ></TextOption>
                </div>
            );
            break;
        case 'status':
            const [statusOption, setStatusOption] = useState(props.data);
            const [statusOpionBox, setStatusOptionBox] = useState(false);
            return (
                <li className={`${style.detailInfo__item}`}>
                    <label className={style.detailInfo__name}>
                        <i className="fa-solid fa-spinner"></i>
                        Status
                    </label>
                    <div
                        className={`${style.detailInfo__describe} ${style.detailInfo__statusDescribe}`}
                        onClick={() => setStatusOptionBox(!statusOpionBox)}
                    >
                        <div>
                            <StatusOption type={statusOption}></StatusOption>
                        </div>
                        {statusOpionBox == true && (
                            <StatusOptionBox setStatusOption={setStatusOption}></StatusOptionBox>
                        )}
                    </div>
                </li>
            );

            break;
        case 'author':
            return (
                <li className={style.detailInfo__item}>
                    <label className={style.detailInfo__name}>
                        <i className="fa-solid fa-pen"></i>
                        Author
                    </label>
                    <div className={style.detailInfo__describe}>
                        <div onClick={() => props.handleAciveInput(props.type)}>
                            <TextOption
                                unActiveInput={props.handleAciveInput}
                                active={props.activeInput == 'author'}
                                text={props.data}
                                type={props.type}
                            ></TextOption>
                        </div>
                    </div>
                </li>
            );

            break;
        case 'description':
            return (
                <li className={style.detailInfo__item}>
                    <span className={style.detailInfo__name}>
                        <i className="fa-solid fa-clipboard"></i>
                        Description
                    </span>
                    <div className={style.detailInfo__describe} onClick={() => props.handleAciveInput(props.type)}>
                        <TextOption
                            unActiveInput={props.handleAciveInput}
                            active={props.activeInput == 'description'}
                            text={props.data}
                            type={props.type}
                        ></TextOption>
                    </div>
                </li>
            );
            break;
        case 'genres':
            const data = useContext(DataContext);
            const [activeGenresOptionBox, setActiveGenresOptionBox] = useState(false);
            const [genresOption, setGenresOption] = useState({
                icon: props.data.icon,
                name: props.data.name,
            });
            const genres = [];
            for (let i = 0; i < data.length; i++) {
                //Add genres
                if (genres.find((e) => e.genres.name == data[i].genres.name) == undefined)
                    genres.push({ genres: data[i].genres, count: 1 });
                else {
                    for (let i = 0; i < genres.length; i++) {
                        if (genres[i].genres.name == data[i].genres.name) genres[i].count++;
                    }
                }
            }
            return (
                <li className={style.detailInfo__item}>
                    <span className={style.detailInfo__name}>
                        <i className="fa-solid fa-icons"></i>
                        Genres
                    </span>
                    <div
                        className={`${style.detailInfo__describe} d-flex`}
                        onClick={() => setActiveGenresOptionBox(!activeGenresOptionBox)}
                    >
                        <div className="d-flex align-items-center justify-content-center">
                            <i className={genresOption.icon}></i>
                            <p className="mb-0">{genresOption.name}</p>
                        </div>

                        {activeGenresOptionBox && (
                            <GenresOptionBox listGenres={genres} setGenresOption={setGenresOption}></GenresOptionBox>
                        )}
                    </div>
                </li>
            );
            break;
        case 'totalPage':
            return (
                <li className={style.detailInfo__item}>
                    <span className={style.detailInfo__name}>
                        <i className="fa-solid fa-hashtag"></i>
                        Total Page
                    </span>
                    <div className={style.detailInfo__describe} onClick={() => props.handleAciveInput(props.type)}>
                        <TextOption
                            unActiveInput={props.handleAciveInput}
                            active={props.activeInput == 'totalPage'}
                            text={props.data}
                            type={props.type}
                        ></TextOption>
                    </div>
                </li>
            );
            break;
        case 'curPage':
            return (
                <li className={style.detailInfo__item}>
                    <span className={style.detailInfo__name}>
                        <i className="fa-solid fa-hashtag"></i>
                        Current Page
                    </span>
                    <div className={style.detailInfo__describe} onClick={() => props.handleAciveInput(props.type)}>
                        <TextOption
                            unActiveInput={props.handleAciveInput}
                            active={props.activeInput == 'curPage'}
                            text={props.data}
                            type={props.type}
                        ></TextOption>
                    </div>
                </li>
            );
            break;
        case 'progress':
            return (
                <li className={style.detailInfo__item}>
                    <span className={style.detailInfo__name}>
                        <i className="fa-solid fa-bars-progress"></i>
                        Progress
                    </span>
                    <div className={style.detailInfo__describe} onClick={() => props.handleAciveInput(props.type)}>
                        <span>{props.data}%</span>
                        <ProgressBar className={style.progressBar} now={props.data} />
                    </div>
                </li>
            );
            break;
        case 'rating':
            return (
                <li className={style.detailInfo__item}>
                    <span className={style.detailInfo__name}>
                        <i className="fa-solid fa-star"></i>
                        Rating
                    </span>
                    <div className={style.detailInfo__describe} onClick={() => props.handleAciveInput(props.type)}>
                        <RatingOption data={props.data}></RatingOption>
                    </div>
                </li>
            );
            break;
        default:
            break;
    }
}

export default BookBox;
