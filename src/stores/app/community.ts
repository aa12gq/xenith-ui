import { defineStore } from 'pinia';
import * as pb from '@/stores/proto/app/community';
import { http } from '@/utils/request';
import { ref } from 'vue';

export const useCommunityStore = defineStore('community', () => {
    const communitys = ref<pb.ListCommunityReply>(pb.ListCommunityReply.create());
    const currentCommunity = ref<pb.Community>(pb.Community.create({}));

    const RefreshCommunity = () => {
        ListCommunity(
            pb.ListCommunityRequest.create(),
            (d: pb.ListCommunityReply) => {
                communitys.value = d;
                currentCommunity.value = (<pb.Community[]>communitys.value)[0];
                selectCommunity(currentCommunity.value);
            },
            (why: { response: { data: any } }) => {
                console.log('获取社区列表失败', why.response.data);
            }
        );
    };

    const selectCommunity = (item: pb.Community) => {
        currentCommunity.value = item;
        let $favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
        if ($favicon !== null) {
            $favicon.href = currentCommunity.value.logo;
        }
        document.title = currentCommunity.value.name + '技术社区';
    };

    return {
        communitys,
        currentCommunity,
        RefreshCommunity,
        selectCommunity,
    };
});

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
