import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'

import Table from 'react-tailwind-table'
import 'react-tailwind-table/dist/index.css'

import { toast } from 'react-toastify'

const Reservaciones = () => {
    const [Inscripciones, setInscripciones] = useState([])
    const [columns] = useState(getColumns)

    const loadInscripciones = async () => {
        setInscripciones([])
        const response = await axios.get(
            'http://localhost:8000/api/v1/reservations',
        )
        if (response.status === 200) {
            setInscripciones(response.data)
        }

        if (response.status === 500) {
            toast(response.data.message)
        }
    }

    const rowcheck = (row, column, display_value) => {
        // if (column.field === 'id') {
        //     return (
        //         <>
        //             <EditRoutesModal
        //                 url={`http://localhost:8000/api/v1/inscriptions/${row.id}`}
        //                 handler={loadInscripciones}
        //                 data={row}
        //             />
        //             <DeleteModal
        //                 objectName={'Route'}
        //                 handler={loadInscripciones}
        //                 urlDelete={`http://localhost:8000/api/v1/inscriptions/${row.id}`}
        //             />
        //         </>
        //     )
        // }

        if (column.field === 'created_at') {
            return new Date(display_value).toLocaleDateString()
        }

        if (
            column.field === 'pase_movilidad' ||
            column.field === 'grupo_riesgo'
        ) {
            if (display_value === 1) {
                return 'Si'
            } else {
                return 'No'
            }
        }

        return display_value
    }

    function getColumns() {
        return [
            {
                // use_in_display: false,
                field: 'inscription.name', //Object destructure
                use: 'Nombre',
            },
            {
                // use_in_display: false,
                field: 'inscription.rut', //Object destructure
                use: 'Rut',
            },
            {
                // use_in_display: false,
                field: 'inscription.email', //Object destructure
                use: 'Correo',
            },
            {
                // use_in_display: false,
                field: 'inscription.phone', //Object destructure
                use: 'Teléfono',
            },
            {
                // use_in_display: false,
                field: 'pase_movilidad', //Object destructure
                use: 'Pase Movilidad',
            },
            {
                // use_in_display: false,
                field: 'grupo_riesgo', //Object destructure
                use: 'Grupo de Riesgo',
            },
            {
                // use_in_display: false,
                field: 'country.name', //Object destructure
                use: 'País',
            },
            {
                // use_in_display: false,
                field: 'created_at', //Object destructure
                use: 'Fecha de Creación',
            },
            // {
            //     field: 'id',
            //     use: 'Acciones',
            //     use_in_search: false,
            // },
        ]
    }

    useEffect(() => {
        loadInscripciones()
        // componentWillUnmount
        return () => {}
    }, [])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Mantenedores - Reservaciones
                </h2>
            }>
            <Head>
                <title>Falabella - Mantenedores - Reservaciones</title>
            </Head>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* <div>
                            <AddRoutesModal
                                handler={loadInscripciones}
                                url={'http://localhost:8000/api/v1/routes'}
                            />
                        </div> */}
                        <div>
                            <Table
                                columns={columns}
                                rows={Inscripciones}
                                row_render={rowcheck}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Reservaciones
