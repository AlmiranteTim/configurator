import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

class EditSo extends Component {

    componentWillMount() {
        this.props.soStore.uploadListFromServer();
    }

    render() {
        return (
            <div className="body">
                <div className="content">
                    <div className="content__body">
                        {
                            this.props.soStore.uploaded ?
                                <SoList />
                                :
                                <Loader />
                        }
                    </div>
                </div>
                <Sidebar />
            </div>
        );
    }
}

export default inject('soStore')(observer(EditSo));


const Loader = (props) => (
    <div>LOADING...</div>
)

const SoList = inject('soStore', 'editingItemStore')(observer(props => (
    <div >
        {
            props.soStore.list.map((item, index) => (
                <ListItem key={item.id} item={item} />
            ))
        }
    </div>
)))

const ListItem = inject('editingItemStore')(observer(class ListItem extends Component {

    onItemClick = () => {
        this.props.editingItemStore.setEditingSo(this.props.item)
    }

    render() {
        return (
            <div
                onClick={this.onItemClick}
                className={`item ${this.props.editingItemStore.editingSo.id === this.props.item.id ? 'active' : ''}`}
            >

                <img alt="Система охлаждения" align="bottom" src={`http://api.timurn1w.beget.tech/images/${this.props.item.image}.png`} />
                <div className="item__name">{this.props.item.model}</div>
                <div className="item__value">{this.props.item.value} руб.</div>
            </div>
        )
    }
}))

const Sidebar = inject('soStore', 'editingItemStore')(observer(class Sidebar extends Component {
    onInputClick = e => {
        this.input.click()
    }

    constructor(props) {
        super(props);

        this.onModelChange = this.onModelChange.bind(this);
        this.onSocketChange = this.onSocketChange.bind(this);
        this.onPower_dissipationChange = this.onPower_dissipationChange.bind(this);
        this.onAir_flowChange = this.onAir_flowChange.bind(this);
        this.onNoise_levelChange = this.onNoise_levelChange.bind(this);
        this.onConnector_typeChange = this.onConnector_typeChange.bind(this);
        this.onValueChange = this.onValueChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    onModelChange(e) {
        this.props.editingItemStore.editingSo.model = e.target.value;
    }
    onSocketChange(e) {
        this.props.editingItemStore.editingSo.socket = e.target.value;
    }

    onPower_dissipationChange(e) {
        this.props.editingItemStore.editingSo.power_dissipation = e.target.value;
    }
    onAir_flowChange(e) {
        this.props.editingItemStore.editingSo.air_flow = e.target.value;
    }
    onNoise_levelChange(e) {
        this.props.editingItemStore.editingSo.noise_level = e.target.value;
    }
    onConnector_typeChange(e) {
        this.props.editingItemStore.editingSo.connector_type = e.target.value;
    }
    onValueChange(e) {
        this.props.editingItemStore.editingSo.value = e.target.value;
    }



    handleSubmit(e) {
        e.preventDefault();
    }

    checkDisabled = () => {
        if ( this.props.editingItemStore.editingSo.model === '' ||
            this.props.editingItemStore.editingSo.socket === '' ||
            this.props.editingItemStore.editingSo.power_dissipation === '' ||
            this.props.editingItemStore.editingSo.air_flow === '' ||
            this.props.editingItemStore.editingSo.noise_level === '' ||
            this.props.editingItemStore.editingSo.connector_type === '' ||
            this.props.editingItemStore.editingSo.value === ''||
            this.props.editingItemStore.editingSo.model.length > 45 ||
            this.props.editingItemStore.editingSo.socket.length > 150 ||
            this.props.editingItemStore.editingSo.power_dissipation.length > 45 ||
            this.props.editingItemStore.editingSo.air_flow.length > 45 ||
            this.props.editingItemStore.editingSo.noise_level.length > 45 ||
            this.props.editingItemStore.editingSo.connector_type.length > 45 ||
            this.props.editingItemStore.editingSo.value.length > 11
        ) {
            return true;
        }

        return false;
    };

    render() {

        var { sendToServer, deleteItem } = this.props.soStore;
        var { editingSo, setEditingSo,uploadFile } = this.props.editingItemStore;

        if ( isNaN(editingSo.id) ) {
            return (
                <div className="sidebar">
                    <div className="sidebar__body">
                        <div className="not_chosen">Не выбрано</div>
                    </div>
                    <div className="sidebar__button" onClick={ () => { setEditingSo({id: 0, model: '',socket: '',power_dissipation: '',air_flow: '',noise_level: '',connector_type: '',image: '', value: ''}) }}>
                        Создать
                    </div>
                </div>
            );
        }

        return (
            <div className="sidebar">

                <div  className="sidebar__image">
                    <input ref={input => this.input = input} className="hide" type="file" onChange={(e) => {
                        uploadFile(e, editingSo); this.input.value = "";
                    }} accept=".jpg, .jpeg, .png"/>  <button className="sidebar_image" onClick={this.onInputClick}> <img alt="Система охлаждения" align="bottom" src={`http://api.timurn1w.beget.tech/images/${editingSo.image}.png`}/></button>
                </div>
                    <div className="sidebar__body">
                        <div className="namecharacteristics">Модель</div> <div className="space"></div>
                        <div className='characteristics'>   <input
                            key={editingSo.id}
                            value={editingSo.model}
                            onChange={this.onModelChange}
                        /></div>
                    </div>
                    <div className="sidebar__body">
                        <div className="namecharacteristics">Сокет: </div> <div className="space"></div>
                        <div className='characteristics'>  <input
                            key={editingSo.id}
                            value={editingSo.socket}
                            onChange={this.onSocketChange}
                        /></div>
                    </div>
                    <div className="sidebar__body">
                        <div className="namecharacteristics">Рассеиваемая мощность: </div> <div className="space"></div>
                        <div className='characteristics'>   <input
                            key={editingSo.id}
                            value={editingSo.power_dissipation}
                            onChange={this.onPower_dissipationChange}
                        /></div>
                    </div>
                    <div className="sidebar__body">
                        <div className="namecharacteristics">Воздушный поток: </div> <div className="space"></div>
                        <div className='characteristics'>   <input
                            key={editingSo.id}
                            value={editingSo.air_flow}
                            onChange={this.onAir_flowChange}
                        /></div>
                    </div>
                    <div className="sidebar__body">
                        <div className="namecharacteristics">Уровень шума: </div> <div className="space"></div>
                        <div className='characteristics'>  <input
                            key={editingSo.id}
                            value={editingSo.noise_level}
                            onChange={this.onNoise_levelChange}
                        /></div>
                    </div>
                    <div className="sidebar__body">
                        <div className="namecharacteristics">Тип коннектора: </div> <div className="space"></div>
                        <div className='characteristics'> <input
                            key={editingSo.id}
                            value={editingSo.connector_type}
                            onChange={this.onConnector_typeChange}
                        /></div>
                    </div>

                    <div className="sidebar__body">
                        <div className="namecharacteristics">Цена: </div> <div className="space"></div>
                        <div className='characteristics'> <input
                            key={editingSo.id}
                            value={editingSo.value}
                            type='number'
                            onChange={this.onValueChange}
                        /></div>
                    </div>
                <div className="edit_buttons">
                    <div className="sidebar__button" onClick={ () => { setEditingSo({
                        id: 0,
                        model: '',
                        socket: '',
                        power_dissipation: '',
                        air_flow: '',
                        noise_level: '',
                        connector_type: '',
                        image: '',
                        value: ''}) }}>
                        Создать
                    </div>
                    {
                        (editingSo.id || editingSo.id === 0) ?
                            <button disabled={this.checkDisabled()} className="sidebar__button" onClick={() => { sendToServer({
                                id: editingSo.id,
                                model: this.props.editingItemStore.editingSo.model,
                                socket: this.props.editingItemStore.editingSo.socket,
                                power_dissipation: this.props.editingItemStore.editingSo.power_dissipation,
                                air_flow: this.props.editingItemStore.editingSo.air_flow,
                                noise_level: this.props.editingItemStore.editingSo.noise_level,
                                connector_type: this.props.editingItemStore.editingSo.connector_type,
                                value: this.props.editingItemStore.editingSo.value,
                                image: editingSo.image})
                                setEditingSo({
                                    id: 0,
                                    model: '',
                                    socket: '',
                                    power_dissipation: '',
                                    air_flow: '',
                                    noise_level: '',
                                    connector_type: '',
                                    image: '',
                                    value: ''})}}>
                                Сохранить изменения
                            </button> : null
                    }
                    {
                        editingSo.id ?
                            <div className="sidebar__button" onClick={() => {deleteItem(editingSo)
                                setEditingSo({
                                    id: 0,
                                    model: '',
                                    socket: '',
                                    power_dissipation: '',
                                    air_flow: '',
                                    noise_level: '',
                                    connector_type: '',
                                    image: '',
                                    value: ''})}}>
                                Удалить
                            </div> : null
                    }



                </div>
            </div>
        );
    }
}))