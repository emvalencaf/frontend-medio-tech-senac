import {jwtDecode} from 'jwt-decode';

export const decodeBackendToken = (backendToken: string) => {
    const decoded = jwtDecode(backendToken);
    return decoded
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