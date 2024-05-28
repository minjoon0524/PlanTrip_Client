import api from "../utils/api";
import { useQuery } from "@tanstack/react-query";

const SERVICE_KEY = process.env.REACT_APP_API_KEY;

const fetchSearchKeyword = ({ searchQuery, page, selectByArea }) => {
  console.log("SearchQuery Test ...", searchQuery);
  const keyword = searchQuery ? decodeURIComponent(searchQuery) : (selectByArea || "인천");
  console.log(page);
  return api.get(`/searchKeyword1`, {
    params: {
      numOfRows: 20,
      pageNo: page,
      MobileOS: "ETC",
      MobileApp: "PLAN-TRIP",
      _type: "json",
      keyword: keyword,
      contentTypeId: 12,
      arrange: "Q",
      serviceKey: SERVICE_KEY,
    },
  });
};

export const useSearchKeywordQuery = ({ searchQuery, page, selectByArea }) => {
  return useQuery({
    queryKey: ['area-search', { searchQuery, page, selectByArea }],
    queryFn: () => fetchSearchKeyword({ searchQuery, page, selectByArea }),
    select: (result) => result.data.response,
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터가 신선하게 유지
    cacheTime: 1000 * 60 * 10, // 10분 동안 캐시에 데이터 저장
    refetchOnWindowFocus: false, // 창에 포커스가 돌아왔을 때 다시 가져오지 않음
    refetchOnMount: false, // 컴포넌트가 마운트될 때 다시 가져오지 않음
  });
};
