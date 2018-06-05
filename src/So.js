import React, { Component } from 'react';
import { observer, inject } from "mobx-react";

class So extends Component {

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

export default inject('soStore')(observer(So));


const Loader = (props) => (
    <div>LOADING...</div>
)

const SoList = inject('soStore', 'selectedItemsStore')(observer(props => (
    <div >
        <div className="position">
            <i id="SortValueArrows" className="fa fa-sort" aria-hidden="true" onClick={props.soStore.sortList ? props.soStore.uploadSortUpListFromServer : props.soStore.uploadSortDownListFromServer}></i>
        </div>
        {
            props.soStore.list.map(item => (
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
        this.props.selectedItemsStore.setSelectedSo(this.props.item)
    }



    render() {
        return (
            <div onClick={this.onItemClick}
                 className={`item ${this.props.selectedItemsStore.selectedSo.id === this.props.item.id ? 'active' : ''}`}
            >
                <img alt="Система охлаждения" align="bottom" src={`http://api.timurn1w.beget.tech/images/${this.props.item.image}.png`}/>
                <div className="item__name">{this.props.item.model}</div>
                <div className="item__value">{this.props.item.value} руб.</div>
            </div>
        )
    }
}))

const Sidebar = inject('selectedItemsStore')(observer(props => {

    if (props.selectedItemsStore.selectedSo.id) {
        return (
            <div className="sidebar">


                <div className="sidebar__body">
                    <div className="namecharacteristics">Модель:</div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedSo.model}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Сокет: </div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedSo.socket}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Рассеиваемая мощность: </div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedSo.power_dissipation}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Воздушный поток: </div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedSo.air_flow}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Уровень шума: </div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedSo.noise_level}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Тип коннектора: </div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedSo.connector_type}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Цена:</div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedSo.value} руб.</div>
                </div>

                <div className="sidebar__button" onClick={props.selectedItemsStore.addSo}>
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
