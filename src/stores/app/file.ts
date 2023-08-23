import { http } from '@/utils/request';

export function Upload(req: pb.GetArticleRequest, success: (value: pb.GetArticleReply) => void, fail?: (why: any) => void) {
  const c = http<pb.GetArticleReply>('get', `/v1/articles/${req.id}`);
  c.then(re => {
      return success(re);
  }).catch(fail);
}
