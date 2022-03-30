import React, { useEffect } from 'react'
import axios from '@/lib/axios'
import { toast } from 'react-toastify'

export default function EditRoutesModal(props) {
    const [showModal, setShowModal] = React.useState(false)
    const [name, setName] = React.useState('')
    const [begin, setBegin] = React.useState('')
    const [end, setEnd] = React.useState('')
    const [country, setCountry] = React.useState('')
    const [countries, setCountries] = React.useState([])
    const [errors, setErrors] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)

    const addRoute = async () => {
        setIsLoading(true)
        const data = {
            name: name,
            country: country,
            begin: begin,
            end: end,
        }
        const response = await axios.put(props.url, data)
        if (response.status === 200) {
            toast(response.data.message)
            setIsLoading(false)
            props.handler()
            setShowModal(false)
        } else if (response.status === 500) {
            toast(response.data.message)
            setIsLoading(false)
            setErrors(response.data.errors)
        } else {
            toast(response.data.message)
            setIsLoading(false)
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
            toast(response.data.message)
        }
    }

    useEffect(() => {
        getCountries()
        setName(props.data.name)
        setBegin(props.data.begin)
        setEnd(props.data.end)
        setCountry(props.data.country.id)
    }, [])

    return (
        <>
            <button
                className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-1 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                </svg>
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
                                        Editar ruta
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
                                            value={name}
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
                                            value={country}
                                            disabled={
                                                countries.length > 0
                                                    ? false
                                                    : true
                                            }
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
                                            value={begin}
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
                                            value={end}
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
                                            disabled={isLoading}
                                            onClick={() => {
                                                addRoute()
                                            }}>
                                            Editar Ruta
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
