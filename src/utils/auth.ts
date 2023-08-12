import { useCookies } from '@vueuse/integrations/useCookies';

const TokenKey = 'token';
const cookie = useCookies();

export function getToken(): string {
    return cookie.get(TokenKey);
}

export function setToken(token: any) {
    return cookie.set(TokenKey, token);
}

export function removeToken(): boolean {
    try {
        cookie.remove(TokenKey);
        return true;
    } catch (error) {
        return false;
    }
}
