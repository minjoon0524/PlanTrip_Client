import api from "../utils/api";
import { useQuery } from "@tanstack/react-query";
 const SERVICE_KEY=process.env.REACT_APP_API_KEY

const fetchSearchKeyword=()=>{
    return api.get(`/searchKeyword1?MobileOS=ETC&MobileApp=Test&_type=json&keyword=%ED%95%B4%EC%88%98%EC%9A%95%EC%9E%A5&contentTypeId=12&serviceKey=${SERVICE_KEY}`)
}

export const useSearchKeywordQuery = () => {
    return useQuery({
      queryKey:['area-search'],
      queryFn : fetchSearchKeyword,
      select: (result) => result.response
      //response.body.items.item
     
    });
  };