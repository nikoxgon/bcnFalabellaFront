import React, { useEffect } from 'react'
import axios from '@/lib/axios'
import { toast } from 'react-toastify'

export default function AddNegociosModal(props) {
    const [showModal, setShowModal] = React.useState(false)
    const [name, setName] = React.useState('')
    const [errors, setErrors] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)

    const closeModal = () => {
        setErrors([])
        setIsLoading(false)
        setShowModal(false)
    }

    const addCountry = async () => {
        try {
            setIsLoading(true)
            const data = {
                name: name,
            }
            const response = await axios.post(props.url, data)
            if (response.data.status === 200) {
                setIsLoading(false)
                toast(response.data.message)
                props.handler()
                closeModal()
            }

            if (response.data.status === 400) {
                setIsLoading(false)
                setErrors(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {}, [])

    return (
        <>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-blue-100 py-2 px-4 m-4 rounded-lg"
                type="button"
                onClick={() => setShowModal(true)}>
                Nuevo negocio
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
                                        Agregar nuevo negocio
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
                                    <div>
                                        <label
                                            className="block text-neutral-200 text-sm font-bold mb-2"
                                            htmlFor="negocio">
                                            Nombre
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 bg-neutral-600 text-neutral-200 border-neutral-400 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                                            id="negocio"
                                            type="text"
                                            placeholder="Falabella"
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
                                        type="button"
                                        disabled={isLoading}
                                        onClick={() => {
                                            addCountry()
                                        }}>
                                        Crear nuevo negocio
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
