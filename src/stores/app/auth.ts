import * as pb from '@/stores/proto/app/auth';
import { http } from '@/utils/request';

export function Login(
    req: pb.LoginByPasswordRequest,
    success: (value: pb.LoginByPasswordReply) => void,
    fail?: (why: any) => void
) {
    const c = http<pb.LoginByPasswordReply>('post', '/v1/auth/login/using-password', req);
    c.then(re => {
        return success(re);
    }).catch(fail);
}
