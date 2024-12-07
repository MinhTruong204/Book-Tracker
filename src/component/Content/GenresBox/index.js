import { DataContext } from "~/component/Content/Context/DataContext"
import { useContext, useState } from "react"

import style from "~/component/Content/GenresBox/GenresBox.module.css"
import { BookItem } from "../BlockItem"
import { CloseButton } from "react-bootstrap"
import BookBox from "../BookBox"

function GenresBox(props) {
    const bookList = []
    let listBooksElement = []
    let bookElement = []
    //Get all book in the same name
    useContext(DataContext).forEach(book => {
        if(book.genres.name == props.name) bookList.push(book)
    });
    
    //Split 
    bookList.forEach((e,i) => {
        if(listBooksElement.length == 0) listBooksElement.push([<GenresItem key = {i} data = {e}></GenresItem>])
        else {
            if(listBooksElement[listBooksElement.length - 1].length < 4) 
                listBooksElement[listBooksElement.length - 1].push(<GenresItem key = {i} data = {e}></GenresItem>)
            else 
                listBooksElement.push([<GenresItem key = {i} data = {e}></GenresItem>])
        }
    })
    for(let i = 0 ; i < listBooksElement.length ; i++) {
        bookElement.push(<GenresRow>{listBooksElement[i]}</GenresRow>)
    }


    console.log(bookElement)
    return (
        <div className={style.genresBox}>
            <div className={`${style.content} px-3 d-flex flex-column`}>
                <CloseButton className="align-self-end" onClick={() => props.handleCloseGenresBox()}></CloseButton> 
                <h1 className="text-center my-5">{props.name}</h1>
                {bookElement}
            </div>
                 
        </div>
    )
}

function GenresRow({children}) {
    return (
        <div className="row">
            {children}
        </div>
    )
}
function GenresItem(props) {
    const [activeBook, setActiveBook] = useState();
    return (
        <div className="col-3">
            <BookItem
                name={props.data.name}
                author={props.data.author}
                progress={props.data.progress}
                id={props.data.id}
                handleClick={(book) => {
                    setActiveBook(book);
                }}
            >
            </BookItem>
            {activeBook && (
                <BookBox
                    icon={<i className={`fa-solid fa-book `}></i>}
                    data={activeBook}
                    handleClick={() => {
                        setActiveBook(null);
                    }}
                    type="old"
                    // rerender = {props.rerender}
                ></BookBox>
            )}
        </div>
    )
}
export {GenresBox}