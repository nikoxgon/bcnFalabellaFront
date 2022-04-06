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
                <>
                    <div>
                        Debido a que has indicado que no puedes participar, no
                        continuaras con el formulario de inscripción. Te
                        agradecemos por tu tiempo. Si tienes dudas al respecto,
                        puedes contactarme con nosotros al correo{' '}
                        <a href="mailto:rutacliente@falabella.cl">
                            {' '}
                            rutacliente@falabella.cl
                        </a>
                    </div>
                </>
            </AuthCard>
        </GuestLayout>
    )
}

export default Inscripcionaviso
