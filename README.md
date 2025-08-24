# moodify-frontend
moodify 프론트엔드 (Next.js)

**0815-16**
현재 Next 버전 충돌로 인해서 재작업 진행중


**0815-18**
Next.js 
**invariant expected layout router to be mounted 트러블슈팅 기록..(아직 계속해보는중..)**


**0820**
- 에러 추가 확인
There are multiple modules with names that only differ in casing. this can lead to unexpected behavior when compiling on a filesystem...

***0824***
해결완료
**0825** 
프로젝트 시작
```


OS: Windows

Node.js: v22.14.0 (NVM for Windows, 경로 C:\nvm4w\nodejs\node.exe)

npm: 10.9.2 (경로 C:\nvm4w\nodejs\npm(.cmd))

Next.js: 15.4.6 (새 프로젝트)

프로젝트 경로: C:\Users\jinhyeon\Desktop\moodify-frontend

구조: src/app/layout.tsx, src/app/page.tsx (App Router)
```

**증상**
```
npm run dev 실행 후 브라우저 런타임 에러 발생
메시지: “invariant expected layout router to be mounted”
콜스택에 OuterLayoutRouter 표기.
```

**가설(초기)**
```
App Router 컨텍스트가 제대로 마운트되지 않음 → 대표 원인

루트 app/layout.tsx가 Server Component가 아님(예: "use client"), 혹은 <html><body>{children}</body></html> 형태가 아님
=> 확인 결과 형태가 맞음

pages/와 App Router 혼용

루트에서 클라이언트 훅(next/navigation 등)이나 클라이언트 컴포넌트를 먼저 실행

설정/패키지 충돌
```


**시도 내역 (시간순)**
```
1. 프로젝트 의존성/락파일 삭제 시도

- 명령: rmdir /s /q node_modules, del /f /q package-lock.json
- 결과: 초기화 진행 (증상 지속) → 실패

2. 전역 환경/캐시 정리 검토
- %AppData%\npm, %AppData%\npm-cache 확인 → 폴더 없음(NVM 사용으로 경로가 다름)
- npm uninstall -g next / create-next-app 검토, 전역 패키지 목록 확인(ts-node, tsx, typescript, vercel만 존재)
- 결과: 전역 충돌 요인 없음 → 무관

3. Node/npm 실제 위치 확인

- where node, where npm → 둘 다 NVM 경로로 일치
- VS Code 터미널과 일반 CMD 모두 동일 경로 사용 확인
- 결과: 셸/경로 이슈 아님 → 무관

4. 완전 새 프로젝트 생성 (인프런 강의 세팅)

- npx create-next-app@latest (App Router, src 디렉터리)
- 결과: 동일 에러 재발생

5. App Router 최소본으로 교체

src/app/layout.tsx를 Server Component로, 아래 형태로 고정 (기본형)
export const metadata = { title: "Next App", description: "Fresh App Router" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

- src/app/page.tsx는 간단한 텍스트만 렌더
- .next 삭제 후 재기동
- 결과: 여전히 동일 에러 → 실패

6. 프로젝트 내 ‘layout-router’ 충돌 여부 점검
- dir /s /b src\client\components\layout-router.* / findstr /s /n /i "layout-router" src\*.*
- 결과: 없음 (콜스택 경로는 Next 내부 소스맵) → 무관

7. pages 폴더 혼용 여부 점검
- dir /s /b pages → node_modules 내부만 존재, 프로젝트 내에는 없음 (gpt 에게 명령어 검색)
- 결과: 혼용 아님 → 무관

8. 루트 레이아웃의 "use client" 여부 점검
- ctrl+ shift + f (Visual studio)에서 use client 라는 단어 자체가 없음
- 결과: 레이아웃은 서버 컴포넌트가 맞음 → 무관

9. Next 설정 파일 영향 배제
- next.config.ts → next.config.ts.bak 로 임시 비활성화
- 결과: 비활성화 후에도 동일 에러 → 실패,
!!! (중요!) 그러나 vs code 말고 cmd 명령어로는 next가 동작하는것을 확인함!

10. VS Code 전용 설정/확장 영향 점검

- .vscode/settings.json 확인 → 폴더 자체 없음
- 결과: VS Code 설정 충돌 아님 → 무관

11. 떠있는 dev 서버 종료 시도
- taskkill /f /im node.exe → 프로세스 없음
(애초에 실행중인 프로세스가 없었음)
- 결과: 남아있는 서버 없음 → 무관

12. 패키지 중복/충돌 점검
- npm ls react react-dom next → next@15.4.6 / react@19.1.0 / react-dom@19.1.0 단일 버전 (deduped)
- 결과: 패키지 충돌 아님 → 무관

13. vs code 재설치
- 효과 없음

14. 환경 변수 수정
- next의 경우, 대소문자의 차이로 인해 C:Jinhyeon 과 C:jinhyeon의 구분에 혼동
- 환경 변수를 바꾸고 Jinhyeon -> jinhyeon 에서 npm run으로 문제 해결함
```


**다음 액션**
- Vs code 에서만 실행이 안되는 이유를 찾아야함


***문제  해결***
```
=> 사용자 이름이 Jinhyeon , jinhyeon 으로 되어있음, next의 경우, 대소문자의 차이로 인해 C:Jinhyeon 과 C:jinhyeon의 구분에 혼동이 옴
Jinhyeon에서 npm run dev => error 발생
jinhyeon에서 npm run dev  => error 발생하지 않음
- next의 대소문자 구분 중복 처리로 인해서 일정 훅이 나오지 로딩되지 않거나 중간에 문제가 생긴것으로 확인됨
- 해결 완료
```

>>>>>>> e7b2797dd54c0b1c5f8149740d1c29b01f0ffc72
