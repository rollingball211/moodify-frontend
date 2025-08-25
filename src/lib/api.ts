const callAPI = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

/* 
path : 요청할 경로 (/api/moods)
init? : fetch 옵션 (method ,body,headers) 를 설정하는 옵션
fetch : api 기본주소 + path를 통해 api를 호출함

next는 revalidate를 이용해 요청 캐시를 관리. (appRouter 옵션)
-> 0이면 항상 최신 뎅이터

headers 
기본 "Content-Type": "application/json" 강제.
→ ...(init?.headers ?? {})로, 외부에서 추가한 헤더가 있으면 합침.


*/


async function http<T>(path:string, init?: RequestInit):Promise<T> {
    const res = await fetch(`${callAPI}${path}`, {
        next: { revalidate : 0},
        ...init,
        headers : {"Content-Type": "application/json",...(init?.headers ??  {})},
    });

    if(!res.ok) {
        const text = await res.text().catch( () => "");
        throw new Error(`API ${path} failed ${res.status} ${text}` );
    }
    return res.json() as Promise<T>; //지정한 타입으로 반환해 안전성 확보함
}

/*

api 객체: 프로젝트 전반에서 재사용할 수 있도록 함수 모아둔 것.

moods : /api/moods 호출 → Mood[] 반환

musicByMood(moodId) : /api/mood-music/{moodId} 호출 → Music[] 반환

musicDetail(id) : /api/music/{id} 호출 → 단일 Music 반환
 
전역함수 가능

api.moods() 이런식으로..


*/


export const api = {
    moods: () => http<import("./types").Mood[]>("/api/moods"),
    musicByMood : (moodId : number) =>
        http<import("./types").Music[]>(`/api/mood-music/${moodId}`),
    musicDetail : (id:number) => 
        http<import("./types").Music>(`/api/music/${id}`),
};