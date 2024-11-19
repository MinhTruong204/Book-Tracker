import CloseButton from 'react-bootstrap/CloseButton';
import style from './OptionBox.module.css'
import { useState } from 'react';
function StatusOptionBox() {
    return (
        <div className={style.statusOptionBox}>
            <span className={style.statusDescribe}>In Progress</span>
           <StatusOption type ="Reading"></StatusOption>
           <hr/>
           <span className={style.statusDescribe}>To-do</span>
           <StatusOption type ="To Read"></StatusOption>
           <hr/>
           <span className={style.statusDescribe}>Complete</span>
           <StatusOption type ="Read"></StatusOption>
        </div>
    );

}

function StatusOption(props) {
    
    switch (props.type) {
        case "Reading":
            return ( 
                <>
                    <div >
                        <div className={style.statusOption}>
                            <span className={`${style.statusDot} ${style.readingDot}`}></span>
                            <span>Reading</span>
                            
                        </div>
                    </div>
                    
                </>
                )
            break;
        case "To Read":
            return ( 
                <div >
                    <div className={style.statusOption}>
                        <span className={`${style.statusDot} ${style.toReadDot}`}></span>
                        <span>To Read</span> 
                    </div>
                </div>
                )
            break;
        case "Read":
            return ( 
                <div >
                    <div className={style.statusOption}>
                        <span className={`${style.statusDot} ${style.readDot}`}></span>
                        <span>Read</span>
                    </div>
                </div>
                )
            break;
    
        default:
            break;
    }
}

function TextOption(props) {
    return (
        <div className='w-100'>
            {(props.active
            ?  <input className={`w-100 ${style.input}`} 
                        defaultValue={props.text} 
                        autoFocus
                        onBlur={() => props.unActiveInput(null)}
                        

                >
                </input>
            :  <p className='mb-0'>{props.text}</p>)}
        </div>
    );
}

function RatingOption (props) {
    let rateBlock = [];
    for(let i = 0 ; i < 5 ; i++) {
        if(i < props.data) rateBlock.push(<i key = {i} className = {`fa-solid fa-star `}></i> );
        else rateBlock.push(<i key = {i} className = {`fa-regular fa-star `}></i> );
        
        
    }
    return (
        <div className ={style.ratingOption}>{rateBlock} </div>
    )
}
export {StatusOptionBox,StatusOption,TextOption,RatingOption};