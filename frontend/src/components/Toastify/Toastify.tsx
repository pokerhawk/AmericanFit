import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ToastifyProps = {
    position:positionProps;
    theme:themeProps;
    displayTime: number
}

export type positionProps = 'top-left'|'top-right'|'top-center'|'bottom-left'|'bottom-right'|'bottom-center';
export type themeProps = 'light'|'dark'|'colored'

const Toastify = ({
    position, theme, displayTime
}:ToastifyProps) =>{
    //'🦄 Wow so easy!'
    return (
        <ToastContainer
            position={position}
            autoClose={displayTime}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={theme}
            transition={Bounce}
        />
    )
}

export default Toastify;