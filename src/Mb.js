import React, { Component } from 'react';
import { observer, inject } from "mobx-react";

class Mb extends Component {

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

export default inject('mbStore')(observer(Mb));


const Loader = (props) => (
    <div>LOADING...</div>
)

const MbList = inject('mbStore', 'selectedItemsStore')(observer(props => (
    <div >
        <div className="position">
            <i id="SortValueArrows" className="fa fa-sort" aria-hidden="true" onClick={props.mbStore.sortList ? props.mbStore.uploadSortUpListFromServer : props.mbStore.uploadSortDownListFromServer}></i>
        </div>
        {
            props.mbStore.list.map(item => (
                <ListItem
                    key={item.id}
                    item={item}
                />
            ))
        }
    </div>
)))

const ListItem = inject('selectedItemsStore')(observer(class ListItem extends Component {

    onItemClick = () => {
        this.props.selectedItemsStore.setSelectedMb(this.props.item)
    }

    render() {
        return (
            <div onClick={this.onItemClick}
                 className={`item ${this.props.selectedItemsStore.selectedMb.id === this.props.item.id ? 'active' : ''}`}
            >
                <img alt="Материнская плата" align="bottom"  src={`http://api.timurn1w.beget.tech/images/${this.props.item.image}.png`} />
                <div className="item__name">{this.props.item.model}</div>
                <div className="item__value">{this.props.item.value} руб.</div>
            </div>
        )
    }
}))

const Sidebar = inject('selectedItemsStore')(observer(props => {

    if (props.selectedItemsStore.selectedMb.id) {
        return (
            <div className="sidebar">


                <div className="sidebar__body">
                    <div className="namecharacteristics">Модель: </div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedMb.model}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Сокет: </div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedMb.socket}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Чипсет: </div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedMb.chipset}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Поддерживаемая память: </div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedMb.supported_memory}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Количество слотов памяти: </div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedMb.number_of_memory_slots}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Порты SATA: </div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedMb.type_and_number_of_SATA_ports}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Основной разъем питания: </div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedMb.main_power_connector}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Разъем питания процессора: </div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedMb.cpu_Power_Connector}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Форм-фактор: </div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedMb.form_factor}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Цена:</div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedMb.value} руб.</div>
                </div>

                <div className="sidebar__button" onClick={props.selectedItemsStore.addMb}>
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