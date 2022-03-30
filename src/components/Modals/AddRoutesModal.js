import React, { useEffect } from 'react'
import axios from '@/lib/axios'

export default function AddRoutesModal(props) {
    const [showModal, setShowModal] = React.useState(false)
    const [name, setName] = React.useState('')
    const [begin, setBegin] = React.useState('')
    const [end, setEnd] = React.useState('')
    const [country, setCountry] = React.useState('')
    const [countries, setCountries] = React.useState([])
    const [errors, setErrors] = React.useState([])

    const addRoute = async () => {
        const data = {
            name: name,
            country: country,
            begin: begin,
            end: end,
        }
        const response = await axios.post(props.url, data)
        if (response.status === 201) {
            // console.log(response.data.message)
            props.handler()
            setShowModal(false)
        }

        if (response.status === 500) {
            // console.log(response.data.message)
            setErrors(response.data.errors)
        }
    }

    const getCountries = async () => {
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

    useEffect(() => {
        getCountries()
    }, [])

    return (
        <>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => setShowModal(true)}>
                Nuevo
            </button>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-1xl font-semibold">
                                        Agregar nueva ruta
                                    </h3>
                                    <button
                                        className="ml-auto bg-red border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}>
                                        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            x
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">
                                    <div className="mb-4">
                                        {errors.map(error => (
                                            <p
                                                className="text-red-500 text-xs italic"
                                                key={error}>
                                                {error}
                                            </p>
                                        ))}
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="name">
                                            Nombre
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="name"
                                            type="text"
                                            placeholder="Nombre ruta"
                                            required
                                            onChange={e =>
                                                setName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="country">
                                            País
                                        </label>
                                        <select
                                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="mall"
                                            disabled={countries ? false : true}
                                            onChange={e =>
                                                setCountry(e.target.value)
                                            }>
                                            <option value="">
                                                {countries
                                                    ? 'Seleccione un país'
                                                    : 'Cargando...'}
                                            </option>
                                            {countries.map(item => (
                                                <option
                                                    key={item.id}
                                                    value={item.id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-6">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="begin">
                                            Fecha Inicial
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="begin"
                                            type="date"
                                            placeholder="01-01-2022"
                                            required
                                            max={end}
                                            onChange={e =>
                                                setBegin(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="end">
                                            Fecha Final
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                            id="end"
                                            type="date"
                                            placeholder="01-03-2022"
                                            required
                                            min={begin}
                                            onChange={e =>
                                                setEnd(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <button
                                            className="bg-green-500 hover:bg-green-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={() => {
                                                addRoute()
                                            }}>
                                            Crear nueva fecha
                                        </button>
                                    </div>
                                </form>
                                {/*footer*/}
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black" />
                </>
            ) : null}
        </>
    )
}
