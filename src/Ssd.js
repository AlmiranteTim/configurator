import React, { Component } from 'react';
import { observer, inject } from "mobx-react";

class Ssd extends Component {

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

export default inject('ssdStore')(observer(Ssd));


const Loader = (props) => (
    <div>LOADING...</div>
)

const SsdList = inject('ssdStore', 'selectedItemsStore')(observer(props => (
    <div >
        <div className="position">
            <i id="SortValueArrows" className="fa fa-sort" aria-hidden="true" onClick={props.ssdStore.sortList ? props.ssdStore.uploadSortUpListFromServer : props.ssdStore.uploadSortDownListFromServer}></i>
        </div>
        {
            props.ssdStore.list.map(item => (
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
        this.props.selectedItemsStore.setSelectedSsd(this.props.item)
    }

    render() {
        return (
            <div onClick={this.onItemClick}
                 className={`item ${this.props.selectedItemsStore.selectedSsd.id === this.props.item.id ? 'active' : ''}`}
            >
                <img alt="SSD" align="bottom" src={`http://api.timurn1w.beget.tech/images/${this.props.item.image}.png`} />
                <div className="item__name">{this.props.item.model}</div>
                <div className="item__value">{this.props.item.value} руб.</div>
            </div>
        )
    }
}))

const Sidebar = inject('selectedItemsStore')(observer(props => {

    if (props.selectedItemsStore.selectedSsd.id) {
        return (
            <div className="sidebar">


                <div className="sidebar__body">
                    <div className="namecharacteristics">Модель: </div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedSsd.model}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Тип: </div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedSsd.type}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Объем: </div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedSsd.volume}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Скорость записи/чтения: </div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedSsd.recording_speed_reading_speed}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Форм фактор: </div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedSsd.form_factor}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Интерфейс: </div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedSsd.interface}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Цена:</div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedSsd.value} руб.</div>
                </div>

                <div className="sidebar__button" onClick={props.selectedItemsStore.addSsd}>
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
