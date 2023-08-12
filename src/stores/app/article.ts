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

export function GetArticle(
    req: pb.GetArticleRequest,
    success: (value: pb.GetArticleReply) => void,
    fail?: (why: any) => void
) {
    const c = http<pb.GetArticleReply>('get', `/v1/articles/${req.id}`);
    c.then(re => {
        return success(re);
    }).catch(fail);
}

export function CreateArticle(
    req: pb.CreateArticleRequest,
    success: (value: pb.CreateArticleReply) => void,
    fail?: (why: any) => void
) {
    const c = http<pb.CreateArticleReply>('post', `/v1/articles/create`, req);
    c.then(re => {
        return success(re);
    }).catch(fail);
}

export function UpdateArticle(
    req: pb.UpdateArticleRequest,
    success: (value: pb.UpdateArticleReply) => void,
    fail?: (why: any) => void
) {
    const c = http<pb.UpdateArticleReply>('put', `/v1/articles/update`, req);
    c.then(re => {
        return success(re);
    }).catch(fail);
}

export function DeleteArticle(
    articleId: bigint,
    success: (value: pb.Success) => void,
    fail?: (why: any) => void
) {
    const c = http<pb.Success>('delete', `/v1/articles/${articleId}`);
    c.then(re => {
        return success(re);
    }).catch(fail);
}
