import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';

class EditRam extends Component {

    componentWillMount() {
        this.props.ramStore.uploadListFromServer();
    }

    render() {
        return (
            <div className="body">
                <div className="content">
                    <div className="content__body">
                        {
                            this.props.ramStore.uploaded ?
                                <RamList/>
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

export default inject('ramStore')(observer(EditRam));


const Loader = (props) => (
    <div>LOADING...</div>
)

const RamList = inject('ramStore', 'editingItemStore')(observer(props => (
    <div>
        {
            props.ramStore.list.map((item, index) => (
                <ListItem key={item.id} item={item}/>
            ))
        }
    </div>
)))

const ListItem = inject('editingItemStore')(observer(class ListItem extends Component {

    onItemClick = () => {
        this.props.editingItemStore.setEditingRam(this.props.item)
    }

    render() {
        return (
            <div
                onClick={this.onItemClick}
                className={`item ${this.props.editingItemStore.editingRam.id === this.props.item.id ? 'active' : ''}`}
            >
                <img alt="Оперативная память" align="bottom" src={`http://api.timurn1w.beget.tech/images/${this.props.item.image}.png`} />
                <div className="item__name">{this.props.item.model}</div>
                <div className="item__value">{this.props.item.value} руб.</div>
            </div>
        )
    }
}))

const Sidebar = inject('ramStore', 'editingItemStore')(observer(class Sidebar extends Component {
    onInputClick = e => {
        this.input.click()
    }

    constructor(props) {
        super(props);

        this.onModelChange = this.onModelChange.bind(this);
        this.onMemory_typeChange = this.onMemory_typeChange.bind(this);
        this.onVolumeChange = this.onVolumeChange.bind(this);
        this.onForm_factorChange = this.onForm_factorChange.bind(this);
        this.onFrequencyChange = this.onFrequencyChange.bind(this);
        this.onThroughputChange = this.onThroughputChange.bind(this);
        this.onValueChange = this.onValueChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    onModelChange(e) {
        this.props.editingItemStore.editingRam.model = e.target.value;
    }
    onMemory_typeChange(e) {
        this.props.editingItemStore.editingRam.memory_type = e.target.value;
    }

    onVolumeChange(e) {
        this.props.editingItemStore.editingRam.volume = e.target.value;
    }
    onForm_factorChange(e) {
        this.props.editingItemStore.editingRam.form_factor = e.target.value;
    }
    onFrequencyChange(e) {
        this.props.editingItemStore.editingRam.frequency = e.target.value;
    }
    onThroughputChange(e) {
        this.props.editingItemStore.editingRam.throughput = e.target.value;
    }
    onValueChange(e) {
        this.props.editingItemStore.editingRam.value = e.target.value;
    }



    handleSubmit(e) {
        e.preventDefault();
    }

    checkDisabled = () => {
        if ( this.props.editingItemStore.editingRam.model === '' ||
            this.props.editingItemStore.editingRam.memory_type === '' ||
            this.props.editingItemStore.editingRam.volume === '' ||
            this.props.editingItemStore.editingRam.form_factor === '' ||
            this.props.editingItemStore.editingRam.frequency === '' ||
            this.props.editingItemStore.editingRam.throughput === '' ||
            this.props.editingItemStore.editingRam.value === ''||
            this.props.editingItemStore.editingRam.model.length > 45 ||
            this.props.editingItemStore.editingRam.memory_type.length > 45 ||
            this.props.editingItemStore.editingRam.volume.length > 45 ||
            this.props.editingItemStore.editingRam.form_factor.length > 45 ||
            this.props.editingItemStore.editingRam.frequency.length > 45 ||
            this.props.editingItemStore.editingRam.throughput.length > 45 ||
            this.props.editingItemStore.editingRam.value.length > 11
             ) {
            return true;
        }

        return false;
    };

    render() {

        var {sendToServer, deleteItem} = this.props.ramStore;
        var {editingRam, setEditingRam, uploadFile} = this.props.editingItemStore;

        if (isNaN(editingRam.id)) {
            return (
                <div className="sidebar">
                    <div className="sidebar__body">
                        <div className="not_chosen">Не выбрано</div>
                    </div>
                    <div className="sidebar__button" onClick={() => {
                        setEditingRam({
                            id: 0,
                            model: '',
                            memory_type: '',
                            volume: '',
                            form_factor: '',
                            frequency: '',
                            throughput: '',
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
                        uploadFile(e, editingRam); this.input.value = "";
                    }} accept=".jpg, .jpeg, .png"/>  <button className="sidebar_image" onClick={this.onInputClick}> <img alt="Оперативная память" align="bottom" src={`http://api.timurn1w.beget.tech/images/${editingRam.image}.png`}/></button>
                </div>

                <div className="sidebar__body">
                    <div className="namecharacteristics">Модель</div> <div className="space"></div>
                    <div className='characteristics'><input
                        key={editingRam.id}
                        value={editingRam.model}
                        onChange={this.onModelChange}
                    /></div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Тип памяти:</div> <div className="space"></div>
                    <div className='characteristics'><input
                        key={editingRam.id}
                        value={editingRam.memory_type}
                        onChange={this.onMemory_typeChange}
                    /></div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Объем:</div> <div className="space"></div>
                    <div className='characteristics'><input
                        key={editingRam.id}
                        value={editingRam.volume}
                        onChange={this.onVolumeChange}
                    /></div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Форм фактор:</div> <div className="space"></div>
                    <div className='characteristics'><input
                        key={editingRam.id}
                        value={editingRam.form_factor}
                        onChange={this.onForm_factorChange}
                    /></div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Частота:</div> <div className="space"></div>
                    <div className='characteristics'><input
                        key={editingRam.id}
                        value={editingRam.frequency}
                        onChange={this.onFrequencyChange}
                    /></div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Пропускная способность:</div> <div className="space"></div>
                    <div className='characteristics'><input
                        key={editingRam.id}
                        value={editingRam.throughput}
                        onChange={this.onThroughputChange}
                    /></div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Цена:</div> <div className="space"></div>
                    <div className='characteristics'><input
                        key={editingRam.id}
                        value={editingRam.value}
                        type='number'
                        onChange={this.onValueChange}
                    /></div>
                </div>
                <div className="edit_buttons">
                    <div className="sidebar__button" onClick={() => {
                        setEditingRam({
                            id: 0,
                            model: '',
                            memory_type: '',
                            volume: '',
                            form_factor: '',
                            frequency: '',
                            throughput: '',
                            image: '',
                            value: ''
                        })
                    }}>
                        Создать
                    </div>
                {
                    (editingRam.id || editingRam.id === 0) ?
                        <button disabled={this.checkDisabled()} className="sidebar__button" onClick={() => {
                            sendToServer({
                                id: editingRam.id,
                                model: this.props.editingItemStore.editingRam.model,
                                memory_type: this.props.editingItemStore.editingRam.memory_type,
                                volume: this.props.editingItemStore.editingRam.volume,
                                form_factor: this.props.editingItemStore.editingRam.form_factor,
                                frequency: this.props.editingItemStore.editingRam.frequency,
                                throughput: this.props.editingItemStore.editingRam.throughput,
                                value: this.props.editingItemStore.editingRam.value,
                                image: editingRam.image
                            })
                            setEditingRam({
                                id: 0,
                                model: '',
                                memory_type: '',
                                volume: '',
                                form_factor: '',
                                frequency: '',
                                throughput: '',
                                image: '',
                                value: ''
                            })
                        }}>
                            Сохранить изменения
                        </button> : null
                }
                {
                    editingRam.id ?
                        <div className="sidebar__button" onClick={() => {
                            deleteItem(editingRam)
                            setEditingRam({
                                id: 0,
                                model: '',
                                memory_type: '',
                                volume: '',
                                form_factor: '',
                                frequency: '',
                                throughput: '',
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