import React, { useEffect } from 'react'
import axios from '@/lib/axios'

export default function AddMallfechasModal(props) {
    const [showModal, setShowModal] = React.useState(false)
    const [fechaInicial, setFechaInicial] = React.useState('')
    const [fechaFinal, setFechaFinal] = React.useState('')
    const [mall, setMall] = React.useState('')
    const [malls, setMalls] = React.useState([])

    const addMallfechas = async () => {
        const data = {
            mall: mall,
            fechaInicial: fechaInicial,
            fechaFinal: fechaFinal,
        }
        const response = await axios.post(props.url, data)
        if (response.status === 200) {
            // console.log(response.data.message)
            props.handler()
        }

        if (response.status === 500) {
            // console.log(response.data.message)
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

    useEffect(() => {
        getMalls()
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
                                    <h3 className="text-3xl font-semibold">
                                        Agregar nueva fecha para el mall
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}>
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">
                                    <div className="mb-4">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="mall">
                                            Mall
                                        </label>
                                        <select
                                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                                    <div className="mb-6">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="fechaInicial">
                                            Fecha Inicial
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="dateFin">
                                            Fecha Final
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
                                    <div className="flex items-center justify-between">
                                        <button
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={() => {
                                                setShowModal(false)
                                                addMallfechas()
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
