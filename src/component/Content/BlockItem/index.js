import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useState , useContext, useEffect} from "react";

import BookBox from "../BookBox";
import style from "./BlockItem.module.css";
import { DataContext } from "~/component/Content/Context/DataContext";



function BlockItem(props) {
  if(props.data.length > 0) {
    let arrElement = [];
    
    for (let i = 0; i < props.data.length ; i += props.numbercolumn) {
      let element;

      if (i + props.numbercolumn > props.data.length) element = props.data.slice(i);
      else element = props.data.slice(i, i + props.numbercolumn);
      arrElement.push(element);
    }

    if (arrElement[arrElement.length - 1].length == props.numbercolumn)
      arrElement.push([{ addElement: true,pos : 'newcolumn' }]);
    else arrElement[arrElement.length - 1].push({ addElement: true,pos : 'curcolumn'  });

    return (
      <div>
        {arrElement.map((e, i) => {

          return <RowItem 
                    data={e} 
                    key={i} 
                    numbercolumn = {props.numbercolumn}
                    logo = {props.logo}
                    sectionName = {props.sectionName}
                  >
                  </RowItem>;

        })}
        
      </div>
    );
    
   
  }
}

function RowItem(props) {
  switch (props.sectionName) {
    case "Books":
      const [activeBook, setActiveBook] = useState();
      return (
        <Row className="mb-4">
          {props.data.map((e, i) => {
              if(e.addElement) {
                return <AddBlock 
                          key = {i} 
                          pos = {e.pos} 
                          numbercolumn = {props.numbercolumn}
                          type = {props.sectionName}
                        />
              }
              else {
                return (
                  <BookItem
                      name={e.name}
                      author={e.author}
                      progress={e.progress}
                      key={i}
                      numbercolumn = {props.numbercolumn}
                      logo = {props.logo}
                      id = {props.data[i].id}
                      handleClick = {(book) => {
                        setActiveBook(book);
                      }}
                  />
                );
              }
          })}
          {activeBook && 
          <BookBox
            icon = {<i className={`fa-solid fa-book `}></i>}
            data = {activeBook}
            handleClick = {() => {
              setActiveBook(null);
            }}
          >
          </BookBox>}
        </Row>
      );
      break;
    case "Quotes": 
      return ( 
        <Row className="mb-1">
          {props.data.map((e, i) => {
              if(e.addElement) {
                return <AddBlock 
                          key = {i} 
                          pos = {e.pos} 
                          numbercolumn = {props.numbercolumn}
                          type = {props.sectionName}
                        />
              }
              else {
                return (
                  <QuoteItem 
                    key = {i}
                    data = {e}
                    
                  />
                );
              }
          })}
        </Row>
        
      );
      break;
    case "Genres":
      return (
        <Row className="mb-4">
          {props.data.map((e, i) => {
            if(e.addElement) {
              return <AddBlock 
                        key = {i} 
                        pos = {e.pos} 
                        numbercolumn = {props.numbercolumn}
                        type = {props.sectionName}
                      />
            } 
            else {
              return (
                <GenresItem
                    data = {e}
                    key={i}
                    numbercolumn = {props.numbercolumn} 
                />
              );
            }
          })}
        </Row>
      );
      break;
    default:
      break;
  }
 
    
} 

function BookItem(props) {
  
  const data = useContext(DataContext);
  let thisBook;

  data.forEach(book => {
    if(book.id == props.id) thisBook = book;
  });


  return (
    <Col lg={12/props.numbercolumn} onClick={() => props.handleClick(thisBook)}>
      <ListGroup>
        <ListGroup.Item className={style.content}>
          <p className={style.title}>
            <cite><i className={`fa-solid fa-book`}></i>{props.name}</cite>
          </p>
          <p className={style.author}>
            <span>{props.author}</span>
          </p>
          <div className={style.progress}>
            <span >{props.progress}%</span>
            <ProgressBar className={style.progressBar} now={props.progress} />
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );

}

function QuoteItem(props) {
  return (
    <Col lg={12/props.numbercolumn} >
      <ListGroup>
        <ListGroup.Item className={`${style.content} ${style.content__quotes}`}>
          <div className={style.content__quotes__paragraph}>
            <i className="fa-solid fa-bookmark"></i>
            <blockquote style={{display: "inline"}}>{props.data.content}</blockquote>
          </div>
          <cite className={style.content__quotes__name}>
            <i className={`fa-solid fa-book`}></i>
            {props.data.name}
          </cite>
        </ListGroup.Item>
      </ListGroup>  
    </Col>
  );
}

function GenresItem(props) {
  return (
    <Col lg={12/props.numbercolumn} >
      <ListGroup>
        <ListGroup.Item className={`${style.content} ${style.content__genres}`}>
          <p className={style.content__genres__title}>
            <cite>{<i className={props.data.genres.icon}></i>}{props.data.genres.name}</cite>
            
          </p>
          <span className={style.content__genres__quantity}>{props.data.count} Books</span>
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
}

function AddBlock(props) {
  let addBlockType =  props.type == "Books" ? style.booksAddBlock : 
                      props.type == "Genres" ? 
                      style.genresAddBlock : style.quotesAddBlock;
  
  return (props.pos == 'newcolumn') 
  ? (
    <Col lg={12/props.numbercolumn} onClick={() => console.log(props.type)}>
      <ListGroup>
        <ListGroup.Item className={`${style.content} ${style.newcol } ${addBlockType} ` }>
          <h4>+ New</h4>
        </ListGroup.Item>
      </ListGroup>
    </Col>
  )
  : (
    <Col lg={12/props.numbercolumn} onClick={() => console.log(props.type)}>
      <ListGroup>
        <ListGroup.Item className={`${style.content} ${addBlockType}` }>
          <h4>+ New</h4>
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
}
export default BlockItem;
