import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import Link from 'next/link'
import Image from 'next/image'
import homeTitleImage from '../../public/home-title.png'
import homeLogoImage from '../../public/logo-falabella.png'
import homeLogoBancoImage from '../../public/logo-banco.png'

function Home() {
    const { user } = useAuth({ middleware: 'guest' })
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen w-screen bg-pattern">
                <Head>
                    <title>Inicio - RutaFalabella</title>
                </Head>

                <div className="bg-home-image absolute top-0 left-0 h-full w-1/2 flex justify-center items-end">
                    <p className="text-neutral-100 pb-52 text-5xl font-bold p-5 ">
                        Ruta Cliente 2022
                    </p>
                </div>
                <div
                    className={`bg-pattern absolute top-0 right-0 h-full w-1/2 flex p-5 justify-center items-center`}>
                    <div className="flex flex-col ">
                        <Image
                            src={homeTitleImage}
                            alt="Title Logo"
                            width={540}
                            height={163}
                            priority
                        />

                        <Link href="/inscripcion">
                            <button className=" bg-green-600 hover:bg-green-700 rounded-b-lg text-white p-5 mt-32 text-2xl	font-bold shadow-2xl">
                                Inscripción
                            </button>
                        </Link>

                        <div className="flex gap-10 mt-28 justify-center">
                            <Image
                                src={homeLogoImage}
                                alt="Falabella Logo"
                                layout="raw"
                                priority
                            />
                            <Image
                                src={homeLogoBancoImage}
                                alt="Banco Logo"
                                layout="raw"
                                priority
                            />
                        </div>

                        <div
                            className={`absolute bottom-2.5 right-2/4 h-full flex justify-end items-end`}>
                            {user ? (
                                <Link href="/dashboard">
                                    <a className="ml-4 text-sm text-neutral-300 underline">
                                        Admin Panel
                                    </a>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/login">
                                        <a className="text-sm text-neutral-300 underline">
                                            Iniciar Sesión
                                        </a>
                                    </Link>

                                    {/* <Link href="/register">
                                        <a className="ml-4 text-sm text-neutral-300 underline">
                                            Registro
                                        </a>
                                    </Link> */}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
