import Label from '@/components/Label'
import DatePicker from 'react-datepicker'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import 'react-datepicker/dist/react-datepicker.css'

const Inscripcionreservacion = () => {
    const router = useRouter()
    const { reservacion } = useAuth({
        middleware: 'guest',
        // redirectIfAuthenticated: '/dashboard',
    })
    const { id } = router.query
    const [inscription, setInscription] = useState(id)
    const [visitor, setVisitor] = useState('')
    const [mall, setMall] = useState('')
    const [mallfecharaw, setMallfecharaw] = useState('')
    const [mallfecha, setMallfecha] = useState('')
    const [mallfechas, setMallfechas] = useState([])
    const [malls, setMalls] = useState([])
    const [visitors, setVisitors] = useState([])
    const [errors, setErrors] = useState([])
    const [, setStatus] = useState(null)

    const isWeekday = date => {
        const day = new Date(date).getDay()
        return day !== 0 && day !== 6
    }

    // function to convert date to string format yyyy-mm-dd
    const formatDate = date => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear()

        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day

        return [year, month, day].join('-')
    }

    useEffect(() => {
        if (!router.isReady) return
        setInscription(router.query.id)
        loadMalls()
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset))
        } else {
            setStatus(null)
        }
    }, [router.isReady])

    const loadMalls = async () => {
        const response = await axios.get(
            'http://localhost:8000/api/v1/malls/reservations/' +
                router.query.id,
        )
        if (response.status === 200) {
            setMalls(response.data)
        }

        if (response.status === 500) {
            // console.log('Error al cargar los países')
        }
    }
    const loadMallsFechas = async id => {
        const response = await axios.get(
            'http://localhost:8000/api/v1/mallsfechas/reservations/' + id,
        )
        if (response.status === 200) {
            const data = response.data.map(item => ({
                start: new Date(item.fecha_inicio),
                end: new Date(item.fecha_fin),
            }))
            setMallfechas(data)
        }

        if (response.status === 500) {
            // console.log('Error al cargar los países')
        }
    }

    const csrf = () => axios.get('/sanctum/csrf-cookie')
    const loadVisitas = async fecha => {
        await csrf()
        const data = {
            date: fecha,
            country: localStorage.getItem('country'),
            mall: mall,
        }
        const response = await axios.post(
            'http://localhost:8000/api/v1/calendar/reservations',
            data,
        )
        if (response.status === 200) {
            setVisitors(response.data)
        }

        if (response.status === 500) {
            // console.log('Error al cargar los países')
        }
    }

    const submitForm = async event => {
        event.preventDefault()

        reservacion({
            inscription,
            visitor,
            mall,
            country: localStorage.getItem('country'),
            route: 1,
            date: mallfecha,
            setErrors,
            setStatus,
        })
    }

    return (
        <>
            <div className="flex min-h-screen bg-gray">
                <div className="m-auto">
                    <div className="block rounded-lg shadow-lg bg-white max-w-sm text-center">
                        <form onSubmit={submitForm}>
                            <div className="py-3 px-6 border-b border-gray-300">
                                Reservación de visita
                            </div>
                            <div className="p-6">
                                {/* PAÍS */}
                                <div className="mt-4">
                                    <Label htmlFor="malls">Malls</Label>

                                    <select
                                        id="malls"
                                        type="text"
                                        value={mall}
                                        className="form-select appearance-none
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding bg-no-repeat
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        disabled={
                                            malls.length > 0 ? false : true
                                        }
                                        onChange={event => {
                                            setMall(event.target.value)
                                            loadMallsFechas(event.target.value)
                                        }}
                                        required>
                                        <option value="">
                                            {malls.length > 0
                                                ? 'Seleccione un mall'
                                                : 'Cargando...'}
                                        </option>
                                        {malls.map(mallItem => (
                                            <option
                                                key={mallItem.id}
                                                value={mallItem.id}>
                                                {mallItem.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* FECHA */}
                                <div className="mt-4">
                                    <Label htmlFor="fecha">Fecha</Label>

                                    <DatePicker
                                        selected={mallfecharaw}
                                        onChange={date => {
                                            setMallfecharaw(date)
                                            setMallfecha(formatDate(date))
                                            loadVisitas(formatDate(date))
                                        }}
                                        disabled={
                                            mallfechas.length > 0 ? false : true
                                        }
                                        required
                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        filterDate={isWeekday}
                                        includeDateIntervals={mallfechas}
                                        placeholderText={
                                            mallfechas.length > 0
                                                ? 'Seleccione una fecha'
                                                : mall
                                                ? 'Cargando...'
                                                : 'Seleccione un mall'
                                        }
                                    />
                                </div>
                                {/* VISITAS */}
                                <div className="mt-4">
                                    <Label htmlFor="visitor">Visitas</Label>

                                    <select
                                        id="visitor"
                                        value={visitor}
                                        disabled={
                                            visitors.length > 0 ? false : true
                                        }
                                        className="form-select appearance-none
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding bg-no-repeat
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        onChange={event =>
                                            setVisitor(event.target.value)
                                        }
                                        required>
                                        <option value="">
                                            {visitors.length > 0
                                                ? 'Seleccione Visita...'
                                                : 'Cargando...'}
                                        </option>
                                        {visitors.map(visitorItem => (
                                            <option
                                                key={visitorItem.id}
                                                disabled={
                                                    visitorItem.disabled ===
                                                    true
                                                        ? true
                                                        : ''
                                                }
                                                value={visitorItem.id}>
                                                {visitorItem.id} (
                                                {visitorItem.name})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="py-3 px-6 border-t border-gray-300 text-gray-600">
                                <div className="inline-flex rounded-md shadow">
                                    <button
                                        type="submit"
                                        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                        Continuar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Inscripcionreservacion
