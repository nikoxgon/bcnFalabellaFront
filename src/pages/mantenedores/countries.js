import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'

import Table from 'react-tailwind-table'
import 'react-tailwind-table/dist/index.css'

import DeleteModal from '@/components/Modals/DeleteModal'
import EditModal from '@/components/Modals/EditModal'
import AddCountriesModal from '@/components/Modals/AddCountriesModal'

const Countries = () => {
    const [countries, setCountries] = useState([])
    const [columns] = useState(getColumns)

    const loadCountries = async () => {
        const response = await axios.get(
            'http://localhost:8000/api/v1/countries',
        )
        if (response.status === 200) {
            setCountries(response.data)
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
                        url={`http://localhost:8000/api/v1/countries/${row.id}`}
                        handler={loadCountries}
                    />
                    <DeleteModal
                        objectName={'País'}
                        handler={loadCountries}
                        urlDelete={`http://localhost:8000/api/v1/countries/${row.id}`}
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
                use: 'Nombre País',
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
        loadCountries()
        // componentWillUnmount
        return () => {}
    }, [])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Mantenedores - Países
                </h2>
            }>
            <Head>
                <title>Falabella - Mantenedores - Países</title>
            </Head>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <AddCountriesModal
                                handler={loadCountries}
                                url={'http://localhost:8000/api/v1/countries'}
                            />
                        </div>
                        <div>
                            <Table
                                columns={columns}
                                rows={countries}
                                row_render={rowcheck}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Countries
