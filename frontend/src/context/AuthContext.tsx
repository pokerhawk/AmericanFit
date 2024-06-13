import { destroyCookie, parseCookies, setCookie } from "nookies";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { COOKIE_ACCESS_TOKEN, COOKIE_TOKEN, signInRequest } from "../services/auth";
import { jwtDecode } from "jwt-decode";
import { getUser } from "../services/user";
import { TUserPayload } from "../types/userPayloads.type";

type SignInProps = {
    email: string;
    password: string;
}

type UserProps = {
    email: string;
}

type AuthContextProps = {
    isAuthenticated: boolean;
    loading: boolean;
    signIn: (data: SignInProps) => Promise<void>;
    logOut: () => void;
    user: UserProps
}

export const AuthContext = createContext({} as AuthContextProps);

type AuthProviderProps = {
    children: ReactNode
}

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }: AuthProviderProps) {
    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<UserProps>({ email: '' });
    const [loading, setLoading] = useState(false);

    // const defineUser = async () => {
    //     const { [COOKIE_ACCESS_TOKEN]: token } = parseCookies();
    //     const tokenDecoded = jwtDecode<TUserPayload>(token);
    //     const res = await getUser({ id: tokenDecoded.sub });

    //     setUser({
    //         email: res.email
    //     });
    // }

    const signIn = async ({ email, password }: SignInProps) => {
        setLoading(true);
        try {
            const { id, type, access_token } = await signInRequest({ email, password });

            setCookie(null, COOKIE_ACCESS_TOKEN, access_token);
            setIsAuthenticated(true);

            navigate(`/${type}/${id}`);
        } catch (err: any) {
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const logOut = () => {
        setIsAuthenticated(false);
        destroyCookie(null, COOKIE_ACCESS_TOKEN)
        destroyCookie(null, COOKIE_TOKEN, { path: '/' });
        navigate('/login');
    }

    useEffect(() => {
        // defineUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                signIn,
                logOut,
                user,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
