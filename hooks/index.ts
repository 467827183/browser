// 获取数据详情
import { axiosCustom } from '../common';
import { REFRESH_CONFIG, SERVER_NEWS_API } from '../common/constant';
import { useQuery } from '@tanstack/react-query';

export function useDataView(){
    async function fetchData(){
        const res = await axiosCustom({api:SERVER_NEWS_API,cmd: "/api/dataview"});
        return res.summary
    }
    return useQuery(["useDataView"], fetchData, {
        refetchInterval: REFRESH_CONFIG.longRefreshInterval,
    })
}
