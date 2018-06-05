import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

class EditSsd extends Component {

    componentWillMount() {
        this.props.ssdStore.uploadListFromServer();
    }

    render() {
        return (
            <div className="body">
                <div className="content">
                    <div className="content__body">
                        {
                            this.props.ssdStore.uploaded ?
                                <SsdList />
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

export default inject('ssdStore')(observer(EditSsd));


const Loader = (props) => (
    <div>LOADING...</div>
)

const SsdList = inject('ssdStore', 'editingItemStore')(observer(props => (
    <div >
        {
            props.ssdStore.list.map((item, index) => (
                <ListItem key={item.id} item={item} />
            ))
        }
    </div>
)))

const ListItem = inject('editingItemStore')(observer(class ListItem extends Component {

    onItemClick = () => {
        this.props.editingItemStore.setEditingSsd(this.props.item)
    }

    render() {
        return (
            <div
                onClick={this.onItemClick}
                className={`item ${this.props.editingItemStore.editingSsd.id === this.props.item.id ? 'active' : ''}`}
            >
                <img alt="SSD" align="bottom" src={`http://api.timurn1w.beget.tech/images/${this.props.item.image}.png`} />
                <div className="item__name">{this.props.item.model}</div>
                <div className="item__value">{this.props.item.value} руб.</div>
            </div>
        )
    }
}))

const Sidebar = inject('ssdStore', 'editingItemStore')(observer(class Sidebar extends Component {
    onInputClick = e => {
        this.input.click()
    }

    constructor(props) {
        super(props);

        this.onModelChange = this.onModelChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onVolumeChange = this.onVolumeChange.bind(this);
        this.onRecording_speed_reading_speedChange = this.onRecording_speed_reading_speedChange.bind(this);
        this.onForm_factorChange = this.onForm_factorChange.bind(this);
        this.onInterfaceChange = this.onInterfaceChange.bind(this);
        this.onValueChange = this.onValueChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    onModelChange(e) {
        this.props.editingItemStore.editingSsd.model = e.target.value;
    }
    onTypeChange(e) {
        this.props.editingItemStore.editingSsd.type = e.target.value;
    }

    onVolumeChange(e) {
        this.props.editingItemStore.editingSsd.volume = e.target.value;
    }
    onRecording_speed_reading_speedChange(e) {
        this.props.editingItemStore.editingSsd.recording_speed_reading_speed = e.target.value;
    }
    onForm_factorChange(e) {
        this.props.editingItemStore.editingSsd.form_factor = e.target.value;
    }
    onInterfaceChange(e) {
        this.props.editingItemStore.editingSsd.interface = e.target.value;
    }
    onValueChange(e) {
        this.props.editingItemStore.editingSsd.value = e.target.value;
    }



    handleSubmit(e) {
        e.preventDefault();
    }

    checkDisabled = () => {
        if ( this.props.editingItemStore.editingSsd.model === '' ||
            this.props.editingItemStore.editingSsd.type === '' ||
            this.props.editingItemStore.editingSsd.volume === '' ||
            this.props.editingItemStore.editingSsd.recording_speed_reading_speed === '' ||
            this.props.editingItemStore.editingSsd.form_factor === '' ||
            this.props.editingItemStore.editingSsd.interface === '' ||
            this.props.editingItemStore.editingSsd.value === ''||
            this.props.editingItemStore.editingSsd.model.length > 45 ||
            this.props.editingItemStore.editingSsd.type.length > 45 ||
            this.props.editingItemStore.editingSsd.volume.length > 45 ||
            this.props.editingItemStore.editingSsd.recording_speed_reading_speed.length > 45 ||
            this.props.editingItemStore.editingSsd.form_factor.length > 45 ||
            this.props.editingItemStore.editingSsd.interface.length > 45 ||
            this.props.editingItemStore.editingSsd.value.length > 11
        ) {
            return true;
        }

        return false;
    };

    render() {

        var { sendToServer, deleteItem } = this.props.ssdStore;
        var { editingSsd, setEditingSsd , uploadFile } = this.props.editingItemStore;

        if ( isNaN(editingSsd.id) ) {
            return (
                <div className="sidebar">
                    <div className="sidebar__body">
                        <div className="not_chosen">Не выбрано</div>
                    </div>
                    <div className="sidebar__button" onClick={ () => { setEditingSsd({id: 0, model: '',type: '',volume: '',recording_speed_reading_speed: '',form_factor: '',interface: '', value: '',  image: ''}) }}>
                        Создать
                    </div>
                </div>
            );
        }

        return (
            <div className="sidebar">


                <div  className="sidebar__image">
                    <input ref={input => this.input = input} className="hide" type="file" onChange={(e) => {
                        uploadFile(e, editingSsd); this.input.value = "";
                    }} accept=".jpg, .jpeg, .png"/>  <button className="sidebar_image" onClick={this.onInputClick}> <img alt="SSD" align="bottom" src={`http://api.timurn1w.beget.tech/images/${editingSsd.image}.png`}/></button>
                </div>
                    <div className="sidebar__body">
                        <div className="namecharacteristics">Модель</div> <div className="space"></div>
                        <div className='characteristics'><input
                            key={editingSsd.id}
                            value={editingSsd.model}
                            onChange={this.onModelChange}
                        /></div>
                    </div>
                    <div className="sidebar__body">
                        <div className="namecharacteristics">Тип: </div> <div className="space"></div>
                        <div className='characteristics'> <input
                            key={editingSsd.id}
                            value={editingSsd.type}
                            onChange={this.onTypeChange}
                        /></div>
                    </div>
                    <div className="sidebar__body">
                        <div className="namecharacteristics">Объем: </div> <div className="space"></div>
                        <div className='characteristics'>  <input
                            key={editingSsd.id}
                            value={editingSsd.volume}
                            onChange={this.onVolumeChange}
                        /></div>
                    </div>

                    <div className="sidebar__body">
                        <div className="namecharacteristics">Скорость записи/чтения: </div> <div className="space"></div>
                        <div className='characteristics'>  <input
                            key={editingSsd.id}
                            value={editingSsd.recording_speed_reading_speed}
                            onChange={this.onRecording_speed_reading_speedChange}
                        /></div>
                    </div>
                    <div className="sidebar__body">
                        <div className="namecharacteristics">Форм фактор: </div> <div className="space"></div>
                        <div className='characteristics'>  <input
                            key={editingSsd.id}
                            value={editingSsd.form_factor}
                            onChange={this.onForm_factorChange}
                        /></div>
                    </div>
                    <div className="sidebar__body">
                        <div className="namecharacteristics">Интерфейс: </div> <div className="space"></div>
                        <div className='characteristics'>  <input
                            key={editingSsd.id}
                            value={editingSsd.interface}
                            onChange={this.onInterfaceChange}
                        /></div>
                    </div>
                    <div className="sidebar__body">
                        <div className="namecharacteristics">Цена: </div> <div className="space"></div>
                        <div className='characteristics'>  <input
                            key={editingSsd.id}
                            value={editingSsd.value}
                            type='number'
                            onChange={this.onValueChange}
                        /></div>
                    </div>
                <div className="edit_buttons">
                    <div  className="sidebar__button" onClick={ () => { setEditingSsd({
                        id: 0,
                        model: '',
                        type: '',
                        volume: '',
                        recording_speed_reading_speed: '',
                        form_factor: '',
                        interface: '',
                        value: '',
                        image: ''}) }}>
                        Создать
                    </div>
                    {
                        (editingSsd.id || editingSsd.id === 0) ?
                            <button disabled={this.checkDisabled()}  className="sidebar__button" onClick={() => { sendToServer({
                                id: editingSsd.id,
                                model: this.props.editingItemStore.editingSsd.model,
                                type: this.props.editingItemStore.editingSsd.type,
                                volume: this.props.editingItemStore.editingSsd.volume,
                                recording_speed_reading_speed: this.props.editingItemStore.editingSsd.recording_speed_reading_speed,
                                form_factor: this.props.editingItemStore.editingSsd.form_factor,
                                interface: this.props.editingItemStore.editingSsd.interface,
                                value: this.props.editingItemStore.editingSsd.value,
                                image: editingSsd.image})
                                setEditingSsd({
                                    id: 0,
                                    model: '',
                                    type: '',
                                    volume: '',
                                    recording_speed_reading_speed: '',
                                    form_factor: '',
                                    interface: '',
                                    value: '',
                                    image: ''})}}>
                                Сохранить изменения
                            </button> : null
                    }
                    {
                        editingSsd.id ?
                            <div  className="sidebar__button" onClick={() => {deleteItem(editingSsd)
                                setEditingSsd({
                                    id: 0,
                                    model: '',
                                    type: '',
                                    volume: '',
                                    recording_speed_reading_speed: '',
                                    form_factor: '',
                                    interface: '',
                                    value: '',
                                    image: ''})}}>
                                Удалить
                            </div> : null
                    }



                </div>
            </div>
        );
    }
}))