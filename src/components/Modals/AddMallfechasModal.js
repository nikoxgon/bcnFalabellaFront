import React, { useEffect } from 'react'
import axios from '@/lib/axios'

export default function AddMallfechasModal(props) {
    const [showModal, setShowModal] = React.useState(false)
    const [fechaInicial, setFechaInicial] = React.useState('')
    const [fechaFinal, setFechaFinal] = React.useState('')
    const [mall, setMall] = React.useState('')
    const [malls, setMalls] = React.useState([])
    const [errors, setErrors] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [routes, setRoutes] = React.useState([])
    const [route, setRoute] = React.useState('')

    const closeModal = () => {
        setErrors([])
        setIsLoading(false)
        setShowModal(false)
    }

    const addMallfechas = async () => {
        setErrors([])
        const data = {
            mall: mall,
            fechaInicial: fechaInicial,
            fechaFinal: fechaFinal,
            route: route,
        }
        const response = await axios.post(props.url, data)
        if (response.data.status === 200) {
            // console.log(response.data.message)
            props.handler()
            setShowModal(false)
        }

        if (response.data.status === 400) {
            // console.log(response.data.message)
            setErrors(response.data.message)
        }
    }

    const getMalls = async () => {
        const response = await axios.get('http://localhost:8000/api/v1/malls')
        if (response.status === 200) {
            setMalls(response.data)
        }

        if (response.status === 500) {
            // console.log('Error al cargar los países')
        }
    }

    const getRoutes = async () => {
        const response = await axios.get('http://localhost:8000/api/v1/routes')
        if (response.status === 200) {
            setRoutes(response.data)
        }

        if (response.status === 500) {
            // console.log('Error al cargar los países')
        }
    }

    useEffect(() => {
        getMalls()
        getRoutes()
    }, [])

    return (
        <>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-blue-100 py-2 px-4 m-4 rounded-lg"
                type="button"
                onClick={() => setShowModal(true)}>
                Nuevas fechas
            </button>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-neutral-800 text-neutral-200 outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 rounded-t">
                                    <h3 className="text-1xl font-semibold">
                                        Agregar fechas Mall
                                    </h3>
                                    <button
                                        className="text-neutral-200 text-1xl font-semibold border px-2 border-neutral-400 rounded-lg"
                                        onClick={() => closeModal()}>
                                        X
                                    </button>
                                </div>
                                {/*body*/}
                                <form className="bg-neutral-700 rounded px-8 pt-2 pb-8 mb-4">
                                    <div className="mb-4">
                                        {errors.map((error, index) => (
                                            <p
                                                className="text-red-500 font-semibold"
                                                key={index}>
                                                - {error}
                                            </p>
                                        ))}
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            className="block text-neutral-200 text-sm font-bold mb-2"
                                            htmlFor="mall">
                                            Mall
                                        </label>
                                        <select
                                            className="shadow appearance-none border rounded w-full py-2 px-3 bg-neutral-600 text-neutral-200 border-neutral-400 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                                            id="mall"
                                            disabled={malls ? false : true}
                                            onChange={e =>
                                                setMall(e.target.value)
                                            }>
                                            <option value="">
                                                {malls
                                                    ? 'Seleccione un mall'
                                                    : 'Cargando...'}
                                            </option>
                                            {malls.map(item => (
                                                <option
                                                    key={item.id}
                                                    value={item.id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            className="block text-neutral-200 text-sm font-bold mb-2"
                                            htmlFor="route">
                                            Ruta
                                        </label>
                                        <select
                                            className="shadow appearance-none border rounded w-full py-2 px-3 bg-neutral-600 text-neutral-200 border-neutral-400 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                                            id="route"
                                            disabled={routes ? false : true}
                                            onChange={e =>
                                                setRoute(e.target.value)
                                            }>
                                            <option value="">
                                                {routes
                                                    ? 'Seleccione una ruta'
                                                    : 'Cargando...'}
                                            </option>
                                            {routes.map(item => (
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
                                            className="block text-neutral-200 text-sm font-bold mb-2"
                                            htmlFor="fechaInicial">
                                            Fecha Inicial
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 bg-neutral-600 text-neutral-200 border-neutral-400 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                                            id="fechaInicial"
                                            type="date"
                                            placeholder="01-01-2022"
                                            required
                                            max={fechaFinal}
                                            onChange={e =>
                                                setFechaInicial(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label
                                            className="block text-neutral-200 text-sm font-bold mb-2"
                                            htmlFor="dateFin">
                                            Fecha Final
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 bg-neutral-600 text-neutral-200 border-neutral-400 leading-tight focus:outline-none focus:shadow-outline"
                                            id="dateFin"
                                            type="date"
                                            placeholder="01-03-2022"
                                            required
                                            min={fechaInicial}
                                            onChange={e =>
                                                setFechaFinal(e.target.value)
                                            }
                                        />
                                    </div>
                                </form>
                                {/*footer*/}
                                <div className="flex items-center justify-between mb-4 ml-4 mr-4">
                                    <button
                                        className="bg-green-700 hover:bg-green-600 text-green-50 w-full font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                                        type="button"
                                        disabled={isLoading}
                                        onClick={() => {
                                            addMallfechas()
                                        }}>
                                        Crear nueva fecha
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
