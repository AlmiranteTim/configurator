import React, {Component} from 'react';
import {observer, inject} from "mobx-react";

class Cpu extends Component {

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

export default inject('cpuStore')(observer(Cpu));


const Loader = (props) => (
    <div>LOADING...</div>
)

const CpuList = inject('cpuStore', 'selectedItemsStore')(observer(props => (
    <div>
        <div className="position">
            <i id="SortValueArrows" className="fa fa-sort" aria-hidden="true" onClick={props.cpuStore.sortList ? props.cpuStore.uploadSortUpListFromServer : props.cpuStore.uploadSortDownListFromServer}></i>
        </div>
        {
            props.cpuStore.list.map(item => (
                <ListItem key={item.id} item={item}/>
            ))
        }


    </div>
)))

const ListItem = inject('selectedItemsStore')(observer(class ListItem extends Component {

    onItemClick = () => {
        this.props.selectedItemsStore.setSelectedCpu(this.props.item)
    }

    render() {
        return (
            <div onClick={this.onItemClick}
                 className={`item ${this.props.selectedItemsStore.selectedCpu.id === this.props.item.id ? 'active' : ''}`}
            >
                <img alt="Процессор" align="bottom" src={`http://api.timurn1w.beget.tech/images/${this.props.item.image}.png`}/>
                <div className="item__name">{this.props.item.model}</div>
                <div className="item__value">{this.props.item.value} руб.</div>
            </div>
        )
    }
}))

const Sidebar = inject('selectedItemsStore', 'editingItemStore')(observer(props => {

    if (props.selectedItemsStore.selectedCpu.id) {
        return (
            <div className="sidebar">
                <div className="sidebar__body">
                    <div className="namecharacteristics">Модель:</div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedCpu.model}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Сокет:</div><div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedCpu.socket}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Частота процессора:</div><div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedCpu.cpu_frequency}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Количество ядер:</div><div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedCpu.number_of_Cores}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Кэш:</div><div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedCpu.cache}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Техпроцесс:</div><div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedCpu.process_technology}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Тепловыделение:</div><div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedCpu.heat_Dissipation}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Цена:</div><div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedCpu.value} руб.</div>
                </div>

                <div className="sidebar__button" onClick={props.selectedItemsStore.addCpu}>
                    Добавить
                </div>

            </div>
        );
    }

    return (
        <div className="sidebar">
            <div className="not_chosen">
                <div>Не выбрано</div>
            </div>
        </div>
    );
}))
