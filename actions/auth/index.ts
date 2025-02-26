import axios from "axios";
import { CredentialSignInParams, PayloadSignIn, UserFormData } from "./schemas";
import { ErrorCustom } from "../types";

const BACKEND_URL = process.env.BACKEND_URL;

export const handleSignIn = async (credentials: CredentialSignInParams) => {
    try {
        console.log(BACKEND_URL);
        const res = await axios.post(`${BACKEND_URL}/auth/sign-in`, credentials);

        const data: PayloadSignIn = res.data;

        return {
            user: {
                email: data.user.email,
                name: data.user.name,
            },
            backendToken: data.accessToken,
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (error?.response) {
            const { statusCode, message, error: errorType } = error.response?.data;

            // Lança um erro customizado
            throw new ErrorCustom(statusCode, Array.isArray(message) ? message.join(', ') : message, errorType.toLowerCase());
        } else if (error.request) {
            throw new ErrorCustom(0, 'Connection problem, please check your internet.', 'ConnectionError');
        } else {
            throw new ErrorCustom(0, 'Error configuring the request: ' + error.message, 'ConfigurationError');
        }
    }
};

export const handleSignUp = async (signUp: UserFormData, token: string) => {
    try {
        const { firstName, lastName, userType, password, email } = signUp;

        const res = await axios.post(`${BACKEND_URL}/auth/sign-up`, {
            firstName, lastName, userType, password, email,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = res.data;

        return data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (error?.response) {
            const { statusCode, message, error: errorType } = error.response?.data;

            // Lança um erro customizado
            throw new ErrorCustom(statusCode, Array.isArray(message) ? message.join(', ') : message, errorType.toLowerCase());
        } else if (error.request) {
            throw new ErrorCustom(0, 'Connection problem, please check your internet.', 'ConnectionError');
        } else {
            throw new ErrorCustom(0, 'Error configuring the request: ' + error.message, 'ConfigurationError');
        }
    }
}

export const handleSignOut = async (token: string) => {
    try {
        console.log("tá chegando aqui, caralho?!")
        const res = await axios.post(`${BACKEND_URL}/auth/sign-out`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        const data = res.data;

        return data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        /*
        if (error?.response) {
            const { statusCode, message, error: errorType } = error.response?.data;

            // Lança um erro customizado
            throw new ErrorCustom(statusCode, Array.isArray(message) ? message.join(', ') : message, errorType.toLowerCase());
        } else if (error.request) {
            throw new ErrorCustom(0, 'Connection problem, please check your internet.', 'ConnectionError');
        } else {
            throw new ErrorCustom(0, 'Error configuring the request: ' + error.message, 'ConfigurationError');
        }*/
       console.log(error);
    }   
}