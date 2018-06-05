import React, { } from 'react';
import { observer, inject } from 'mobx-react';
import { NavLink, withRouter } from 'react-router-dom'

import Modal from './Modal'


const Header = (props) => (


    <div className="header">
        <div className="header__body">
        
            <NavLink
                to="/cpu"
                activeClassName="active"
                className="header__item">
                Процессор
            </NavLink>
            
            <NavLink
                to="/gpu"
                activeClassName="active"
                className="header__item">
                Видеокарта
            </NavLink>

            <NavLink
                to="/ram"
                activeClassName="active"
                className="header__item">
                Оперативная память
            </NavLink>

            <NavLink
                to="/bp"
                activeClassName="active"
                className="header__item">
                Блок питания
            </NavLink>

            <NavLink
                to="/mb"
                activeClassName="active"
                className="header__item">
                Материнская плата
            </NavLink>
            <NavLink
                to="/so"
                activeClassName="active"
                className="header__item">
                Система охлаждения
            </NavLink>
            <NavLink
                to="/ssd"
                activeClassName="active"
                className="header__item">
                SSD-диск
            </NavLink>
            {
                props.userStore.token &&
                <button
                    className="header__item toggle_button"
                    onClick={()=>  {props.userStore.toggleEditMode();
                        props.selectedItemsStore.HideCpuButton();
                        props.selectedItemsStore.HideGpuButton();
                        props.selectedItemsStore.HideRamButton();
                        props.selectedItemsStore.HideBpButton();
                        props.selectedItemsStore.HideMbButton();
                        props.selectedItemsStore.HideSoButton();
                        props.selectedItemsStore.HideSsdButton();
                    }}
                >
                    Редактор
                    {props.userStore.editMode ? '-выкл.' : '-вкл.'}

                </button>
            }
            {
                props.userStore.username ?
                <button
                    className="header__item login-button"
                    onClick={props.userStore.logout}
                >
                    Выйти
                </button>
                :
                <button
                    className="header__item login-button"
                    onClick={props.userStore.openLoginModal}
                >
                    Войти
                </button>
            }
        </div>
        {
            props.userStore.showLoginModal &&
            <Modal onClose={props.userStore.closeLoginModal}>
                <LoginModal />
            </Modal>//это this.props.children из компонента из modal
        }
    </div>
)



export default withRouter(inject('cpuStore', 'gpuStore', 'ramStore', 'bpStore', 'mbStore' ,'soStore' , 'ssdStore','userStore' , 'selectedItemsStore')(observer(Header)));

const LoginModal = inject('userStore')(observer(props => {
    if (props.userStore.tokenUploading) {
        return (
            <div className="login-modal">
                <div className="modal-loader">
                    <i className="fas fa-sync-alt fa-spin"></i>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="login-modal">
                <div className="login-modal__error">{props.userStore.tokenError}</div>
                <div className="login-modal__username">
                    <input ref={ (input) => { this.username = input } } type="text" placeholder="Имя пользователя"/>
                </div>
                <div className="login-modal__password">
                    <input ref={ (input) => { this.password = input } } type="password"  placeholder="Пароль"/>
                </div>
                <div className="login-modal__submit-button">
                    <button onClick={() => {props.userStore.login({username: this.username.value, password: this.password.value })}}>Войти</button>
                </div>
            </div>
        );
    }
}));
