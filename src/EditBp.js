import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';

class EditBp extends Component {

    componentWillMount() {
        this.props.bpStore.uploadListFromServer();
    }

    render() {
        return (
            <div className="body">
                <div className="content">
                    <div className="content__body">
                        {
                            this.props.bpStore.uploaded ?
                                <BpList/>
                                :
                                <Loader/>
                        }
                    </div>
                </div>
                <Sidebar/>
            </div>
        );
    }
}

export default inject('bpStore')(observer(EditBp));


const Loader = (props) => (
    <div>LOADING...</div>
)

const BpList = inject('bpStore', 'editingItemStore')(observer(props => (
    <div>
        {
            props.bpStore.list.map((item, index) => (
                <ListItem key={item.id} item={item}/>
            ))
        }
    </div>
)))

const ListItem = inject('editingItemStore')(observer(class ListItem extends Component {

    onItemClick = () => {
        this.props.editingItemStore.setEditingBp(this.props.item)
    }

    render() {
        return (
            <div
                onClick={this.onItemClick}
                className={`item ${this.props.editingItemStore.editingBp.id === this.props.item.id ? 'active' : ''}`}
            >
                <img alt="Блок питания" align="bottom" src={`http://api.timurn1w.beget.tech/images/${this.props.item.image}.png`} />
                <div className="item__name">{this.props.item.model}</div>
                <div className="item__value">{this.props.item.value} руб.</div>
            </div>
        )
    }
}))

const Sidebar = inject('bpStore', 'editingItemStore')(observer(class Sidebar extends Component {
    onInputClick = e => {
        this.input.click()
    }

    constructor(props) {
        super(props);

        this.onModelChange = this.onModelChange.bind(this);
        this.onForm_factorChange = this.onForm_factorChange.bind(this);
        this.onConnector_type_for_motherboardChange = this.onConnector_type_for_motherboardChange.bind(this);
        this.onPfcChange = this.onPfcChange.bind(this);
        this.onCooling_systemChange = this.onCooling_systemChange.bind(this);
        this.onPowerChange = this.onPowerChange.bind(this);
        this.onValueChange = this.onValueChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    onModelChange(e) {
        this.props.editingItemStore.editingBp.model = e.target.value;
    }
    onForm_factorChange(e) {
        this.props.editingItemStore.editingBp.form_factor = e.target.value;
    }

    onConnector_type_for_motherboardChange(e) {
        this.props.editingItemStore.editingBp.connector_type_for_motherboard = e.target.value;
    }
    onPfcChange(e) {
        this.props.editingItemStore.editingBp.pfc = e.target.value;
    }
    onCooling_systemChange(e) {
        this.props.editingItemStore.editingBp.cooling_system = e.target.value;
    }
    onPowerChange(e) {
        this.props.editingItemStore.editingBp.power = e.target.value;
    }
    onValueChange(e) {
        this.props.editingItemStore.editingBp.value = e.target.value;
    }



    handleSubmit(e) {
        e.preventDefault();
    }

    checkDisabled = () => {
        if ( this.props.editingItemStore.editingBp.model === '' ||
            this.props.editingItemStore.editingBp.form_factor === '' ||
            this.props.editingItemStore.editingBp.connector_type_for_motherboard === '' ||
            this.props.editingItemStore.editingBp.pfc === '' ||
            this.props.editingItemStore.editingBp.cooling_system === '' ||
            this.props.editingItemStore.editingBp.power === '' ||
            this.props.editingItemStore.editingBp.value === '' ||
            this.props.editingItemStore.editingBp.model.length > 45 ||
            this.props.editingItemStore.editingBp.form_factor.length > 45 ||
            this.props.editingItemStore.editingBp.connector_type_for_motherboard.length > 45 ||
            this.props.editingItemStore.editingBp.pfc.length > 45 ||
            this.props.editingItemStore.editingBp.cooling_system.length > 45 ||
            this.props.editingItemStore.editingBp.power.length > 45 ||
            this.props.editingItemStore.editingBp.value.length > 11
        ) {
            return true;
        }

        return false;
    };


    render() {

        var {sendToServer, deleteItem} = this.props.bpStore;
        var {editingBp, setEditingBp, uploadFile} = this.props.editingItemStore;

        if (isNaN(editingBp.id)) {
            return (
                <div className="sidebar">
                    <div className="sidebar__body">
                        <div className="not_chosen">Не выбрано</div>
                    </div>
                    <div className="sidebar__button" onClick={() => {
                        setEditingBp({
                            id: 0,
                            model: '',
                            form_factor: '',
                            connector_type_for_motherboard: '',
                            pfc: '',
                            cooling_system: '',
                            power: '',
                            image: '',
                            value: ''
                        })
                    }}>
                        Создать
                    </div>
                </div>
            );
        }

        return (
            <div className="sidebar">

                <div  className="sidebar__image">
                    <input ref={input => this.input = input} className="hide" type="file" onChange={(e) => {
                        uploadFile(e, editingBp); this.input.value = "";
                    }} accept=".jpg, .jpeg, .png"/>  <button className="sidebar_image" onClick={this.onInputClick}> <img alt="Блок питания" align="bottom" src={`http://api.timurn1w.beget.tech/images/${editingBp.image}.png`}/></button>
                </div>

                <div className="sidebar__body">
                    <div className="namecharacteristics">Модель:</div> <div className="space"></div>
                    <div className='characteristics'><input
                        key={editingBp.id}
                        value={editingBp.model}
                        onChange={this.onModelChange}
                    /></div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Форм-фактор:</div> <div className="space"></div>
                    <div className='characteristics'><input
                        key={editingBp.id}
                        value={editingBp.form_factor}
                        onChange={this.onForm_factorChange}
                    /></div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Разъем для материнской платы:</div> <div className="space"></div>
                    <div className='characteristics'><input
                        key={editingBp.id}
                        value={editingBp.connector_type_for_motherboard}
                        onChange={this.onConnector_type_for_motherboardChange}
                    /></div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">PFC:</div> <div className="space"></div>
                    <div className='characteristics'><input
                        key={editingBp.id}
                        value={editingBp.pfc}
                        onChange={this.onPfcChange}
                    /></div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Система охлаждения:</div> <div className="space"></div>
                    <div className='characteristics'><input
                        key={editingBp.id}
                        value={editingBp.cooling_system}
                        onChange={this.onCooling_systemChange}
                    /></div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Мощность:</div> <div className="space"></div>
                    <div className='characteristics'><input
                        key={editingBp.id}
                        value={editingBp.power}
                        onChange={this.onPowerChange}
                    /></div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Цена:</div> <div className="space"></div>
                    <div className='characteristics'><input
                        key={editingBp.id}
                        value={editingBp.value}
                        type='number'
                        onChange={this.onValueChange}
                    /></div>
                </div>
                <div className="edit_buttons">
                    <div className="sidebar__button" onClick={() => {
                        setEditingBp({
                            id: 0,
                            model: '',
                            form_factor: '',
                            connector_type_for_motherboard: '',
                            pfc: '',
                            cooling_system: '',
                            power: '',
                            value: '',
                            image: ''
                        })
                    }}>
                        Создать
                    </div>
                {
                    (editingBp.id || editingBp.id === 0) ?
                        <button disabled={this.checkDisabled()} className="sidebar__button" onClick={() => {
                            sendToServer({
                                id: editingBp.id,
                                model: this.props.editingItemStore.editingBp.model,
                                form_factor: this.props.editingItemStore.editingBp.form_factor,
                                connector_type_for_motherboard: this.props.editingItemStore.editingBp.connector_type_for_motherboard,
                                pfc: this.props.editingItemStore.editingBp.pfc,
                                cooling_system: this.props.editingItemStore.editingBp.cooling_system,
                                power: this.props.editingItemStore.editingBp.power,
                                value: this.props.editingItemStore.editingBp.value,
                                image: editingBp.image
                            })
                            setEditingBp({
                                id: 0,
                                model: '',
                                form_factor: '',
                                connector_type_for_motherboard: '',
                                pfc: '',
                                cooling_system: '',
                                power: '',
                                image: '',
                                value: ''
                            })
                        }}>
                            Сохранить изменения
                        </button> : null
                }
                {
                    editingBp.id ?
                        <div className="sidebar__button" onClick={() => {
                            deleteItem(editingBp)
                            setEditingBp({
                                id: 0,
                                model: '',
                                form_factor: '',
                                connector_type_for_motherboard: '',
                                pfc: '',
                                cooling_system: '',
                                power: '',
                                image: '',
                                value: ''
                            })
                        }}>
                            Удалить
                        </div> : null
                }



                    </div>
            </div>
        );
    }
}))