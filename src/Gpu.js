import React, { Component } from 'react';
import { observer, inject } from "mobx-react";

class Gpu extends Component {

    componentWillMount() {
        this.props.gpuStore.uploadListFromServer();
    }

    render() {
        return (
            <div className="body">
                <div className="content">
                    <div className="content__body">
                        {
                            this.props.gpuStore.uploaded ?
                            <GpuList />
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

export default inject('gpuStore')(observer(Gpu));


const Loader = (props) => (
    <div>LOADING...</div>
)

const GpuList = inject('gpuStore', 'selectedItemsStore')(observer(props => (
    <div >
        <div className="position">
            <i id="SortValueArrows" className="fa fa-sort" aria-hidden="true" onClick={props.gpuStore.sortList ? props.gpuStore.uploadSortUpListFromServer : props.gpuStore.uploadSortDownListFromServer}></i>
        </div>
        {
            props.gpuStore.list.map(item => (
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
        this.props.selectedItemsStore.setSelectedGpu(this.props.item)
    }

    render() {
        return (
            <div onClick={this.onItemClick}
                 className={`item ${this.props.selectedItemsStore.selectedGpu.id === this.props.item.id ? 'active' : ''}`}
            >
                <img alt="Видеокарта" align="bottom"  src={`http://api.timurn1w.beget.tech/images/${this.props.item.image}.png`} />
                <div className="item__name">{this.props.item.model}</div>
                <div className="item__value">{this.props.item.value} руб.</div>
            </div>
        )
    }
}))

const Sidebar = inject('selectedItemsStore')(observer(props => {

    if (props.selectedItemsStore.selectedGpu.id) {
        return (
            <div className="sidebar">
                <div className="sidebar__body">
                    <div className="namecharacteristics">Модель:</div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedGpu.model}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Видеопамять:</div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedGpu.memory}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Частота: </div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedGpu.frequency}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Тип: </div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedGpu.type}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Разрядность шины видеопамяти: </div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedGpu.bitwidth_of_the_video_memory_bus}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Рекомендуемая мощность блока питания: </div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedGpu.recommended_power_supply}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Количество занимаемых слотов: </div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedGpu.number_of_occupied_slots}</div>
                </div>
                <div className="sidebar__body">
                    <div className="namecharacteristics">Цена:</div> <div className="space"></div>
                    <div className='characteristics'>{props.selectedItemsStore.selectedGpu.value} руб.</div>
                </div>

                <div className="sidebar__button" onClick={props.selectedItemsStore.addGpu}>
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
