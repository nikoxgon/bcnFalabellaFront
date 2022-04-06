import React, { useState } from 'react'
import axios from '@/lib/axios'

export default function AddVisitasModal(props) {
    const [showModal, setShowModal] = useState(false)
    const [name, setName] = useState('')
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)

    const addRoute = async () => {
        setLoading(true)
        const data = {
            name: name,
        }
        const response = await axios.post(props.url, data)
        if (response.status === 201) {
            setLoading(false)
            props.handler()
            setShowModal(false)
        }

        if (response.status === 500) {
            setLoading(false)
            setErrors(response.data.errors)
        }
    }

    return (
        <>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-blue-100 py-2 px-4 m-4 rounded-lg"
                type="button"
                onClick={() => setShowModal(true)}>
                Nueva visita
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
                                        Agregar nueva visita
                                    </h3>
                                    <button
                                        className="text-neutral-200 text-1xl font-semibold border px-2 border-neutral-400 rounded-lg"
                                        onClick={() => setShowModal(false)}>
                                        X
                                    </button>
                                </div>
                                {/*body*/}
                                <form className="bg-neutral-700 rounded px-8 pt-2 pb-8 mb-4">
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
                                            className="block text-neutral-200 text-sm font-bold mb-2"
                                            htmlFor="name">
                                            Nombre
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-200 leading-tight focus:outline-none focus:shadow-outline"
                                            id="name"
                                            type="text"
                                            placeholder="Falabella / Banco Falabella"
                                            required
                                            onChange={e =>
                                                setName(e.target.value)
                                            }
                                        />
                                    </div>
                                </form>
                                {/*footer*/}
                                <div className="flex items-center justify-between mb-4 ml-4 mr-4">
                                    <button
                                        className="bg-green-700 hover:bg-green-600 text-green-50 w-full font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                                        type="submit"
                                        disabled={loading}
                                        onClick={() => {
                                            addRoute()
                                        }}>
                                        Crear nueva visita
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-50 fixed inset-0 z-40 bg-black" />
                </>
            ) : null}
        </>
    )
}
