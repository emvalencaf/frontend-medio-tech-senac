import {jwtDecode} from 'jwt-decode';

export const decodeBackendToken = (backendToken: string) => {
    if (!backendToken)
        return;
    try {
        const decoded = jwtDecode(backendToken);
        
        return decoded
    } catch (err) {
        console.log(err);
    }
}

export const extractUserTypeFromBackEndToken = (backendToken: string) => {
    return decodeBackendToken(backendToken)?.userType;
}

export const extractUserIdFromBackEndToken = (backendToken: string) => {
    return decodeBackendToken(backendToken)?.sub;
}

export const extractExpiresFromBackEndToken = (backendToken: string) => {
    return decodeBackendToken(backendToken)?.exp;
}