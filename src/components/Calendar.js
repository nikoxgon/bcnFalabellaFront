import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Modal from 'react-modal'
import { useModal } from 'react-modal-hook'
import Table from 'react-tailwind-table'
import 'react-tailwind-table/dist/index.css'
import axios from '@/lib/axios'

const localizer = momentLocalizer(moment)

const messages = {
    next: 'Siguiente',
    previous: 'Anterior',
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Hora',
    event: 'Evento',
    allDay: 'Todo el día',
    weekNum: 'Semana',
    more: 'Más',
}

const EventCalendar = () => {
    const [columns] = useState(getColumns)
    const [visitas, setVisitas] = useState()
    function getColumns() {
        return [
            {
                // use_in_display: false,
                field: 'name', //Object destructure
                use: 'Nombre',
            },
            {
                // use_in_display: false,
                field: 'country.name', //Object destructure
                use: 'País',
            },
            {
                // use_in_display: false,
                field: 'enabled', //Object destructure
                use: 'Habilitado/Deshabilitado',
            },

            {
                field: 'id',
                use: 'Acciones',
                use_in_search: false,
            },
        ]
    }
    // async function getVisitas(country, date) {
    //     console.table(country)
    //     console.table(date)
    //     const data = {
    //         country: country,
    //         date: date,
    //     }
    //     return await axios.post(
    //         'http://localhost:8000/api/v1/calendar/reservations',
    //         data,
    //     )
    // }
    const [modalData, setModalData] = useState({})
    const [showModal, hideModal] = useModal(
        () => (
            <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                <h3 className="text-3xl font-semibold">
                                    Visitas {modalData?.title} -{' '}
                                    {modalData?.date}
                                </h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => hideModal()}>
                                    <span className="bg-transparent text-black opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                    </span>
                                </button>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                                <Table
                                    columns={columns}
                                    rows={visitas}
                                    // row_render={rowcheck}
                                />
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                <button
                                    className="text-green-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => hideModal()}>
                                    No
                                </button>
                                <button
                                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => hideModal()}>
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black" />
            </>
        ),
        [modalData, columns, visitas],
    )
    const handleSelect = async e => {
        await setModalData({
            country: e.country,
            date: e.date,
        })
        showModal()
    }

    const renderModal = () => {
        if (!modalIsOpen) return
        return (
            <Modal isOpen={modalIsOpen} contentLabel="Example Modal">
                Prueba
            </Modal>
        )
    }

    const eventStyleGetter = function (event) {
        const backgroundColor = event.color
        const style = {
            backgroundColor: backgroundColor,
            borderRadius: '8px',
            opacity: 1,
            color: '#ffffff',
            border: '0px',
            display: 'block',
            fontFamily: 'Nunito',
            fontSize: '0.9em',
        }
        return {
            style: style,
        }
    }
    // DEFINIR STATES
    const [events, setEvents] = useState([])
    const [modalIsOpen] = useState(false)
    // GET EVENTS FROM API
    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/calendar').then(response => {
            if (response.status === 200 && response) {
                setEvents(
                    response.data.map(item => ({
                        id: item.id,
                        title: item.title,
                        reservasCount: item.reservasCount,
                        reservas: item.reservas,
                        allDay: false,
                        start: new Date(item.start),
                        end: new Date(item.end),
                        color: item.color,
                    })),
                )
            }
        })
    }, [])
    return (
        <div className="bigCalendar-container">
            <Calendar
                localizer={localizer}
                events={events}
                views={['month', 'week', 'day']}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={event => {
                    // console.table(event)
                    setModalData({
                        title: event.title,
                        date: event.start.toString(),
                    })
                    setVisitas(event.reservas)
                    if (event.reservas.length > 0) {
                        showModal()
                    }
                }}
                onSelectSlot={handleSelect}
                messages={messages} // Traducciones
                style={{ height: 500, color: '#f5f5f5' }}
                eventPropGetter={eventStyleGetter}
            />
            {renderModal()}
        </div>
    )
}

export default EventCalendar
