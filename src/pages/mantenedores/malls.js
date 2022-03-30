import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'

import Table from 'react-tailwind-table'
import 'react-tailwind-table/dist/index.css'

import DeleteModal from '@/components/Modals/DeleteModal'
import DisableEnableModal from '@/components/Modals/DisableEnableModal'

const Malls = () => {
    const [malls, setMalls] = useState([])
    const [columns] = useState(getColumns)

    const loadMalls = async () => {
        const response = await axios.get('http://localhost:8000/api/v1/malls')
        if (response.status === 200) {
            setMalls(response.data)
        }

        if (response.status === 500) {
            // console.log('Error al cargar los países')
        }
    }

    const rowcheck = (row, column, display_value) => {
        if (column.field === 'id') {
            return (
                <>
                    <button className="border p-2">Edit</button>
                    <DisableEnableModal
                        objectName={'Mall'}
                        status={row.enabled}
                        handler={loadMalls}
                        url={
                            'http://localhost:8000/api/v1/malls/toggle/' +
                            display_value
                        }
                    />
                    <DeleteModal
                        objectName={'Mall'}
                        handler={loadMalls}
                        urlDelete={
                            'http://localhost:8000/api/v1/malls/' +
                            display_value
                        }
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

    useEffect(() => {
        loadMalls()

        // componentWillUnmount
        return () => {}
    }, [])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Mantenedores - Malls
                </h2>
            }>
            <Head>
                <title>Falabella - Mantendores - Malls</title>
            </Head>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <Table
                                columns={columns}
                                rows={malls}
                                row_render={rowcheck}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Malls
