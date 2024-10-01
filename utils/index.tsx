import {jwtDecode} from 'jwt-decode';

export const decodeBackendToken = (backendToken: string) => {
    const decoded = jwtDecode(backendToken);
    return decoded
}

export const extractUserTypeFromBackEndToken = (backendToken: string) => {
    return decodeBackendToken(backendToken)?.userType;
}