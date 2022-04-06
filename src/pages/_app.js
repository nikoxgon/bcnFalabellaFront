import 'tailwindcss/tailwind.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { ModalProvider } from 'react-modal-hook'
import { ToastContainer } from 'react-toastify'

import '@/style.css'

const App = ({ Component, pageProps }) => (
    <ModalProvider>
        <Component {...pageProps} />
        <ToastContainer
            position="top-right"
            autoClose={8000}
            hideProgressBar={false}
            newestOnTop={false}
            draggable={false}
            pauseOnVisibilityChange
            closeOnClick
            pauseOnHover
        />
    </ModalProvider>
)

export default App
