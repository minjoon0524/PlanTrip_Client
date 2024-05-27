import api from "../utils/api";
import { useQuery } from "@tanstack/react-query";

const SERVICE_KEY = process.env.REACT_APP_API_KEY;

const fetchDetailCommon = () => {
  return api.get(`/detailCommon1`, {
    params: {
      MobileOS: "ETC",
      MobileApp: "PLAN-TRIP",
      _type: "json",
      contentId: 126508,
      contentTypeId: 12,
      defaultYN: "Y",
      firstImageYN: "Y",
      addrinfoYN: "Y",
      overviewYN: "Y",
      numOfRows: 10,
      pageNo: 1,
      serviceKey: SERVICE_KEY,
    },
  });
};

export const useCommonDetailQuery = () => {
  return useQuery({
    queryKey: ['common-detail'],
    queryFn: fetchDetailCommon,
    select: (result) => result.data.response.body.items.item,
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터가 신선하게 유지
    cacheTime: 1000 * 60 * 10, // 10분 동안 캐시에 데이터 저장
    refetchOnWindowFocus: false, // 창에 포커스가 돌아왔을 때 다시 가져오지 않음
    refetchOnMount: false, // 컴포넌트가 마운트될 때 다시 가져오지 않음
  });
};
