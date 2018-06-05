import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';


class Modal extends Component {

    componentWillMount() {
        this.root = document.createElement('div');
        this.root.classList.add('modal');
        document.body.appendChild(this.root); //добавить элемент в самый низ
    }
    
    componentWillUnmount() {
        document.body.removeChild(this.root);
    }

    render() {
        return ReactDOM.createPortal(
            <Fragment>
                <div className="modal__body">
                    {this.props.children}
                </div>
               <div onClick={this.props.onClose} className="modal__background"></div>
            </Fragment>,
            this.root
        );
    }
}

export default Modal;