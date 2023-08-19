import * as pb from '@/stores/proto/app/link';
import { StringRules } from '@/stores/proto/third_party/validate/validate';
import { http } from '@/utils/request';

export function ListLink(success: (value: pb.ListLinkReply) => void, fail?: (why: any) => void) {
    const c = http<pb.ListLinkReply>('get', `/v1/links`);
    c.then(re => {
        return success(re);
    }).catch(fail);
}
