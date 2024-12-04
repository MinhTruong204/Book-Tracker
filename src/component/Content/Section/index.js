import Pagination from 'react-bootstrap/Pagination';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useState , useContext } from 'react';



import BlockItem from '~/component/Content/BlockItem/index';
import style from './Section.module.css';
import { DataContext } from '../Context/DataContext';

const numbercolumn = {
        Books : 4,
        Quotes : 1,
        Genres : 6
}
  
function Section(props) {
    let paginationItems = [];
    let sectionName = props.sectionName;
    for(let i in props.data) {
        paginationItems.push(i);
    }
    const [activePagination,setActivePagination] = useState(paginationItems[0]);

    function handleClick(e) {
        setActivePagination(e);
    }
    return (
        <div >
            <h2 className={style.sectionName}>{sectionName}</h2>
            <div className="navbar">
                <Pagination size="lg">
                    {paginationItems.map((e, index) => {
                        return <Pagination.Item 
                                    key={index}
                                    linkClassName={`${style.pargination_item}`}
                                    active = {e == activePagination ? true : false}
                                    onClick={() => handleClick(e)}
                                >
                                <div className= {style.pargination__block__item}>
                                    <i className="fa-solid fa-book-open"></i>
                                    <h3>{e}</h3>
                                </div>    
                                </Pagination.Item>;
                    })}
                </Pagination>
                <Navbar>
                    <Navbar className="menu">
                        <Nav.Link className={`p-3 ${style.filter} ${style.menu__item}`} href="">
                            Filter
                        </Nav.Link>
                        <Nav.Link className={`p-3 ${style.menu__item}`} href="">
                            Sort
                        </Nav.Link>
                        <Nav.Link className={`p-3 ${style.menu__item}`} href="">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </Nav.Link>
                        <Nav.Link className={`p-3 ${style.menu__item}`} href="">
                            <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
                        </Nav.Link>
                        <Nav.Link className={`p-3 ${style.menu__item}`} href="">
                            <i className="fa-solid fa-ellipsis"></i>
                        </Nav.Link>
                        <Nav.Item>
                            <Button>New</Button>
                        </Nav.Item> 
                    </Navbar>
                </Navbar>
            </div>
            <div>
                <BlockItem 
                    data = {props.data[activePagination]} 
                    numbercolumn = {numbercolumn[props.sectionName]}
                    sectionName = {props.sectionName} 
                    // rerender = {props.rerender}
                >   
                </BlockItem>
            </div>
            
        </div>
        
    );
}

export default Section;
