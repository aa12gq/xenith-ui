import * as pb from '@/stores/proto/app/community';
import { http } from '@/utils/request';

export function ListCommunity(
    req: pb.ListCommunityRequest,
    success: (value: pb.ListCommunityReply) => void,
    fail?: (why: any) => void
) {
    const c = http<pb.ListCommunityReply>('get', `/v1/communitys`);
    c.then(re => {
        return success(re);
    }).catch(fail);
}
