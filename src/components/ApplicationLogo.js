import Image from 'next/image'
import logoImage from '../../public/logo2.png'
export default function ApplicationLogo(props) {
    return (
        <Image
            src={logoImage}
            alt="Logo Falabella"
            {...props}
            width={80}
            height={40}
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
        />
    )
}
