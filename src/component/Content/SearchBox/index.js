import { GenresOptionBox, StatusOption, StatusOptionBox, RatingOption } from '~/component/Content/BookBox/OptionBox';
import { BlockItem } from '~/component/Content/BlockItem';
import style from './SearchBox.module.css';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../Context/DataContext';

function SearchBox(props) {
    const [statusOption, setStatusOption] = useState(null);
    const [genresOption, setGenresOption] = useState(null);
    const [favoriteOption, setFavoriteOption] = useState(null);
    const [ratingOption, setRatingOption] = useState(null);
    const [yearOption, setYearOption] = useState(null);
    const [monthOption, setMonthOption] = useState(null);
    const [condition,setCondition] = useState(false)
    const allData = useContext(DataContext)
    
    let data = []

    for(let i = 0 ; i < allData.length ; i++) {
        if( (allData[i].status == statusOption      || statusOption == null) &&
            (genresOption == null || allData[i].genres.name == genresOption.name ) &&
            (allData[i].favorite == favoriteOption  || favoriteOption == null) &&
            (allData[i].rating == ratingOption + 1     || ratingOption == null) &&
            (allData[i].startDate.slice(-4) == yearOption || yearOption == null) &&
            (allData[i].endDate.slice(3,5) == monthOption || monthOption == null)
        ) 
        {
            data.push(allData[i]);
        }
    }
    console.log(data)
    return (
        <div>
            <h2 className={style.sectionName}>Filter</h2>
            <div className={`${style.content} d-flex flex-column align-items-center mb-5`}>
                <div className={`${style.searchBar} `}>
                    <input className={style.input} placeholder="Search"></input>
                    <button type="button" className={`${style.button} btn btn-primary ms-2`}>
                        Search
                    </button>
                </div>
                <div className={`${style.filter} d-flex`}>
                    <FilterOption type="status" setStatusOption={setStatusOption} setCondition = {() => setCondition(true)}></FilterOption>
                    <FilterOption type="genres" setGenresOption={setGenresOption} setCondition = {() => setCondition(true)}></FilterOption>
                    <FilterOption type="favorite" setFavoriteOption={setFavoriteOption} setCondition = {() => setCondition(true)}></FilterOption>
                    <FilterOption type="rating" setRatingOption={setRatingOption} setCondition = {() => setCondition(true)}></FilterOption>
                    <FilterOption type="year" setYearOption={setYearOption} setCondition = {() => setCondition(true)}></FilterOption>
                    <FilterOption type="month" setMonthOption={setMonthOption} setCondition = {() => setCondition(true)}></FilterOption>
                </div>
            </div>
            <FilterBar
                status={statusOption}
                genres={genresOption}
                favorite={favoriteOption}
                rating={ratingOption}
                year={yearOption}
                month={monthOption}
            ></FilterBar>
            
            <div style={{zIndex:"0",marginBottom :"20rem"}}>
               {condition && 
                <BlockItem
                    data = {data} 
                    numbercolumn = {4}
                    sectionName = "Books"
                >

                </BlockItem>
                }
            </div>
        </div>
    );
}

function FilterBar(props) {
    return (
        <div className="d-flex align-items-center justify-content-start">
            {props.status && <StatusOption type={props.status}></StatusOption>}
            {props.genres && (
                <div className="d-flex align-items-center justify-content-center ms-5">
                    <i className={props.genres.icon}></i>
                    <p className="mb-0">{props.genres.name}</p>
                </div>
            )}
            {props.favorite && <div className="ms-5">Favorite</div>}
            {props.rating != null && (
                <div className="ms-5">
                    {' '}
                    {props.rating + 1} <i className={`fa-solid fa-star `}></i>{' '}
                </div>
            )}
            {props.year && <div className="ms-5">Year : {props.year}</div>}
            {props.month && <div className="ms-5">Month : {props.month}</div>}
        </div>
    );
}

function FilterOption(props) {
    switch (props.type) {
        case 'status':
            const [statusOptionBox, setStatusOptionBox] = useState(false);
            return (
                <div>
                    <div className={`${style.filterOption}`} onClick={() => setStatusOptionBox(!statusOptionBox)}>
                        Status
                        <i className="fa-solid fa-caret-down ms-1"></i>
                    </div>

                    {statusOptionBox && (
                        <div className={style.statusOptionBox}>
                            <StatusOptionBox
                                setStatusOption={(status) => {
                                    props.setStatusOption(status);
                                    props.setCondition()
                                    setStatusOptionBox(!statusOptionBox);
                                }}
                            ></StatusOptionBox>
                        </div>
                    )}
                </div>
            );
            break;
        case 'genres':
            const [genresOptionBox, setGenresOptionBox] = useState(false);
            const data = useContext(DataContext);
            let genres = [];
            for (let i = 0; i < data.length; i++) {
                //Add genres
                if (genres.find((e) => e.genres.name == data[i].genres.name) == undefined)
                    genres.push({ genres: data[i].genres, count: 1 });
                else {
                    for (let j = 0; j < genres.length; j++) {
                        if (genres[j].genres.name == data[i].genres.name) genres[j].count++;
                    }
                }
            }
            return (
                <div>
                    <div className={`${style.filterOption} ms-5`} onClick={() => setGenresOptionBox(!genresOptionBox)}>
                        Genres
                        <i className="fa-solid fa-caret-down ms-1"></i>
                    </div>
                    {genresOptionBox && (
                        <div className={style.genresOptionBox}>
                            <GenresOptionBox
                                listGenres={genres}
                                setGenresOption={(genres) => {
                                    props.setGenresOption(genres);
                                    props.setCondition()
                                    setGenresOptionBox(!genresOptionBox);
                                }}
                            ></GenresOptionBox>
                        </div>
                    )}
                </div>
            );
            break;

        case 'favorite':
            const [favoriteOptionBox, setFavoriteOptionBox] = useState(false);
            const favoriteOptionElement = [
                <div
                    key={1}
                    onClick={() => {
                        props.setFavoriteOption(true);
                        props.setCondition()
                        setFavoriteOptionBox(!favoriteOptionBox);
                    }}
                >
                    Yes
                </div>,
                <div
                    key={2}
                    onClick={() => {
                        props.setFavoriteOption(false);
                        props.setCondition()
                        setFavoriteOptionBox(!favoriteOptionBox);
                    }}
                >
                    No
                </div>,
            ];
            return (
                <div>
                    <div
                        className={`${style.filterOption} ms-5`}
                        onClick={() => setFavoriteOptionBox(!favoriteOptionBox)}
                    >
                        Favorite
                        <i className="fa-solid fa-caret-down ms-1"></i>
                    </div>
                    {favoriteOptionBox && (
                        <div
                            style={{
                                cursor: 'pointer',
                                backgroundColor: 'white',
                                border: 'black 1px solid',
                                borderRadius: '5px',
                                zIndex :"4",
                                position : "relative",
                                textAlign: "center",
                                marginLeft: "3rem"
                            }}
                        >
                            {favoriteOptionElement}
                        </div>
                    )}
                </div>
            );
            break;

        case 'rating':
            const [ratingOptionBox, setRatingOptionBox] = useState(false);
            return (
                <div>
                    <div className={`${style.filterOption} ms-5`} onClick={() => setRatingOptionBox(!ratingOptionBox)}>
                        Rating
                        <i className="fa-solid fa-caret-down ms-1"></i>
                    </div>
                    {ratingOptionBox && (
                        <div style={{
                            cursor: 'pointer',
                            backgroundColor: 'white',
                            border: 'black 1px solid',
                            borderRadius: '5px',
                            zIndex :"4",
                            position : "relative",
                            textAlign: "center",
                            marginLeft: "3rem"
                        }}>
                            <div
                                onClick={() => {
                                    props.setRatingOption(0);
                                    props.setCondition()
                                    setRatingOptionBox(!ratingOptionBox);
                                }}
                            >
                                1<i className={`fa-solid fa-star `}></i>
                            </div>
                            <div
                                onClick={() => {
                                    props.setRatingOption(1);
                                    props.setCondition()
                                    setRatingOptionBox(!ratingOptionBox);
                                }}
                            >
                                2<i className={`fa-solid fa-star `}></i>
                            </div>
                            <div
                                onClick={() => {
                                    props.setRatingOption(2);
                                    props.setCondition()
                                    setRatingOptionBox(!ratingOptionBox);
                                }}
                            >
                                3<i className={`fa-solid fa-star `}></i>
                            </div>
                            <div
                                onClick={() => {
                                    props.setRatingOption(3);
                                    props.setCondition()
                                    setRatingOptionBox(!ratingOptionBox);
                                }}
                            >
                                4<i className={`fa-solid fa-star `}></i>
                            </div>
                            <div
                                onClick={() => {
                                    props.setRatingOption(4);
                                    props.setCondition()
                                    setRatingOptionBox(!ratingOptionBox);
                                }}
                            >
                                5<i className={`fa-solid fa-star `}></i>
                            </div>
                        </div>
                    )}
                </div>
            );
            break;

        case 'year':
            const [yearOptionBox, setYearOptionBox] = useState(false);
            const yearElement = [
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        props.setYearOption(2024);
                        props.setCondition()
                        setYearOptionBox(!yearOptionBox);
                    }}
                >
                    2024
                </div>,
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        props.setYearOption(2023);
                        props.setCondition()
                        setYearOptionBox(!yearOptionBox);
                    }}
                >
                    2023
                </div>,
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        props.setYearOption(2022);
                        props.setCondition()
                        setYearOptionBox(!yearOptionBox);
                    }}
                >
                    2022
                </div>,
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        props.setYearOption(2021);
                        props.setCondition()
                        setYearOptionBox(!yearOptionBox);
                    }}
                >
                    2021
                </div>,
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        props.setYearOption(2020);
                        props.setCondition()
                        setYearOptionBox(!yearOptionBox);
                    }}
                >
                    2020
                </div>,
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        props.setYearOption(2019);
                        props.setCondition()
                        setYearOptionBox(!yearOptionBox);
                    }}
                >
                    2019
                </div>,
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        props.setYearOption(2018);
                        props.setCondition()
                        setYearOptionBox(!yearOptionBox);
                    }}
                >
                    2018
                </div>,
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        props.setYearOption(4);
                        props.setCondition()
                        setYearOptionBox(!yearOptionBox);
                    }}
                >
                    2017
                </div>,
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        props.setYearOption(2016);
                        props.setCondition()
                        setYearOptionBox(!yearOptionBox);
                    }}
                >
                    2016
                </div>,
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        props.setYearOption(2015);
                        props.setCondition()
                        setYearOptionBox(!yearOptionBox);
                    }}
                >
                    2015
                </div>,
            ];
            return (
                <div className={style.timeOption}>
                    <div className={`${style.filterOption} ms-5`} onClick={() => setYearOptionBox(!yearOptionBox)}>
                        Year
                        <i className="fa-solid fa-caret-down ms-1"></i>
                    </div>
                    {yearOptionBox && <div  style={{
                            cursor: 'pointer',
                            backgroundColor: 'white',
                            border: 'black 1px solid',
                            borderRadius: '5px',
                            zIndex :"4",
                            position : "relative",
                            textAlign: "center",
                            width: "calc(100% - 3rem)",
                            marginLeft: "3rem"
                        }}>{yearElement}</div>}
                </div>
            );
            break;

        case 'month':
            const [monthOptionBox, setMonthOptionBox] = useState(false);
            const monthElement = [
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        props.setMonthOption(1);
                        props.setCondition()
                        setMonthOptionBox(!monthOptionBox);
                    }}
                >
                    1
                </div>,
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        props.setMonthOption(2);
                        props.setCondition()
                        setMonthOptionBox(!monthOptionBox);
                    }}
                >
                    2
                </div>,
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        props.setMonthOption(3);
                        props.setCondition()
                        setMonthOptionBox(!monthOptionBox);
                    }}
                >
                    3
                </div>,
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        props.setMonthOption(4);
                        props.setCondition()
                        setMonthOptionBox(!monthOptionBox);
                    }}
                >
                    4
                </div>,
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        props.setMonthOption(5);
                        props.setCondition()
                        setMonthOptionBox(!monthOptionBox);
                    }}
                >
                    5
                </div>,
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        props.setMonthOption(6);
                        props.setCondition()
                        setMonthOptionBox(!monthOptionBox);
                    }}
                >
                    6
                </div>,
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        props.setMonthOption(7);
                        props.setCondition()
                        setMonthOptionBox(!monthOptionBox);
                    }}
                >
                    7
                </div>,
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        props.setMonthOption(8);
                        props.setCondition()
                        setMonthOptionBox(!monthOptionBox);
                    }}
                >
                    8
                </div>,
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        props.setMonthOption(9);
                        props.setCondition()
                        setMonthOptionBox(!monthOptionBox);
                    }}
                >
                    9
                </div>,
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        props.setMonthOption(10);
                        props.setCondition()
                        setMonthOptionBox(!monthOptionBox);
                    }}
                >
                    10
                </div>,
                ,
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        props.setMonthOption(11);
                        props.setCondition()
                        setMonthOptionBox(!monthOptionBox);
                    }}
                >
                    11
                </div>,
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        props.setMonthOption(12);
                        props.setCondition()
                        setMonthOptionBox(!monthOptionBox);
                    }}
                >
                    12
                </div>,
            ];
            return (
                <div className={style.timeOption}>
                    <div className={`${style.filterOption} ms-5`} onClick={() => setMonthOptionBox(!monthOptionBox)}>
                        Month
                        <i className="fa-solid fa-caret-down ms-1"></i>
                    </div>
                    {monthOptionBox && <div
                    style={{
                        cursor: 'pointer',
                        backgroundColor: 'white',
                        border: 'black 1px solid',
                        borderRadius: '5px',
                        zIndex :"4",
                        position : "relative",
                        textAlign: "center",
                        width: "calc(100% - 3rem)",
                        marginLeft: "3rem"
                    }}>{monthElement}</div>}
                </div>
            );
            break;
        default:
            break;
    }
}
export { SearchBox };
