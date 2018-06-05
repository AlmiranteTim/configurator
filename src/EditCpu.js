import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';



class EditCpu extends Component {



    componentWillMount() {
        this.props.cpuStore.uploadListFromServer();

    }

    render() {
        return (
            <div className="body">
                <div className="content">
                    <div className="content__body">
                        {
                            this.props.cpuStore.uploaded ?
                                <CpuList/>
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

export default inject( 'cpuStore')(observer(EditCpu));


const Loader = (props) => (
    <div>LOADING...</div>
)

const CpuList = inject('cpuStore', 'editingItemStore', 'selectedItemsStore')(observer(props => (
    <div>
        {
            props.cpuStore.list.map((item, index) => (
                <ListItem key={item.id} item={item}/> //передача каждого cpu в listitem
            ))
        }

    </div>
)))

const ListItem = inject('editingItemStore' ,'selectedItemsStore')(observer(class ListItem extends Component {

    onItemClick = () => {
        this.props.editingItemStore.setEditingCpu(this.props.item);//элемент массива с 39 строки
    }

    render() {
        return (
            <div
                onClick={this.onItemClick }
                className={`item ${this.props.editingItemStore.editingCpu.id === this.props.item.id ? 'active' : ''}`}
            >
                <img alt="Процессор" align="bottom" src={`http://api.timurn1w.beget.tech/images/${this.props.item.image}.png`}/>
                <div className="item__name">{this.props.item.model}</div>
                <div className="item__value">{this.props.item.value} руб.</div>
            </div>
        )
    }
}))

const Sidebar = inject('cpuStore', 'editingItemStore' , 'selectedItemsStore')(observer(class Sidebar extends Component {
    onInputClick = e => {
        this.input.click();
    };
    constructor(props) {
        super(props);

        this.onModelChange = this.onModelChange.bind(this);
        this.onSocketChange = this.onSocketChange.bind(this);
        this.onСpu_frequencyChange = this.onСpu_frequencyChange.bind(this);
        this.onNumber_of_CoresChange = this.onNumber_of_CoresChange.bind(this);
        this.onCacheChange = this.onCacheChange.bind(this);
        this.onProcess_technologyChange = this.onProcess_technologyChange.bind(this);
        this.onHeat_DissipationChange = this.onHeat_DissipationChange.bind(this);
        this.onValueChange = this.onValueChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    onModelChange(e) {
        this.props.editingItemStore.editingCpu.model = e.target.value;
    }
    onSocketChange(e) {
        this.props.editingItemStore.editingCpu.socket = e.target.value;
    }

    onСpu_frequencyChange(e) {
        this.props.editingItemStore.editingCpu.cpu_frequency = e.target.value;
    }
    onNumber_of_CoresChange(e) {
        this.props.editingItemStore.editingCpu.number_of_Cores = e.target.value;
    }
    onCacheChange(e) {
        this.props.editingItemStore.editingCpu.cache = e.target.value;
    }
    onProcess_technologyChange(e) {
        this.props.editingItemStore.editingCpu.process_technology = e.target.value;
    }
    onHeat_DissipationChange(e) {
        this.props.editingItemStore.editingCpu.heat_Dissipation = e.target.value;
    }
    onValueChange(e) {
        this.props.editingItemStore.editingCpu.value = e.target.value;
    }


    handleSubmit(e) {
        e.preventDefault();
    }

    checkDisabled = () => {
        if (this.props.editingItemStore.editingCpu.model === '' ||
            this.props.editingItemStore.editingCpu.socket === '' ||
            this.props.editingItemStore.editingCpu.cpu_frequency === '' ||
            this.props.editingItemStore.editingCpu.number_of_Cores === '' ||
            this.props.editingItemStore.editingCpu.cache === '' ||
            this.props.editingItemStore.editingCpu.process_technology === '' ||
            this.props.editingItemStore.editingCpu.heat_Dissipation === '' ||
            this.props.editingItemStore.editingCpu.value === '' ||
            this.props.editingItemStore.editingCpu.model.length > 150 ||
            this.props.editingItemStore.editingCpu.socket.length > 45 ||
            this.props.editingItemStore.editingCpu.cpu_frequency.length > 45 ||
            this.props.editingItemStore.editingCpu.number_of_Cores.length > 45 ||
            this.props.editingItemStore.editingCpu.cache.length > 45 ||
            this.props.editingItemStore.editingCpu.process_technology.length > 45 ||
            this.props.editingItemStore.editingCpu.heat_Dissipation.length > 45 ||
            this.props.editingItemStore.editingCpu.value.length > 11) {
            return true;
        }

        return false;
    };

    render() {
        var {sendToServer, deleteItem } = this.props.cpuStore;
        var {editingCpu, setEditingCpu, uploadFile } = this.props.editingItemStore;

        if (isNaN(editingCpu.id)) {
            return (
                <div className="sidebar">
                    <div className="sidebar__body">
                        <div className="not_chosen">Не выбрано</div>
                    </div>
                    <div className="sidebar__button" onClick={() => {
                        setEditingCpu({
                            id: 0,
                            model: '',
                            socket: '',
                            cpu_frequency: '',
                            number_of_Cores: '',
                            cache: '',
                            process_technology: '',
                            heat_Dissipation: '',
                            image: '',
                            value: '',
                        });
                        this.setState({modelValid: false});
                        this.setState({socketValid: false});
                    }}>
                        Создать
                    </div>
                </div>
            );
        }

        return (

            <form onSubmit={this.handleSubmit}   className="sidebar">
                <div  className="sidebar__image">
                    <input ref={input => this.input = input} className="hide" type="file" onChange={(e) => {
                    uploadFile(e, editingCpu); this.input.value = "";}}
                           accept=".jpg, .jpeg, .png"/>  <button className="sidebar_image" onClick={this.onInputClick}> <img alt="Процессор" align="bottom" src={`http://api.timurn1w.beget.tech/images/${editingCpu.image}.png`}/></button>
                </div>

                <div className="sidebar__body">
                    <div className="namecharacteristics">Модель:</div> <div className="space"></div>
                    <div className='characteristics'

                    ><input id="userName"
                        key={editingCpu.id}
                            value={editingCpu.model}
                            onChange={this.onModelChange}
                    /></div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Сокет:</div> <div className="space"></div>
                    <div className='characteristics'><input
                        key={editingCpu.id}
                        onChange={this.onSocketChange}
                        value={editingCpu.socket}
                    /></div>
                </div>

                <div className="sidebar__body">
                    <div className="namecharacteristics">Частота процессора:</div> <div className="space"></div>
                    <div className='characteristics'><input
                        key={editingCpu.id}
                        onChange={this.onСpu_frequencyChange}
                        value={editingCpu.cpu_frequency}
                    /></div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Количество ядер:</div> <div className="space"></div>
                    <div className='characteristics'><input
                        key={editingCpu.id}
                        onChange={this.onNumber_of_CoresChange}
                        value={editingCpu.number_of_Cores}
                    /></div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Кэш:</div> <div className="space"></div>
                    <div className='characteristics'><input
                        key={editingCpu.id}
                        onChange={this.onCacheChange}
                        value={editingCpu.cache}
                    /></div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Техпроцесс:</div> <div className="space"></div>
                    <div className='characteristics'><input
                        key={editingCpu.id}
                        onChange={this.onProcess_technologyChange}
                        value={editingCpu.process_technology}
                    /></div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Тепловыделение:</div> <div className="space"></div>
                    <div className='characteristics'><input
                        key={editingCpu.id}
                        onChange={this.onHeat_DissipationChange}
                        value={editingCpu.heat_Dissipation}
                    /></div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Цена:</div> <div className="space"></div>
                    <div className='characteristics'><input
                        key={editingCpu.id}
                        onChange={this.onValueChange}
                        type='number'
                        value={editingCpu.value}
                    /></div>
                </div>

                <div className="edit_buttons">
                    <div className="sidebar__button" onClick={() => {
                        setEditingCpu({
                            id: 0,
                            model: '',
                            socket: '',
                            cpu_frequency: '',
                            number_of_Cores: '',
                            cache: '',
                            process_technology: '',
                            heat_Dissipation: '',
                            value: '',
                            image: '',
                        });
                    }}>
                        Создать
                    </div>
                {
                    (editingCpu.id || editingCpu.id === 0) ?
                        <button disabled={this.checkDisabled()} className={`sidebar__button`}
                        onClick={() =>
                        {
                            sendToServer({
                                id: editingCpu.id,
                                model: this.props.editingItemStore.editingCpu.model,
                                socket: this.props.editingItemStore.editingCpu.socket,
                                cpu_frequency: this.props.editingItemStore.editingCpu.cpu_frequency,
                                number_of_Cores: this.props.editingItemStore.editingCpu.number_of_Cores,
                                cache: this.props.editingItemStore.editingCpu.cache,
                                process_technology: this.props.editingItemStore.editingCpu.process_technology,
                                heat_Dissipation: this.props.editingItemStore.editingCpu.heat_Dissipation,
                                value: this.props.editingItemStore.editingCpu.value,
                                image: editingCpu.image,
                            });
                            setEditingCpu({
                                id: 0,
                                model: '',
                                socket: '',
                                cpu_frequency: '',
                                number_of_Cores: '',
                                cache: '',
                                process_technology: '',
                                heat_Dissipation: '',
                                value: '',
                                image: '',
                            })

                        }}>
                            Сохранить изменения
                        </button> : null
                }

                {
                    editingCpu.id ?
                        <div className="sidebar__button" onClick={() => {
                            deleteItem(editingCpu)
                            setEditingCpu({
                                id: 0,
                                model: '',
                                socket: '',
                                cpu_frequency: '',
                                number_of_Cores: '',
                                cache: '',
                                process_technology: '',
                                heat_Dissipation: '',
                                value: '',
                                image: '',
                            })
                        }}>
                            Удалить
                        </div> : null
                }
                   </div>
            </form>
        );
    }
}))
