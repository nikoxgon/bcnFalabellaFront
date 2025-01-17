import React, { useState } from 'react'
import axios from '@/lib/axios'
import Table from 'react-tailwind-table'
import 'react-tailwind-table/dist/index.css'

export default function CalendarModal(props) {
    const [showModal, setShowModal] = useState(props.showModal)
    const [columns] = useState(getColumns)
    const [visitas] = useState(getVisitas)
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
    async function getVisitas() {
        const data = {
            country: props.data.country,
            date: props.data.fecha,
        }
        return await axios.post(
            'http://localhost:8000/api/v1/calendar/reservations',
            data,
        )
    }
    return (
        <>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Visitas {props.mall} - {props.date}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => {
                                            setShowModal(false)
                                            props.hide()
                                        }}>
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
                                        onClick={() => setShowModal(false)}>
                                        No
                                    </button>
                                    <button
                                        className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {
                                            setShowModal(false)
                                        }}>
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black" />
                </>
            ) : null}
        </>
    )
}
