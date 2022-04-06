import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'

import Table from 'react-tailwind-table'
import 'react-tailwind-table/dist/index.css'

import DeleteModal from '@/components/Modals/DeleteModal'
import EditModal from '@/components/Modals/EditModal'
import AddVisitasModal from '@/components/Modals/AddVisitasModal'

const Visitas = () => {
    const [visitas, setVisitas] = useState([])
    const [columns] = useState(getColumns)

    const loadVisitas = async () => {
        const response = await axios.get(
            'http://localhost:8000/api/v1/visitors',
        )
        if (response.status === 200) {
            setVisitas(response.data)
        }

        if (response.status === 500) {
            // console.log('Error al cargar los países')
        }
    }

    const rowcheck = (row, column, display_value) => {
        if (column.field === 'id') {
            return (
                <>
                    <EditModal
                        url={`http://localhost:8000/api/v1/visitors/${row.id}`}
                        handler={loadVisitas}
                    />
                    <DeleteModal
                        objectName={'Visitas'}
                        handler={loadVisitas}
                        urlDelete={`http://localhost:8000/api/v1/visitors/${row.id}`}
                    />
                </>
            )
        }

        if (column.field === 'disabled') {
            return <b>{display_value === 0 ? 'Activado' : 'Desactivado'}</b>
        }

        return display_value
    }

    function getColumns() {
        return [
            {
                // use_in_display: false,
                field: 'name', //Object destructure
                use: 'Nombre Visita',
            },
            {
                // use_in_display: false,
                field: 'disabled', //Object destructure
                use: 'Activado/Desactivado',
            },
            {
                field: 'id',
                use: 'Acciones',
                use_in_search: false,
            },
        ]
    }

    useEffect(() => {
        loadVisitas()
        // componentWillUnmount
        return () => {}
    }, [])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-neutral-300 leading-tight ">
                    Mantenedores - Visitas
                </h2>
            }>
            <Head>
                <title>Falabella - Visitas</title>
            </Head>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-neutral-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <AddVisitasModal
                                handler={loadVisitas}
                                url={'http://localhost:8000/api/v1/visitors'}
                            />
                        </div>
                        <div>
                            <Table
                                columns={columns}
                                rows={visitas}
                                row_render={rowcheck}
                                export_text="Exportar"
                                striped={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Visitas
