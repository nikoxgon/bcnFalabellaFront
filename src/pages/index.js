import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import Link from 'next/link'

function Home() {
    const { user } = useAuth({ middleware: 'guest' })
    return (
        <>
            <Head>
                <title>BCNFALABELLA</title>
            </Head>
            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
                    {user ? (
                        <Link href="/dashboard">
                            <a className="ml-4 text-sm text-gray-700 underline">
                                Dashboard
                            </a>
                        </Link>
                    ) : (
                        <>
                            <Link href="/login">
                                <a className="text-sm text-gray-700 underline">
                                    Iniciar Sesión
                                </a>
                            </Link>

                            <Link href="/register">
                                <a className="ml-4 text-sm text-gray-700 underline">
                                    Registro
                                </a>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Home
