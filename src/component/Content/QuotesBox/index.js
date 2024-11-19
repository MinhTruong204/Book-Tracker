
import Offcanvas from 'react-bootstrap/Offcanvas';
import style from './QuotesBox.module.css'

function QuotesBox(props) {
    return (
        <Offcanvas show = {true} placement = {"end"} className = "w-50">
            <Offcanvas.Header className={style.title}>
                <Offcanvas.Title>
                <i className="fa-solid fa-bookmark"></i>
                The book is very good
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className = {style.content}>
                World
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export {QuotesBox};