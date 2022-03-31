import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Inscripcion = () => {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [condiciones, setCondiciones] = useState([])
    const [status, setStatus] = useState(null)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset))
        } else {
            setStatus(null)
        }
    }, [])

    const submitForm = async event => {
        event.preventDefault()

        if (email.length > 0) {
            if (email.indexOf('@') === -1) {
                setStatus(true)
                setErrors([...errors, 'El email no tiene formato correcto'])
            } else {
                localStorage.setItem('email', email)
                router.push('/inscripcion/datospersonales')
            }
        }
    }

    return (
        <GuestLayout>
            <AuthCard
                logo={
                    <Link href="/">
                        <a>
                            <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                        </a>
                    </Link>
                }>
                {/* Session Status */}
                <AuthSessionStatus className="mb-4" status={status} />

                {/* Validation Errors */}
                <AuthValidationErrors className="mb-4" errors={errors} />

                <form onSubmit={submitForm}>
                    {/* MAIL */}
                    <div className="mt-4">
                        <Label htmlFor="email">Mail corporativo</Label>

                        <Input
                            id="email"
                            type="email"
                            value={email}
                            className="block mt-1 w-full"
                            onChange={event => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    {/* Pase de movilidad */}
                    <div className="block mt-4">
                        <label
                            htmlFor="pase_movilidad"
                            className="inline-flex items-center">
                            <input
                                id="pase_movilidad"
                                name="pase_movilidad"
                                type="checkbox"
                                required
                                value={condiciones}
                                onChange={event =>
                                    setCondiciones(Boolean(event.target.value))
                                }
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />

                            <span className="ml-2 text-sm text-gray-600">
                                Acepto que la información ingresada sea
                                verdadera y corresponda a la persona que realiza
                                la inscripción.
                            </span>
                        </label>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Button className="ml-3">Continuar</Button>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    )
}

export default Inscripcion
