import { toast } from 'react-toastify';
export type typeProps = 'info'|'success'|'error'|'warning'|'default';

export const notify = (type:typeProps, message:string) => {
    switch(type){
        case'info':
        return toast.info(message)
        case'error':
        return toast.error(message)
        case'success':
        return toast.success(message)
        case'warning':
        return toast.warning(message)
        case'default':
        return toast.info(message)
    }
};