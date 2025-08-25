//moods 에러 페이지

"use client"; 
//error는 사용자가 처리해야하는 클라이언트이기 때문에 명시해주는 지시문 필요

export default function Error( {error} : {error : Error}) {
    return <div className="text-red-600"> 에러 발생 : {error.message}</div>;
}

/*
구조 분해 문법 
{error} : {error : Error} 에서 
왼쪽 {error} : 오른쪽 props 객체에서 error라는 key만 변수로 받겠다!
오른쪽 {error: Error}는 이 함수가 받는 props 객체의 타입을 말함


*/