import {jwtDecode, JwtPayload} from 'jwt-decode';

interface IBackendDecoded extends JwtPayload {
    userType?: 'COORDINATOR' | 'TEACHER' | 'STUDENT';
}

export const decodeBackendToken = (backendToken: string):IBackendDecoded | undefined => {
    if (!backendToken)
        return;
    try {
        const decoded = jwtDecode(backendToken);
        
        return decoded;
    } catch (err) {
        console.log(err);
    }
}

export const extractUserTypeFromBackEndToken = (backendToken: string) => {
    const payload = decodeBackendToken(backendToken);
    
    if (!payload)
        return;

    return payload.userType;
}

export const extractUserIdFromBackEndToken = (backendToken: string) => {
    return decodeBackendToken(backendToken)?.sub;
}

export const extractExpiresFromBackEndToken = (backendToken: string) => {
    return decodeBackendToken(backendToken)?.exp;
}