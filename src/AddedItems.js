import React from 'react';
import {observer, inject} from "mobx-react";

const AddedItems = props => (
    <div className="content__body">
        <div className="Addedlist">
            <div className="settings">

                <div className="text__value">
                    {
                        (

                            props.selectedItemsStore.compatibilityCpuMb() &&
                            props.selectedItemsStore.compatibilityRamMb &&
                            props.selectedItemsStore.compatibilityCpuSo
                        ) && <i id="cog" className="fa fa-cogs fa-2x" aria-hidden="true">
                            <div className="descr">Проблем совместимости нет.</div>
                        </i>
                    }

                    {
                        (
                            !props.selectedItemsStore.compatibilityCpuMb() ||
                            !props.selectedItemsStore.compatibilityRamMb ||
                            !props.selectedItemsStore.compatibilityCpuSo
                        ) && <i id="cogerror" className="fa fa-cogs fa-2x" aria-hidden="true">
                            <div  className="descr"> <div>Следующие комплектующие не совместимы:</div>
                                {
                                    !props.selectedItemsStore.compatibilityCpuMb() &&
                                    <div className="compatibility">
                                        <div className="red_border">{`${props.selectedItemsStore.addedCpu.model}`}</div>
                                        <div className="red_border">{`${props.selectedItemsStore.addedMb.model}`}</div>
                                    </div>
                                }
                                {
                                    !props.selectedItemsStore.compatibilityRamMb &&
                                    <div className="compatibility">
                                        <div className="red_border">{`${props.selectedItemsStore.addedRam.model}`}</div>
                                        <div className="red_border">{`${props.selectedItemsStore.addedMb.model}`}</div>
                                    </div>

                                }
                                {
                                    !props.selectedItemsStore.compatibilityCpuSo &&
                                    <div className="compatibility">
                                        <div className="red_border">{`${props.selectedItemsStore.addedCpu.model}`}</div>
                                        <div className="red_border">{`${props.selectedItemsStore.addedSo.model}`}</div>
                                    </div>

                                }
                            </div>
                        </i>
                    }

                </div>



                <div className="text__value">
                    {
                        (props.selectedItemsStore.energySum) && <i id="energy" className="fa fa-bolt fa-2x" aria-hidden="true">
                            <div className="descr">Проблемы энергопотребления отсутствуют.</div>
                        </i>
                    }

                    {
                        (!props.selectedItemsStore.energySum) &&
                        <i  id="energyerror" className="fa fa-bolt fa-2x" aria-hidden="true">
                            <div  className="descr"> <div>Недостаточная мощность энергоблока:</div>
                                {
                                    !props.selectedItemsStore.energySum &&
                                    <div className="compatibility">
                                        <div className="red_border">{`${props.selectedItemsStore.addedBp.model}`}</div>

                                    </div>

                                }
                            </div>
                        </i>
                    }
                </div>

                <div id="sum" title="Общая стоимость пк"
                     className="text__value">{props.selectedItemsStore.valueSum} руб.
                </div>
                <div className="text__value"

                    onClick={() => {
                        props.selectedItemsStore.HideCpuButton();
                        props.selectedItemsStore.HideGpuButton();
                        props.selectedItemsStore.HideRamButton();
                        props.selectedItemsStore.HideBpButton();
                        props.selectedItemsStore.HideMbButton();
                        props.selectedItemsStore.HideSoButton();
                        props.selectedItemsStore.HideSsdButton();
                    }}
                >
                    <i title="Сбросить сборку" className="fa fa-times" aria-hidden="true"></i>
                </div>
            </div>
            {
                props.selectedItemsStore.hideCpuButton ?
                    <div onClick={props.selectedItemsStore.HideCpuButton}
                        className={`item_not_chosen ${(!props.selectedItemsStore.compatibilityCpuSo && 'item_chosen_error')  || (!props.selectedItemsStore.compatibilityCpuMb() && 'item_chosen_error' )} `}>
                       <div className="add_items_text">   <div  className="descr1">

                               <div className="item_name">Процессор</div>
                               <div className="sidebar__body">
                                   <div className="namecharacteristics">Модель:</div> <div className="space"></div>
                                   <div className='characteristics'>{props.selectedItemsStore.addedCpu.model}</div>
                               </div>
                               <div className="sidebar__body">
                                   <div className="namecharacteristics">Сокет:</div><div className="space"></div>
                                   <div className='characteristics'>{props.selectedItemsStore.addedCpu.socket}</div>
                               </div>
                               <div className="sidebar__body">
                                   <div className="namecharacteristics">Частота процессора:</div><div className="space"></div>
                                   <div className='characteristics'>{props.selectedItemsStore.addedCpu.cpu_frequency}</div>
                               </div>
                               <div className="sidebar__body">
                                   <div className="namecharacteristics">Количество ядер:</div><div className="space"></div>
                                   <div className='characteristics'>{props.selectedItemsStore.addedCpu.number_of_Cores}</div>
                               </div>
                               <div className="sidebar__body">
                                   <div className="namecharacteristics">Кэш:</div><div className="space"></div>
                                   <div className='characteristics'>{props.selectedItemsStore.addedCpu.cache}</div>
                               </div>
                               <div className="sidebar__body">
                                   <div className="namecharacteristics">Техпроцесс:</div><div className="space"></div>
                                   <div className='characteristics'>{props.selectedItemsStore.addedCpu.process_technology}</div>
                               </div>
                               <div className="sidebar__body">
                                   <div className="namecharacteristics">Тепловыделение:</div><div className="space"></div>
                                   <div className='characteristics'>{props.selectedItemsStore.addedCpu.heat_Dissipation}</div>
                               </div>
                               <div className="sidebar__body">
                                   <div className="namecharacteristics">Цена:</div><div className="space"></div>
                                   <div className='characteristics'>{props.selectedItemsStore.addedCpu.value} руб.</div>
                               </div>

                       </div>
                        <div className="item__name1">{props.selectedItemsStore.addedCpu.model}</div>
                        <div className="item__value1">{props.selectedItemsStore.addedCpu.value} руб.</div>
                        </div>
                    </div>
                    :
                    <div className="item_not_chosen">
                        <div className='item_not_chosen_text'>Процессор</div>
                    </div>
            }

            {
                props.selectedItemsStore.hideGpuButton ?
                    <div onClick={props.selectedItemsStore.HideGpuButton} className="item_not_chosen">
                        <div className="add_items_text"> <div className="descr1">

                                <div className="item_name">Видеокарта</div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Модель:</div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedGpu.model}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Видеопамять:</div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedGpu.memory}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Частота: </div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedGpu.frequency}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Тип: </div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedGpu.type}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Разрядность шины видеопамяти: </div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedGpu.bitwidth_of_the_video_memory_bus}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Рекомендуемая мощность блока питания: </div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedGpu.recommended_power_supply}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Количество занимаемых слотов: </div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedGpu.number_of_occupied_slots}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Цена:</div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedGpu.value} руб.</div>
                                </div>

                        </div>
                        <div className="item__name1">{props.selectedItemsStore.addedGpu.model}</div>
                        <div className="item__value1">{props.selectedItemsStore.addedGpu.value} руб.</div>
                        </div>
                    </div>
                    :
                    <div className="item_not_chosen">
                        <div className='item_not_chosen_text'>Видеокарта</div>
                    </div>
            }
            {
                props.selectedItemsStore.hideRamButton ?

                    <div onClick={props.selectedItemsStore.HideRamButton}
                        className={`item_not_chosen ${!props.selectedItemsStore.compatibilityRamMb && 'item_chosen_error' } `}>
                        <div className="add_items_text"> <div className="descr1">

                                <div className="item_name">Оперативная память</div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Модель:</div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedRam.model}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Тип памяти:</div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedRam.memory_type}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Объем:</div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedRam.volume}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Форм фактор:</div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedRam.form_factor}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Частота:</div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedRam.frequency}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Пропускная способность:</div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedRam.throughput}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Цена:</div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedRam.value} руб.</div>
                                </div>

                        </div>
                        <div className="item__name1">{props.selectedItemsStore.addedRam.model}</div>
                        <div className="item__value1">{props.selectedItemsStore.addedRam.value} руб.
                        </div>
                        </div>
                    </div>

                    :
                    <div className="item_not_chosen">
                        <div className='item_not_chosen_text'>Оперативная память</div>
                    </div>
            }

            {
                props.selectedItemsStore.hideBpButton ?
                    <div onClick={props.selectedItemsStore.HideBpButton} className="item_not_chosen">
                        <div className="add_items_text"> <div className="descr1">

                                <div className="item_name">Блок питания</div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Модель</div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedBp.model}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Форм-фактор: </div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedBp.form_factor}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Тип разъема для материнской платы: </div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedBp.connector_type_for_motherboard}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">PFC: </div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedBp.pfc}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Система охлаждения: </div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedBp.cooling_system}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Мощность: </div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedBp.power}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Цена</div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedBp.value} руб.</div>
                                </div>

                        </div>
                        <div className="item__name1">{props.selectedItemsStore.addedBp.model}</div>
                        <div className="item__value1">{props.selectedItemsStore.addedBp.value} руб.
                        </div>
                        </div>
                    </div>
                    :
                    <div className="item_not_chosen">
                        <div className='item_not_chosen_text'>Блок питания</div>
                    </div>
            }

            {
                props.selectedItemsStore.hideMbButton ?

                    <div onClick={props.selectedItemsStore.HideMbButton}
                        className={`item_not_chosen ${(!props.selectedItemsStore.compatibilityRamMb && 'item_chosen_error') || (!props.selectedItemsStore.compatibilityCpuMb() && 'item_chosen_error')}`}>
                        <div className="add_items_text"> <div className="descr1">

                                <div className="item_name">Материнская плата</div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Модель: </div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedMb.model}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Сокет: </div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedMb.socket}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Чипсет: </div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedMb.chipset}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Поддерживаемая память: </div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedMb.supported_memory}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Количество слотов памяти: </div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedMb.number_of_memory_slots}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Порты SATA: </div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedMb.type_and_number_of_SATA_ports}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Основной разъем питания: </div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedMb.main_power_connector}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Разъем питания процессора: </div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedMb.cpu_Power_Connector}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Форм-фактор: </div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedMb.form_factor}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Цена:</div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedMb.value} руб.</div>
                                </div>

                        </div>
                        <div className="item__name1">{props.selectedItemsStore.addedMb.model}</div>
                        <div className="item__value1">{props.selectedItemsStore.addedMb.value} руб.
                        </div>
                        </div>
                    </div>
                    :
                    <div className="item_not_chosen">
                        <div className='item_not_chosen_text'>Материнская плата</div>
                    </div>
            }
            {
                props.selectedItemsStore.hideSoButton ?
                    <div onClick={props.selectedItemsStore.HideSoButton}
                        className={`item_not_chosen ${!props.selectedItemsStore.compatibilityCpuSo && 'item_chosen_error' } `}>
                        <div className="add_items_textSo"> <div className="descr1">

                                <div className="item_name">Система охлаждения</div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Модель:</div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedSo.model}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Сокет: </div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedSo.socket}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Рассеиваемая мощность: </div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedSo.power_dissipation}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Воздушный поток: </div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedSo.air_flow}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Уровень шума: </div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedSo.noise_level}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Тип коннектора: </div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedSo.connector_type}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Цена:</div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedSo.value} руб.</div>
                                </div>

                        </div>
                        <div className="item__name1">{props.selectedItemsStore.addedSo.model}</div>
                        <div className="item__value1">{props.selectedItemsStore.addedSo.value} руб.
                        </div>
                        </div>
                    </div>
                    :
                    <div className="item_not_chosen">
                        <div className='item_not_chosen_text'>Система охлаждения</div>
                    </div>
            }

            {
                props.selectedItemsStore.hideSsdButton ?
                    <div onClick={props.selectedItemsStore.HideSsdButton} className="item_not_chosen">
                        <div className="add_items_textSsd"> <div className="descr1">

                                <div className="item_name">SSD</div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Модель: </div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedSsd.model}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Тип: </div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedSsd.type}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Объем: </div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedSsd.volume}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Скорость записи/чтения: </div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedSsd.recording_speed_reading_speed}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Форм фактор: </div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedSsd.form_factor}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Интерфейс: </div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedSsd.interface}</div>
                                </div>
                                <div className="sidebar__body">
                                    <div className="namecharacteristics">Цена:</div> <div className="space"></div>
                                    <div className='characteristics'>{props.selectedItemsStore.addedSsd.value} руб.</div>
                                </div>

                        </div>
                        <div className="item__name1">{props.selectedItemsStore.addedSsd.model}</div>
                        <div className="item__value1">{props.selectedItemsStore.addedSsd.value} руб.
                        </div>
                        </div>
                    </div>
                    :
                    <div className="item_not_chosen">
                        <div className='item_not_chosen_text'>Ssd</div>
                    </div>
            }


        </div>
    </div>
)

export default inject('selectedItemsStore')(observer(AddedItems));
