import Link from 'next/link'

const NavLink = ({ active = false, children, ...props }) => (
    <Link {...props}>
        <a
            className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out ${
                active
                    ? 'border-indigo-400 text-neutral-200 focus:border-neutral-200'
                    : 'border-transparent text-neutral-400 hover:text-neutral-300 hover:border-neutral-300 focus:text-neutral-100 focus:border-neutral-100'
            }`}>
            {children}
        </a>
    </Link>
)

export default NavLink
