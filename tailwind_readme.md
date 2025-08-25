```
tailWindCSS 기본 틀

색상 팔레트: bg-{color}-{number}, text-{color}-{number}, hover:bg-{color}-{number}
(예: blue-500, red-600, gray-200)

여백: px-4, py-2 (padding-x, padding-y)

둥근 모서리: rounded-md, rounded-lg, rounded-full

글꼴: font-normal, font-semibold, font-bold

상태: hover:, focus:, disabled:, active:


🎨 색상 (Color)

배경: bg-blue-500, bg-red-600, bg-gray-100

글자: text-white, text-black, text-gray-700

테두리: border, border-gray-300, border-red-500

hover: hover:bg-blue-600, hover:text-gray-900

🔠 글꼴 (Typography)

크기: text-sm, text-base, text-lg, text-xl, text-2xl, text-4xl

굵기: font-light, font-normal, font-semibold, font-bold

정렬: text-left, text-center, text-right

📏 여백 (Spacing)

패딩: p-2(전체), px-4(좌우), py-2(상하)

마진: m-4(전체), mt-2(위), mb-4(아래), mx-auto(가운데 정렬)

예: px-4 py-2 → 좌우 1rem, 상하 0.5rem

🖼️ 박스 모양 (Box)

둥근 모서리: rounded-sm, rounded-md, rounded-lg, rounded-full

그림자: shadow, shadow-md, shadow-lg

테두리 두께: border, border-2, border-4

📐 레이아웃 (Layout)

Flex: flex, flex-col, flex-row, items-center, justify-center, gap-4

Grid: grid, grid-cols-2, grid-cols-3, gap-6

폭/높이: w-full, w-1/2, h-screen, min-h-dvh

🌙 상태/반응형

상태: hover:, focus:, active:, disabled:

반응형: sm:, md:, lg:, xl:

예:

<button className="bg-blue-500 text-white px-4 py-2 rounded-md 
                   hover:bg-blue-600 sm:px-6 md:px-8">
  Responsive Button
</button>


👉 모바일에선 패딩 작게, 데스크탑에선 크게

📌 버튼 조합 예시 다시 보기
<button className="
  bg-blue-500 text-white font-bold 
  px-4 py-2 rounded-lg shadow 
  hover:bg-blue-600
">
  Click Me
</button>


✅ 요약:

bg-*, text-*, p*, m*, rounded-* → 제일 많이 쓰는 핵심

나머지는 상황에 따라 flex/grid, shadow, hover 등을 붙이는 느낌

```