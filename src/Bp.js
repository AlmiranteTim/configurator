import React, { Component } from 'react';
import { observer, inject } from "mobx-react";

class Bp extends Component {

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
                                <BpList />
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

export default inject('bpStore')(observer(Bp));


const Loader = (props) => (
    <div>LOADING...</div>
)

const BpList = inject('bpStore', 'selectedItemsStore')(observer(props => (
    <div >

        <div className="position">
            <i id="SortValueArrows" className="fa fa-sort" aria-hidden="true" onClick={props.bpStore.sortList ? props.bpStore.uploadSortUpListFromServer : props.bpStore.uploadSortDownListFromServer}></i>
        </div>
        {
            props.bpStore.list.map(item => (
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
        this.props.selectedItemsStore.setSelectedBp(this.props.item)
    }

    render() {
        return (
            <div onClick={this.onItemClick}
                 className={`item ${this.props.selectedItemsStore.selectedBp.id === this.props.item.id ? 'active' : ''}`}
            >
                <img  alt="Блок питания" align="bottom" src={`http://api.timurn1w.beget.tech/images/${this.props.item.image}.png`} />
                <div className="item__name">{this.props.item.model}</div>
                <div className="item__value">{this.props.item.value} руб.</div>
            </div>
        )
    }
}))

const Sidebar = inject('selectedItemsStore')(observer(props => {

    if (props.selectedItemsStore.selectedBp.id) {
        return (
            <div className="sidebar">
                <div className="sidebar__body">
                    <div className="namecharacteristics">Модель</div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedBp.model}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Форм-фактор: </div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedBp.form_factor}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Тип разъема для материнской платы: </div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedBp.connector_type_for_motherboard}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">PFC: </div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedBp.pfc}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Система охлаждения: </div> <div className="space"></div>
                        <div className='characteristics'>{props.selectedItemsStore.selectedBp.cooling_system}</div>
                    </div>
                    <div className="sidebar__body">
                        <div className="namecharacteristics">Мощность: </div> <div className="space"></div>
                        <div className='characteristics'>{props.selectedItemsStore.selectedBp.power}</div>
                    </div>
                    <div className="sidebar__body">
                        <div className="namecharacteristics">Цена</div> <div className="space"></div>
                        <div className='characteristics'>{props.selectedItemsStore.selectedBp.value} руб.</div>
                    </div>

                    <div className="sidebar__button" onClick={props.selectedItemsStore.addBp}>
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
