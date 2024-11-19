import { useState,useContext, useEffect } from "react";

import Container from "react-bootstrap/Container";
import ProgressBar from 'react-bootstrap/ProgressBar';
import CloseButton from 'react-bootstrap/CloseButton';

import { StatusOptionBox,StatusOption,TextOption,RatingOption} from "./OptionBox/OptionBox";
import { ActiveInputContext ,ActiveInputProvider} from "../Context/ActiveInputContext";
import style from "./BookBox.module.css";



function BookBox(props) {
    
    const [activeInput,setActiveInput] = useState(null);
    function handleAciveInput(name) {
        setActiveInput(name);
    }
    useEffect(() => {
        
    },[activeInput])
    let data = props.data;
    console.log(data)
    return (
        <div className = {style.bookBox}>
            <div className={style.content}>
                <Container
                    className = {style.container}
                >
                    {/* Infomation */}
                    <div className={style.info}>
                        <div className={style.name}> <cite>{data.name}</cite> </div>
                        
                        <div className={style.detailInfo}>
                            <ul className = {style.detailInfo__list}>
                                <InfoItem type = "status"       data = {data.status}      handleAciveInput = {handleAciveInput} activeInput = {activeInput}></InfoItem>
                                <InfoItem type = "author"       data = {data.author}      handleAciveInput = {handleAciveInput} activeInput = {activeInput}></InfoItem>
                                <InfoItem type = "description"  data = {data.description} handleAciveInput = {handleAciveInput} activeInput = {activeInput}></InfoItem>
                                <InfoItem type = "genres"       data = {data.genres}      handleAciveInput = {handleAciveInput} activeInput = {activeInput}></InfoItem>
                                <InfoItem type = "totalPage"    data = {data.totalPage}   handleAciveInput = {handleAciveInput} activeInput = {activeInput}></InfoItem>
                                <InfoItem type = "curPage"      data = {data.curPage}     handleAciveInput = {handleAciveInput} activeInput = {activeInput}></InfoItem>
                                <InfoItem type = "progress"     data = {data.progress}    handleAciveInput = {handleAciveInput} activeInput = {activeInput}></InfoItem>
                                <InfoItem type = "rating"       data = {data.rating}      handleAciveInput = {handleAciveInput} activeInput = {activeInput}></InfoItem>
                            </ul>
                    </div>
                        
                    </div>

                    {/* Image */}
                    <div className={style.img}>
                        <img src={data.img}></img>
                    </div>

                    {/* Tool Bar */}
                    <CloseButton onClick={() => props.handleClick()}/>
                    
                </Container>
            </div>
        </div>
    )
}


function InfoItem(props) {
    function showStatusOptions () {
        setStatusOptionBox(!statusOpionBox);
    }

    const [statusOpionBox,setStatusOptionBox] = useState(false);
    switch (props.type) {
        case "status":
            return (
            <li className = {`${style.detailInfo__item}`}>
                <label className = {style.detailInfo__name}>
                    <i className="fa-solid fa-spinner"></i>
                    Status
                </label>
                <div className={`${style.detailInfo__describe} ${style.detailInfo__statusDescribe}`}
                     
                >
                    <div onClick={() => setStatusOptionBox(!statusOpionBox)}>
                        <StatusOption 
                            type ={props.data}

                        > 
                        </StatusOption>
                    </div>
                    {statusOpionBox && <StatusOptionBox></StatusOptionBox>}
                   
                    
                </div>
            </li>
            );
            
            break;
        case "author":
            return (
                <li className = {style.detailInfo__item}>
                    <label className = {style.detailInfo__name}>
                        <i className="fa-solid fa-pen"></i>
                        Author
                    </label>
                    <div className={style.detailInfo__describe}>
                        <div onClick={(e) => props.handleAciveInput(props.type)} 
                        >
                            <TextOption unActiveInput = {props.handleAciveInput} 
                                        active = {props.activeInput == "author"} 
                                        text = {props.data}
                            >

                            </TextOption>
                        </div>
                    </div>
                </li>
                );
                
            break;
        case "description":
            return (
                <li className = {style.detailInfo__item}>
                    <span className = {style.detailInfo__name}>
                        <i className="fa-solid fa-clipboard"></i>
                        Description
                    </span>
                    <div className={style.detailInfo__describe}
                        onClick={() => props.handleAciveInput(props.type)} 
                    >
                        <TextOption unActiveInput = {props.handleAciveInput} 
                                    active = {props.activeInput == "description"} 
                                    text = {props.data}
                        >
                            
                        </TextOption>
                    </div>
                </li>
                );
            break;
        case "genres":
            return (
                <li className = {style.detailInfo__item}>
                    <span className = {style.detailInfo__name}>
                        <i className="fa-solid fa-icons"></i>
                        Genres
                    </span>
                    <div className={style.detailInfo__describe}
                        onClick={() => props.handleAciveInput(props.type)} 
                    >
                        <i className={props.data.icon}></i>
                        {props.data.name}
                    </div>
                </li>
                );
            break;
        case "totalPage":
            return (
                <li className = {style.detailInfo__item}>
                    <span className = {style.detailInfo__name}>
                        <i className="fa-solid fa-hashtag"></i>
                        Total Page
                    </span>
                    <div className={style.detailInfo__describe}
                        onClick={() => props.handleAciveInput(props.type)} 
                    >
                        <TextOption unActiveInput = {props.handleAciveInput} 
                                    active = {props.activeInput == "totalPage"} 
                                    text = {props.data}
                        >
                            
                        </TextOption>
                    </div>
                </li>
                );
            break;
        case "curPage":
            return (
                <li className = {style.detailInfo__item}>
                    <span className = {style.detailInfo__name}>
                        <i className="fa-solid fa-hashtag"></i>
                        Current Page
                    </span>
                    <div className={style.detailInfo__describe}
                        onClick={() => props.handleAciveInput(props.type)} 
                    >
                        <TextOption unActiveInput = {props.handleAciveInput} 
                                    active = {props.activeInput == "curPage"} 
                                    text = {props.data}
                        >

                        </TextOption>
                    </div>
                </li>
                );
            break;
        case "progress":
            return (
                <li className = {style.detailInfo__item}>
                    <span className = {style.detailInfo__name}>
                        <i className="fa-solid fa-bars-progress"></i>
                        Progress
                    </span>
                    <div className={style.detailInfo__describe}
                        onClick={() => props.handleAciveInput(props.type)} 
                    >
                        <span >{props.data}%</span>
                        <ProgressBar className={style.progressBar} now={props.data}/>
                    </div>
                </li>
                );
            break;
        case "rating":
            return (
                <li className = {style.detailInfo__item}>
                    <span className = {style.detailInfo__name}>
                        <i className="fa-solid fa-star"></i>                        
                        Rating
                    </span>
                    <div className={style.detailInfo__describe}
                        onClick={() => props.handleAciveInput(props.type)} 
                    >
                        <RatingOption data = {props.data}></RatingOption>
                    </div>
                </li>
                );
            break;
        default:
            break;
    }
}

export default BookBox;