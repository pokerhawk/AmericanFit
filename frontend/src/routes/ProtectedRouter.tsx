import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { parseCookies } from 'nookies'
import { GlobalStyles } from '../styles/Global'
import { COOKIE_ACCESS_TOKEN } from '../services/auth'

type ProtectedRouteProps = {
    children?: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { [COOKIE_ACCESS_TOKEN]: token } = parseCookies();

    if (!token) {
        return <Navigate to="/login" replace />
    }

    return (
        <>
            {<GlobalStyles />}
            {children}
        </>
    )
}

export default ProtectedRoute;