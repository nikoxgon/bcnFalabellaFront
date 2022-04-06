import Image from 'next/image'
import homeLogoImage from '../../public/logo-falabella.png'
export default function ApplicationLogo(props) {
    return (
        <Image
            src={homeLogoImage}
            {...props}
            alt="Logo Falabella"
            width={189}
            height={106}
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
        />
    )
}
