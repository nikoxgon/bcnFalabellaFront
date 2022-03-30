import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'

import Table from 'react-tailwind-table'
import 'react-tailwind-table/dist/index.css'

import DeleteModal from '@/components/Modals/DeleteModal'
import AddRoutesModal from '@/components/Modals/AddRoutesModal'
import EditRoutesModal from '@/components/Modals/EditRoutesModal'
import { toast } from 'react-toastify'

const Routes = () => {
    const [routes, setRoutes] = useState([])
    const [columns] = useState(getColumns)

    const loadRoutes = async () => {
        setRoutes([])
        const response = await axios.get('http://localhost:8000/api/v1/routes')
        if (response.status === 200) {
            setRoutes(response.data)
        }

        if (response.status === 500) {
            toast(response.data.message)
        }
    }

    const rowcheck = (row, column, display_value) => {
        if (column.field === 'id') {
            return (
                <>
                    <EditRoutesModal
                        url={`http://localhost:8000/api/v1/routes/${row.id}`}
                        handler={loadRoutes}
                        data={row}
                    />
                    <DeleteModal
                        objectName={'Route'}
                        handler={loadRoutes}
                        urlDelete={`http://localhost:8000/api/v1/routes/${row.id}`}
                    />
                </>
            )
        }

        if (column.field === 'name') {
            return <b>{display_value}</b>
        }

        return display_value
    }

    function getColumns() {
        return [
            {
                // use_in_display: false,
                field: 'name', //Object destructure
                use: 'Nombre Ruta',
            },
            {
                // use_in_display: false,
                field: 'begin', //Object destructure
                use: 'Fecha Inicio',
            },
            {
                // use_in_display: false,
                field: 'end', //Object destructure
                use: 'Fecha Fin',
            },
            {
                // use_in_display: false,
                field: 'country.name', //Object destructure
                use: 'País',
            },
            {
                field: 'id',
                use: 'Acciones',
                use_in_search: false,
            },
        ]
    }

    useEffect(() => {
        loadRoutes()
        // componentWillUnmount
        return () => {}
    }, [])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Mantenedores - Rutas
                </h2>
            }>
            <Head>
                <title>Falabella - Mantenedores - Rutas</title>
            </Head>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <AddRoutesModal
                                handler={loadRoutes}
                                url={'http://localhost:8000/api/v1/routes'}
                            />
                        </div>
                        <div>
                            <Table
                                columns={columns}
                                rows={routes}
                                row_render={rowcheck}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Routes
