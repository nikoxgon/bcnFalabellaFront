import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'

import Table from 'react-tailwind-table'
import 'react-tailwind-table/dist/index.css'

import DeleteModal from '@/components/Modals/DeleteModal'
import EditModal from '@/components/Modals/EditModal'
import AddNegociosModal from '@/components/Modals/AddNegociosModal'

const Negocios = () => {
    const [negocios, setNegocios] = useState([])
    const [columns] = useState(getColumns)

    const loadNegocios = async () => {
        const response = await axios.get(
            'http://localhost:8000/api/v1/negocios',
        )
        if (response.status === 200) {
            setNegocios(response.data)
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
                        url={`http://localhost:8000/api/v1/negocios/${row.id}`}
                        handler={loadNegocios}
                    />
                    <DeleteModal
                        objectName={'Negocio'}
                        handler={loadNegocios}
                        urlDelete={`http://localhost:8000/api/v1/negocios/${row.id}`}
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
                use: 'Nombre Negocio',
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
        loadNegocios()
        // componentWillUnmount
        return () => {}
    }, [])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-neutral-300 leading-tight ">
                    Mantenedores - Negocios
                </h2>
            }>
            <Head>
                <title>Falabella - Negocios</title>
            </Head>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-neutral-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <AddNegociosModal
                                handler={loadNegocios}
                                url={'http://localhost:8000/api/v1/negocios'}
                            />
                        </div>
                        <div>
                            <Table
                                columns={columns}
                                rows={negocios}
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

export default Negocios
