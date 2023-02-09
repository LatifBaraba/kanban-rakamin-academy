import { toast, Slide } from 'react-toastify'

const Toast = (action, message, pos = 'top-right') => {
    const options = {
        autoClose: true,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
    }

    switch (action) {
        case 'success':
            return toast.success(message, { position: pos, ...options })
        case 'info':
            return toast.info(message, { position: pos, ...options })
        case 'warning':
            return toast.warn(message, { position: pos, ...options })
        case 'error':
            return toast.error(message, { position: pos, ...options })
        default:
            break
    }
}

export default Toast
