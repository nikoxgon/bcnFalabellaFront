import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import Link from 'next/link'
import GuestLayout from '@/components/Layouts/GuestLayout'

const Inscripcionaviso = () => {
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
                <div>
                    Debido a que se encuentra en población de riesgo o no posee
                    pase de movilidad. No se puede continuar con el formulario
                    de inscripción
                </div>
            </AuthCard>
        </GuestLayout>
    )
}

export default Inscripcionaviso
