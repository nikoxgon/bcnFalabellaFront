import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'

import Table from 'react-tailwind-table'
import 'react-tailwind-table/dist/index.css'

import DeleteModal from '@/components/Modals/DeleteModal'
import AddMallfechasModal from '@/components/Modals/addMallfechasModal'
import EditMallfechasModal from '@/components/Modals/EditMallfechasModal'

const MallsFechas = () => {
    const [mallsfechas, setMallsfechas] = useState([])
    const [columns] = useState(getColumns)

    const loadMalls = async () => {
        const response = await axios.get(
            'http://localhost:8000/api/v1/mallsfechas',
        )
        if (response.status === 200) {
            setMallsfechas(response.data)
        }

        if (response.status === 500) {
            // console.log('Error al cargar los países')
        }
    }

    const rowcheck = (row, column, display_value) => {
        if (column.field === 'id') {
            return (
                <>
                    <EditMallfechasModal
                        url={`http://localhost:8000/api/v1/mallsfechas/${row.id}`}
                        data={row}
                        handler={loadMalls}
                    />
                    <DeleteModal
                        objectName={'Mall'}
                        handler={loadMalls}
                        urlDelete={`http://localhost:8000/api/v1/mallsfechas/${row.id}`}
                    />
                </>
            )
        }

        if (column.field === 'mall.name') {
            return <b>{display_value}</b>
        }

        return display_value
    }

    function getColumns() {
        return [
            {
                // use_in_display: false,
                field: 'mall.name', //Object destructure
                use: 'Nombre Mall',
            },
            {
                // use_in_display: false,
                field: 'fecha_inicio', //Object destructure
                use: 'Fecha Inicio',
            },
            {
                // use_in_display: false,
                field: 'fecha_fin', //Object destructure
                use: 'Fecha Fin',
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
                <h2 className="font-semibold text-xl text-neutral-300 leading-tight ">
                    Mantenedores - Malls Fechas
                </h2>
            }>
            <Head>
                <title>Falabella - Mantenedores - Malls Fechas</title>
            </Head>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-neutral-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <AddMallfechasModal
                                handler={loadMalls}
                                url={'http://localhost:8000/api/v1/mallsfechas'}
                            />
                        </div>
                        <div>
                            <Table
                                columns={columns}
                                rows={mallsfechas}
                                row_render={rowcheck}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default MallsFechas
