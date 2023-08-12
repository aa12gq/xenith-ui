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
    return cookie.remove(TokenKey);
}
