import React, { useEffect } from 'react'
import axios from '@/lib/axios'

export default function AddCountriesModal(props) {
    const [showModal, setShowModal] = React.useState(false)
    const [name, setName] = React.useState('')
    const [errors, setErrors] = React.useState([])

    const addCountry = async () => {
        const data = {
            name: name,
        }
        const response = await axios.post(props.url, data)
        if (response.status === 200) {
            // console.log(response.data.message)
            props.handler()
            setShowModal(false)
        }

        if (response.status === 400) {
            // console.table(response)
            setErrors(response.data.errors)
        }
    }

    useEffect(() => {}, [])

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
                                        Agregar nuevo país
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
                                        {errors.map(error => (
                                            <p
                                                className="text-red-500 text-xs italic"
                                                key={error.message}>
                                                {error.message}
                                            </p>
                                        ))}
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="country">
                                            Nombre País
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="country"
                                            type="text"
                                            placeholder="Chile"
                                            required
                                            onChange={e =>
                                                setName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <button
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={() => {
                                                addCountry()
                                            }}>
                                            Crear nuevo país
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
