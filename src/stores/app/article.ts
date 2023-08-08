import * as pb from '@/stores/proto/app/article';
import { http } from '@/utils/request';

export function ListArticle(
    req: pb.ListArticleRequest,
    success: (value: pb.ListArticleReply) => void,
    fail?: (why: any) => void
) {
    const c = http<pb.ListArticleReply>('get', `/v1/articles?page=${req.page}`);
    c.then(re => {
        return success(re);
    }).catch(fail);
}
