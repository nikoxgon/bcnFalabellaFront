import Link from 'next/link'

const ResponsiveNavLink = ({ active = false, children, ...props }) => (
    <Link {...props}>
        <a
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium leading-5 focus:outline-none transition duration-150 ease-in-out ${
                active
                    ? 'border-indigo-400 text-indigo-700 bg-indigo-50 focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700'
                    : 'border-transparent text-neutral-400 hover:text-neutral-300 hover:bg-neutral-700 hover:border-neutral-200 focus:text-neutral-200 focus:bg-neutral-500 focus:border-neutral-200'
            }`}>
            {children}
        </a>
    </Link>
)

export const ResponsiveNavButton = props => (
    <button
        className="block w-full pl-3 pr-4 py-2 border-l-4 text-left text-base font-medium leading-5 focus:outline-none transition duration-150 ease-in-out border-transparent text-neutral-400 hover:text-neutral-300 hover:bg-neutral-700 hover:border-neutral-200 focus:text-neutral-200 focus:bg-neutral-500 focus:border-neutral-200"
        {...props}
    />
)

export const ResponsiveNavDropdown = ({ children, ...props }) => (
    <div className="relative">
        <div>
            <button
                className="block w-full pl-3 pr-4 py-2 border-l-4 text-left text-base font-medium leading-5 focus:outline-none transition duration-150 ease-in-out border-transparent text-neutral-400 hover:text-neutral-300 hover:bg-neutral-700 hover:border-neutral-200 focus:text-neutral-200 focus:bg-neutral-500 focus:border-neutral-200"
                {...props}
            />
        </div>
        <div className="absolute inset-x-0 top-0 flex items-center px-2">
            <div className="ml-3 relative w-full">
                <div className="rounded-lg shadow-lg">
                    <div className="rounded-lg shadow-xs overflow-hidden">
                        <div className="z-20 relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default ResponsiveNavLink
