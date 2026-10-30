# UNIIT 사이트 시안 (개발 전달용)

PPT(제휴 제안서/고객 안내)와 같은 컬러·폰트·문구로 만든 정적 시안입니다.
`index.html` 하나에 HTML/CSS/JS가 모두 들어 있고, `#/about` 같은 해시 라우팅으로 페이지를 나눴습니다.

## 페이지 (상단 메뉴: Home / Brand / Styling / Magazine / About | Shop)
| 경로 | 내용 |
|---|---|
| `#/` | 홈: 히어로, Your Story, Brand Story, Harmony, Mood Styling, Reviews, Shop, 신청 CTA |
| `#/brand` | Brand Story, Identity(미션·심볼·슬로건), From CEO |
| `#/styling` | In-mood / Out-mood Basic / Premium, 진행 순서(Program), 진단 상품 3종 |
| `#/magazine` | 구독형 매거진 준비 중 + 오픈 알림 신청 |
| `#/about` | 회사 개요, 사업 영역 3개, 오시는 길(약도·운영시간·지도 링크) |
| `#/shop` | PB 상품(빈티지 키링 8,000 · 티셔츠 19,000 · 진단 북 33,000) + 진단 프로그램 3종 |
| `#/apply` | 무드스타일링 신청 폼 |
| `#/login` | 카카오 로그인 + 이메일 로그인 |

옛 주소 `#/program` → `#/styling`, `#/location` → `#/about`으로 자동 연결됩니다.

## 디자인 토큰 (`:root`)
- 배경: `--pink #F8E8E2` `--cream #FCF6E9` `--sage #DEE4BD` `--lav #DDD3E3`
- 텍스트: `--ink #000` `--ink2 #343434`
- 폰트: 제목 MaruBuri(마루부리), 본문 Pretendard — `fonts/`에 woff2 포함 (둘 다 SIL OFL, 상업적 사용 가능)

## 연결이 필요한 부분 (코드에 `개발자:` 주석)
1. **상품/가격**: `<script>`의 `PRODUCTS` 배열 (`price: null` → 숫자 입력 시 자동 표시, `img`: 사진 배열(2장이면 마우스 올릴 때 두 번째 사진), `status: "soldout"` → SOLD OUT 표시 + 재입고 알림 신청 폼)
   - 재입고 알림 신청 제출 시 저장 API 연결 필요 (수요 확인 데이터)
   - MOOD STYLE 남성 진단 북: 디지털 상품 → 결제 후 진단 페이지(HTML) 접속 링크 제공 방식 권장
2. **장바구니·결제**: 현재 메모리 카운트만 동작 → PG(포트원/토스페이먼츠) 연동
3. **로그인**: 카카오 로그인 SDK, 이메일 로그인 API
4. **신청 폼 / 오픈 알림 폼**: 제출 시 완료 화면만 표시 → 저장 API(또는 구글시트·노션 등) 연결
5. **후기**: `data-slot="reviews"` 영역에 기존 사이트 후기 데이터 연결
6. **지도**: 오시는 길은 약도 이미지 + 지도 앱 링크로 구성 (원하면 카카오맵 임베드 추가)
7. **푸터**: 사업자등록번호, 통신판매업 신고번호, 문의 이메일, 이용약관·개인정보처리방침 링크
8. **사진**: `.ph` 회색 영역 → `<img>` 넣으면 `object-fit: cover`로 채워짐

## 기존 사이트에서 같이 고칠 것
- 로고/표기 `UNIT` → `UNIIT`
- 중복 메뉴 제거, 연결 안 된 `#apply` 앵커 → 이제 `#/apply` 페이지로 연결

## 상품 상세 · 수요 확인 (추가)
- 상품 사진/이름 클릭 → 상세 팝업(사진 여러 장, 사이즈 선택, 담기)
- 사이즈가 있는 상품(`sizes`)은 사이즈를 골라야 담기 가능
- `track(event, data)` 함수에서 아래 이벤트를 GA4 또는 자체 DB로 보내면 수요 확인 가능
  - `view_item` (상세 열람) · `select_size` (사이즈 선택) · `add_to_cart` (담기, 사이즈 포함)
  - 키링 `재입고 알림 신청` 연락처 저장
- 진단 북 상품 이미지는 실제 진단 HTML(mood_style_남자_책자형)로 예시 결과지를 만든 화면
