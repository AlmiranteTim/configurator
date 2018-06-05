import React, { Component } from 'react';
import { observer, inject } from "mobx-react";

class Ram extends Component {

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
                                <RamList />
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

export default inject('ramStore')(observer(Ram));


const Loader = (props) => (
    <div>LOADING...</div>
)

const RamList = inject('ramStore', 'selectedItemsStore')(observer(props => (
    <div >
        <div className="position">
            <i id="SortValueArrows" className="fa fa-sort" aria-hidden="true" onClick={props.ramStore.sortList ? props.ramStore.uploadSortUpListFromServer : props.ramStore.uploadSortDownListFromServer}></i>
        </div>
        {
            props.ramStore.list.map(item => (
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
        this.props.selectedItemsStore.setSelectedRam(this.props.item)
    }

    render() {
        return (
            <div onClick={this.onItemClick}
                 className={`item ${this.props.selectedItemsStore.selectedRam.id === this.props.item.id ? 'active' : ''}`}
            >
                <img alt="Оперативная память" align="bottom" src={`http://api.timurn1w.beget.tech/images/${this.props.item.image}.png`} />
                <div className="item__name">{this.props.item.model}</div>
                <div className="item__value">{this.props.item.value} руб.</div>
            </div>
        )
    }
}))

const Sidebar = inject('selectedItemsStore')(observer(props => {

    if (props.selectedItemsStore.selectedRam.id) {
        return (
            <div className="sidebar">


                <div className="sidebar__body">
                    <div className="namecharacteristics">Модель:</div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedRam.model}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Тип памяти:</div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedRam.memory_type}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Объем:</div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedRam.volume}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Форм фактор:</div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedRam.form_factor}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Частота:</div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedRam.frequency}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Пропускная способность:</div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedRam.throughput}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Цена:</div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedRam.value} руб.</div>
                </div>

                <div className="sidebar__button" onClick={props.selectedItemsStore.addRam}>
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
