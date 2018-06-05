import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

class EditMb extends Component {

    componentWillMount() {
        this.props.mbStore.uploadListFromServer();
    }

    render() {
        return (
            <div className="body">
                <div className="content">
                    <div className="content__body">
                        {
                            this.props.mbStore.uploaded ?
                                <MbList />
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

export default inject('mbStore')(observer(EditMb));


const Loader = (props) => (
    <div>LOADING...</div>
)

const MbList = inject('mbStore', 'editingItemStore')(observer(props => (
    <div >
        {
            props.mbStore.list.map((item, index) => (
                <ListItem key={item.id} item={item} />
            ))
        }
    </div>
)))

const ListItem = inject('editingItemStore')(observer(class ListItem extends Component {

    onItemClick = () => {
        this.props.editingItemStore.setEditingMb(this.props.item)
    }

    render() {
        return (
            <div
                onClick={this.onItemClick}
                className={`item ${this.props.editingItemStore.editingMb.id === this.props.item.id ? 'active' : ''}`}
            >
                <img alt="Материнская плата" align="bottom" src={`http://api.timurn1w.beget.tech/images/${this.props.item.image}.png`} />
                <div className="item__name">{this.props.item.model}</div>
                <div className="item__value">{this.props.item.value} руб.</div>
            </div>
        )
    }
}))

const Sidebar = inject('mbStore', 'editingItemStore')(observer(class Sidebar extends Component {
    onInputClick = e => {
        this.input.click()
    }

    constructor(props) {
        super(props);

        this.onModelChange = this.onModelChange.bind(this);
        this.onSocketChange = this.onSocketChange.bind(this);
        this.onChipsetChange = this.onChipsetChange.bind(this);
        this.onSupported_memoryChange = this.onSupported_memoryChange.bind(this);
        this.onNumber_of_memory_slotsChange = this.onNumber_of_memory_slotsChange.bind(this);
        this.onType_and_number_of_SATA_portsChange = this.onType_and_number_of_SATA_portsChange.bind(this);
        this.onMain_power_connectorChange = this.onMain_power_connectorChange.bind(this);
        this.onCpu_Power_ConnectorChange = this.onCpu_Power_ConnectorChange.bind(this);
        this.onForm_factorChange = this.onForm_factorChange.bind(this);
        this.onValueChange = this.onValueChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    onModelChange(e) {
        this.props.editingItemStore.editingMb.model = e.target.value;
    }
    onSocketChange(e) {
        this.props.editingItemStore.editingMb.socket = e.target.value;
    }
    onChipsetChange(e) {
        this.props.editingItemStore.editingMb.chipset = e.target.value;
    }
    onSupported_memoryChange(e) {
        this.props.editingItemStore.editingMb.supported_memory = e.target.value;
    }
    onNumber_of_memory_slotsChange(e) {
        this.props.editingItemStore.editingMb.number_of_memory_slots = e.target.value;
    }
    onType_and_number_of_SATA_portsChange(e) {
        this.props.editingItemStore.editingMb.type_and_number_of_SATA_ports = e.target.value;
    }
    onMain_power_connectorChange(e) {
        this.props.editingItemStore.editingMb.main_power_connector = e.target.value;
    }
    onCpu_Power_ConnectorChange(e) {
        this.props.editingItemStore.editingMb.cpu_Power_Connector = e.target.value;
    }
    onForm_factorChange(e) {
        this.props.editingItemStore.editingMb.form_factor = e.target.value;
    }
    onValueChange(e) {
        this.props.editingItemStore.editingMb.value = e.target.value;
    }



    handleSubmit(e) {
        e.preventDefault();
    }

    checkDisabled = () => {
        if ( this.props.editingItemStore.editingMb.model === '' ||
            this.props.editingItemStore.editingMb.socket === '' ||
            this.props.editingItemStore.editingMb.chipset === '' ||
            this.props.editingItemStore.editingMb.supported_memory === '' ||
            this.props.editingItemStore.editingMb.number_of_memory_slots === '' ||
            this.props.editingItemStore.editingMb.type_and_number_of_SATA_ports === '' ||
            this.props.editingItemStore.editingMb.main_power_connector === '' ||
            this.props.editingItemStore.editingMb.cpu_Power_Connector === '' ||
            this.props.editingItemStore.editingMb.form_factor === '' ||
            this.props.editingItemStore.editingMb.value === ''||
            this.props.editingItemStore.editingMb.model.length > 45 ||
            this.props.editingItemStore.editingMb.socket.length > 45 ||
            this.props.editingItemStore.editingMb.chipset.length > 45 ||
            this.props.editingItemStore.editingMb.supported_memory.length > 45 ||
            this.props.editingItemStore.editingMb.number_of_memory_slots.length > 45 ||
            this.props.editingItemStore.editingMb.type_and_number_of_SATA_ports.length > 45 ||
            this.props.editingItemStore.editingMb.main_power_connector.length > 45 ||
            this.props.editingItemStore.editingMb.cpu_Power_Connector.length > 45 ||
            this.props.editingItemStore.editingMb.form_factor.length > 45 ||
            this.props.editingItemStore.editingMb.value.length > 11
        ) {
            return true;
        }

        return false;
    };
    render() {

        var { sendToServer, deleteItem } = this.props.mbStore;
        var { editingMb, setEditingMb,uploadFile } = this.props.editingItemStore;

        if ( isNaN(editingMb.id) ) {
            return (
                <div className="sidebar">
                    <div className="sidebar__body">
                        <div className="not_chosen">Не выбрано</div>
                    </div>
                    <div className="sidebar__button" onClick={ () => { setEditingMb({
                        id: 0,
                        model: '',
                        socket: '',
                        chipset: '',
                        supported_memory: '',
                        number_of_memory_slots: '',
                        type_and_number_of_SATA_ports: '',
                        main_power_connector: '',
                        cpu_Power_Connector: '',
                        form_factor: '',
                        value: '',
                        image: ''
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
                        uploadFile(e, editingMb);this.input.value = "";
                    }} accept=".jpg, .jpeg, .png"/>  <button className="sidebar_image" onClick={this.onInputClick}> <img alt="Материнская плата" align="bottom" src={`http://api.timurn1w.beget.tech/images/${editingMb.image}.png`}/></button>
                </div>

                    <div className="sidebar__body">
                        <div className="namecharacteristics">Модель: </div> <div className="space"></div>
                        <div className='characteristics'>   <input
                            key={editingMb.id}
                            value={editingMb.model}
                            onChange={this.onModelChange}
                        /></div>
                    </div>
                    <div className="sidebar__body">
                        <div className="namecharacteristics">Сокет: </div> <div className="space"></div>
                        <div className='characteristics'>    <input
                            key={editingMb.id}
                            value={editingMb.socket}
                            onChange={this.onSocketChange}
                        /></div>
                    </div>
                    <div className="sidebar__body">
                        <div className="namecharacteristics">Чипсет: </div> <div className="space"></div>
                        <div className='characteristics'>   <input
                            key={editingMb.id}
                            value={editingMb.chipset}
                            onChange={this.onChipsetChange}
                        /></div>
                    </div>
                    <div className="sidebar__body">
                        <div className="namecharacteristics">Поддерживаемая память: </div> <div className="space"></div>
                        <div className='characteristics'>    <input
                            key={editingMb.id}
                            value={editingMb.supported_memory}
                            onChange={this.onSupported_memoryChange}
                        /></div>
                    </div>
                    <div className="sidebar__body">
                        <div className="namecharacteristics">Количество слотов памяти: </div> <div className="space"></div>
                        <div className='characteristics'>   <input
                            key={editingMb.id}
                            value={editingMb.number_of_memory_slots}
                            onChange={this.onNumber_of_memory_slotsChange}
                        /></div>
                    </div>
                    <div className="sidebar__body">
                        <div className="namecharacteristics">Тип и количество портов SATA: </div> <div className="space"></div>
                        <div className='characteristics'>    <input
                            key={editingMb.id}
                            value={editingMb.type_and_number_of_SATA_ports}
                            onChange={this.onType_and_number_of_SATA_portsChange}
                        /></div>
                    </div>
                    <div className="sidebar__body">
                        <div className="namecharacteristics">Основной разъем питания: </div> <div className="space"></div>
                        <div className='characteristics'>   <input
                            key={editingMb.id}
                            value={editingMb.main_power_connector}
                            onChange={this.onMain_power_connectorChange}
                        /></div>
                    </div>
                    <div className="sidebar__body">
                        <div className="namecharacteristics">Разъем питания процессора: </div> <div className="space"></div>
                        <div className='characteristics'>   <input
                            key={editingMb.id}
                            value={editingMb.cpu_Power_Connector}
                            onChange={this.onCpu_Power_ConnectorChange}
                        /></div>
                    </div>
                    <div className="sidebar__body">
                        <div className="namecharacteristics">Форм-фактор: </div> <div className="space"></div>
                        <div className='characteristics'>   <input
                            key={editingMb.id}
                            value={editingMb.form_factor}
                            onChange={this.onForm_factorChange}
                        /></div>
                    </div>
                    <div className="sidebar__body">
                        <div className="namecharacteristics">Цена: </div> <div className="space"></div>
                        <div className='characteristics'>   <input
                            key={editingMb.id}
                            value={editingMb.value}
                            type='number'
                            onChange={this.onValueChange}
                        /></div>
                    </div>
                <div className="edit_buttons">
                    <div className="sidebar__button"  onClick={ () => { setEditingMb({id: 0,
                        model: '',
                        socket: '',
                        chipset: '',
                        supported_memory: '',
                        number_of_memory_slots: '',
                        type_and_number_of_SATA_ports: '',
                        main_power_connector: '',
                        cpu_Power_Connector: '',
                        form_factor: '',
                        value: '',
                        image: ''
                    }) }}>
                        Создать
                    </div>
                    {
                        (editingMb.id || editingMb.id === 0) ?

                            <button disabled={this.checkDisabled()} className="sidebar__button"  onClick={() => { sendToServer({
                                id: editingMb.id,
                                model: this.props.editingItemStore.editingMb.model,
                                socket: this.props.editingItemStore.editingMb.socket,
                                chipset: this.props.editingItemStore.editingMb.chipset,
                                supported_memory: this.props.editingItemStore.editingMb.supported_memory,
                                number_of_memory_slots: this.props.editingItemStore.editingMb.number_of_memory_slots,
                                type_and_number_of_SATA_ports: this.props.editingItemStore.editingMb.type_and_number_of_SATA_ports,
                                main_power_connector: this.props.editingItemStore.editingMb.main_power_connector,
                                cpu_Power_Connector: this.props.editingItemStore.editingMb.cpu_Power_Connector,
                                form_factor: this.props.editingItemStore.editingMb.form_factor,
                                value: this.props.editingItemStore.editingMb.value,
                                image: editingMb.image})
                                setEditingMb({id: 0,
                                    model: '',
                                    socket: '',
                                    chipset: '',
                                    supported_memory: '',
                                    number_of_memory_slots: '',
                                    type_and_number_of_SATA_ports: '',
                                    main_power_connector: '',
                                    cpu_Power_Connector: '',
                                    form_factor: '',
                                    value: '',
                                    image: ''
                                })}}>
                                Сохранить изменения
                            </button> : null
                    }
                    {
                        editingMb.id ?
                            <div className="sidebar__button"  onClick={() => {deleteItem(editingMb)
                                setEditingMb({id: 0,
                                    model: '',
                                    socket: '',
                                    chipset: '',
                                    supported_memory: '',
                                    number_of_memory_slots: '',
                                    type_and_number_of_SATA_ports: '',
                                    main_power_connector: '',
                                    cpu_Power_Connector: '',
                                    form_factor: '',
                                    value: '',
                                    image: ''
                                })}}>
                                Удалить
                            </div> : null
                    }

                </div>
            </div>

        );
    }
}))