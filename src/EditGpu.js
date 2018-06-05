import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

class EditGpu extends Component {

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

export default inject('gpuStore')(observer(EditGpu));


const Loader = (props) => (
  <div>LOADING...</div>
)

const GpuList = inject('gpuStore', 'editingItemStore')(observer(props => (
  <div >
    {
      props.gpuStore.list.map((item, index) => (
        <ListItem key={item.id} item={item} />
      ))
    }
  </div>
)))

const ListItem = inject('editingItemStore')(observer(class ListItem extends Component {

  onItemClick = () => {
    this.props.editingItemStore.setEditingGpu(this.props.item)
  }

  render() {
    return (
      <div 
        onClick={this.onItemClick}
        className={`item ${this.props.editingItemStore.editingGpu.id === this.props.item.id ? 'active' : ''}`}
      >
          <img alt="Видеокарта" align="bottom" src={`http://api.timurn1w.beget.tech/images/${this.props.item.image}.png`} />
        <div className="item__name">{this.props.item.model}</div>
        <div className="item__value">{this.props.item.value} руб.</div>
      </div>
    )
  }
}))

const Sidebar = inject('gpuStore', 'editingItemStore')(observer(class Sidebar extends Component {
    onInputClick = e => {
        this.input.click()
    }

    constructor(props) {
        super(props);

        this.onModelChange = this.onModelChange.bind(this);
        this.onMemoryChange = this.onMemoryChange.bind(this);
        this.onFrequencyChange = this.onFrequencyChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onBitwidth_of_the_video_memory_busChange = this.onBitwidth_of_the_video_memory_busChange.bind(this);
        this.onRecommended_power_supplyChange = this.onRecommended_power_supplyChange.bind(this);
        this.onNumber_of_occupied_slotsChange = this.onNumber_of_occupied_slotsChange.bind(this);
        this.onValueChange = this.onValueChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    onModelChange(e) {
        this.props.editingItemStore.editingGpu.model = e.target.value;
    }
    onMemoryChange(e) {
        this.props.editingItemStore.editingGpu.memory = e.target.value;
    }

    onFrequencyChange(e) {
        this.props.editingItemStore.editingGpu.frequency = e.target.value;
    }
    onTypeChange(e) {
        this.props.editingItemStore.editingGpu.type = e.target.value;
    }
    onBitwidth_of_the_video_memory_busChange(e) {
        this.props.editingItemStore.editingGpu.bitwidth_of_the_video_memory_bus = e.target.value;
    }
    onRecommended_power_supplyChange(e) {
        this.props.editingItemStore.editingGpu.recommended_power_supply = e.target.value;
    }
    onNumber_of_occupied_slotsChange(e) {
        this.props.editingItemStore.editingGpu.number_of_occupied_slots = e.target.value;
    }
    onValueChange(e) {
        this.props.editingItemStore.editingGpu.value = e.target.value;
    }


    handleSubmit(e) {
        e.preventDefault();
    }

    checkDisabled = () => {
        if ( this.props.editingItemStore.editingGpu.model === '' ||
            this.props.editingItemStore.editingGpu.memory === '' ||
            this.props.editingItemStore.editingGpu.frequency === '' ||
            this.props.editingItemStore.editingGpu.type === '' ||
            this.props.editingItemStore.editingGpu.bitwidth_of_the_video_memory_bus === '' ||
            this.props.editingItemStore.editingGpu.recommended_power_supply === '' ||
            this.props.editingItemStore.editingGpu.number_of_occupied_slots === '' ||
            this.props.editingItemStore.editingGpu.value === ''||
            this.props.editingItemStore.editingGpu.model.length > 45 ||
            this.props.editingItemStore.editingGpu.memory.length > 45 ||
            this.props.editingItemStore.editingGpu.frequency.length > 45 ||
            this.props.editingItemStore.editingGpu.type.length > 45 ||
            this.props.editingItemStore.editingGpu.bitwidth_of_the_video_memory_bus.length > 45 ||
            this.props.editingItemStore.editingGpu.recommended_power_supply.length > 45 ||
            this.props.editingItemStore.editingGpu.number_of_occupied_slots.length > 45 ||
            this.props.editingItemStore.editingGpu.value.length > 11 ) {
            return true;
        }

        return false;
    };

  render() {

    var { sendToServer, deleteItem } = this.props.gpuStore;
    var { editingGpu, setEditingGpu, uploadFile} = this.props.editingItemStore;

    if ( isNaN(editingGpu.id) ) {
      return (
        <form onSubmit={this.handleSubmit} className="sidebar">
            <div className="sidebar__body">
                <div className="not_chosen">Не выбрано</div>
            </div>
            <div className="sidebar__button" onClick={ () => { setEditingGpu({
                id: 0,
                model: '',
                memory: '',
                frequency: '',
                type: '',
                bitwidth_of_the_video_memory_bus: '',
                recommended_power_supply: '',
                number_of_occupied_slots: '',
                value: '',
                image: ''}) }}>
             Создать
            </div>
        </form>
      );
    }
    
    return (
      <div className="sidebar">

          <div  className="sidebar__image">
              <input ref={input => this.input = input} className="hide" type="file" onChange={(e) => {
                  uploadFile(e, editingGpu); this.input.value = "";
              }} accept=".jpg, .jpeg, .png"/>  <button className="sidebar_image" onClick={this.onInputClick}> <img alt="Видеокарта" align="bottom" src={`http://api.timurn1w.beget.tech/images/${editingGpu.image}.png`}/></button>
          </div>


          <div className="sidebar__body">
            <div className="namecharacteristics">Модель: </div> <div className="space"></div>
            <div className='characteristics'><input
              key={editingGpu.id}
              value={editingGpu.model}
              onChange={this.onModelChange}
            /></div>
          </div>
            <div className="sidebar__body">
                <div className="namecharacteristics">Видеопамять: </div> <div className="space"></div>
                <div className='characteristics'> <input
                    key={editingGpu.id}
                    value={editingGpu.memory}
                    onChange={this.onMemoryChange}
                /></div>
            </div>
            <div className="sidebar__body">
                <div className="namecharacteristics">Частота: </div> <div className="space"></div>
                <div className='characteristics'> <input
                    key={editingGpu.id}
                    value={editingGpu.frequency}
                    onChange={this.onFrequencyChange}
                /> </div>
            </div>
            <div className="sidebar__body">
                <div className="namecharacteristics">Тип: </div> <div className="space"></div>
                <div className='characteristics'> <input
                    key={editingGpu.id}
                    value={editingGpu.type}
                    onChange={this.onTypeChange}
                /> </div>
            </div>
            <div className="sidebar__body">
                <div className="namecharacteristics">Разрядность шины видеопамяти: </div> <div className="space"></div>
                <div className='characteristics'> <input
                    key={editingGpu.id}
                    value={editingGpu.bitwidth_of_the_video_memory_bus}
                    onChange={this.onBitwidth_of_the_video_memory_busChange}
                /> </div>
            </div>
            <div className="sidebar__body">
                <div className="namecharacteristics">Рекомендуемая мощность питания: </div> <div className="space"></div>
                <div className='characteristics'>  <input
                    key={editingGpu.id}
                    value={editingGpu.recommended_power_supply}
                    onChange={this.onRecommended_power_supplyChange}
                /> </div>
            </div>
            <div className="sidebar__body">
                <div className="namecharacteristics">Количество занимаемых слотов: </div> <div className="space"></div>
                <div className='characteristics'>  <input
                    key={editingGpu.id}
                    value={editingGpu.number_of_occupied_slots}
                    onChange={this.onNumber_of_occupied_slotsChange}
                /> </div>
            </div>
            <div className="sidebar__body">
            <div className="namecharacteristics">Цена: </div> <div className="space"></div>
                <div className='characteristics'> <input
              key={editingGpu.id}
              value={editingGpu.value}
              type='number'
              onChange={this.onValueChange}
            /> </div>
            </div>
          <div className="edit_buttons">
              <div className="sidebar__button" onClick={ () => { setEditingGpu({id: 0, model: '',memory: '',frequency: '',type: '',bitwidth_of_the_video_memory_bus: '',recommended_power_supply: '',number_of_occupied_slots: '',image: '', value: ''}) }}>
                  Создать
              </div>
          {
            (editingGpu.id || editingGpu.id === 0) ?
            <button disabled={this.checkDisabled()} className="sidebar__button"
                    onClick={() => { sendToServer({
                id: editingGpu.id,
                model: this.props.editingItemStore.editingGpu.model,
                memory: this.props.editingItemStore.editingGpu.memory,
                frequency: this.props.editingItemStore.editingGpu.frequency,
                type: this.props.editingItemStore.editingGpu.type,
                bitwidth_of_the_video_memory_bus: this.props.editingItemStore.editingGpu.bitwidth_of_the_video_memory_bus,
                recommended_power_supply: this.props.editingItemStore.editingGpu.recommended_power_supply,
                number_of_occupied_slots: this.props.editingItemStore.editingGpu.number_of_occupied_slots,
                value: this.props.editingItemStore.editingGpu.value,
                image: editingGpu.image})
                        setEditingGpu({
                            id: 0,
                            model: '',
                            memory: '',
                            frequency: '',
                            type: '',
                            bitwidth_of_the_video_memory_bus: '',
                            recommended_power_supply: '',
                            number_of_occupied_slots: '',
                            value: '',
                            image: ''})}}>
                Сохранить изменения
            </button> : null
          }

          {
            editingGpu.id ?
            <div className="sidebar__button" onClick={() => {deleteItem(editingGpu)
                setEditingGpu({
                    id: 0,
                    model: '',
                    memory: '',
                    frequency: '',
                    type: '',
                    bitwidth_of_the_video_memory_bus: '',
                    recommended_power_supply: '',
                    number_of_occupied_slots: '',
                    value: '',
                    image: ''})}}>
              Удалить
            </div> : null
          }


          </div>
      </div>
    );
  }
}))