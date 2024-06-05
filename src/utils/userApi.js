import axios from "axios";

const api = axios.create();

//로그인
export const login = (username, password) =>
  api.post(`/member/login?username=${username}&password=${password}}`);

// 사용자 정보
export const info = (userId) => api.get(`/member/${userId}`);

//회원가입
export const join = (data) => api.post(`/member`, data);

// 회원정보 수정
export const update = (data) => api.put(`/member`, data);

//회원탈퇴
export const remove = (userId) => api.delete(`/member/${userId}`);
