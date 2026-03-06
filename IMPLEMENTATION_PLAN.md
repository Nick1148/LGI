# 한국 로컬 MCP 서버 허브 - 구현 계획서

## 프로젝트 개요

- **프로젝트명**: korea-mcp-hub (가칭)
- **목표**: 한국 로컬 서비스(네이버, 카카오, 공공데이터 등)를 AI 에이전트가 사용할 수 있게 MCP 서버로 제공
- **개발자**: 1인 (클로드코드 활용)
- **기술 스택**: TypeScript + @modelcontextprotocol/sdk

---

## 프로젝트 구조 (Monorepo)

```
korea-mcp-hub/
├── packages/
│   ├── naver-search/          # 네이버 검색 MCP 서버
│   │   ├── src/
│   │   │   ├── index.ts       # 진입점
│   │   │   ├── tools/         # MCP Tools 정의
│   │   │   │   ├── web-search.ts
│   │   │   │   ├── news-search.ts
│   │   │   │   ├── blog-search.ts
│   │   │   │   └── shopping-search.ts
│   │   │   └── utils/
│   │   │       └── naver-api.ts  # 네이버 API 클라이언트
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── README.md
│   │
│   ├── naver-map/             # 네이버 지도 MCP 서버
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   └── tools/
│   │   │       ├── place-search.ts
│   │   │       ├── directions.ts
│   │   │       └── geocoding.ts
│   │   └── package.json
│   │
│   ├── kakao-map/             # 카카오맵 MCP 서버
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   └── tools/
│   │   │       ├── place-search.ts
│   │   │       ├── keyword-search.ts
│   │   │       └── category-search.ts
│   │   └── package.json
│   │
│   ├── public-data/           # 공공데이터 MCP 서버
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   └── tools/
│   │   │       ├── weather.ts        # 기상청 날씨
│   │   │       ├── transit.ts        # 대중교통
│   │   │       ├── business-reg.ts   # 사업자등록 확인
│   │   │       └── real-estate.ts    # 부동산 실거래가
│   │   └── package.json
│   │
│   └── shared/                # 공유 유틸리티
│       ├── src/
│       │   ├── api-client.ts  # HTTP 클라이언트 래퍼
│       │   ├── error.ts       # 에러 핸들링
│       │   └── types.ts       # 공용 타입
│       └── package.json
│
├── apps/
│   └── hub-web/               # 허브 웹사이트 (Phase 3)
│       ├── app/
│       ├── components/
│       └── package.json
│
├── package.json               # 루트 (워크스페이스)
├── turbo.json                 # Turborepo 설정
├── tsconfig.base.json
└── README.md
```

---

## Phase 1: MVP (Week 1~2)

### Week 1: 프로젝트 셋업 + 네이버 검색 MCP

#### Day 1-2: 프로젝트 초기 셋업
```bash
# 1. 새 레포 생성
mkdir korea-mcp-hub && cd korea-mcp-hub
git init

# 2. Monorepo 설정 (npm workspaces + turborepo)
npm init -y
npm install -D turbo typescript @types/node

# 3. 첫 번째 패키지: @korea-mcp/naver-search
mkdir -p packages/naver-search/src/tools
```

#### Day 2-3: 네이버 검색 MCP 서버 개발

**필요한 네이버 API 키:**
- 네이버 개발자 센터 (https://developers.naver.com) 에서 발급
- Client ID + Client Secret

**구현할 Tools:**

| Tool 이름 | 설명 | 입력 파라미터 |
|-----------|------|-------------|
| `naver_web_search` | 네이버 웹 검색 | query, display(1-100), start, sort |
| `naver_news_search` | 뉴스 검색 | query, display, start, sort |
| `naver_blog_search` | 블로그 검색 | query, display, start, sort |
| `naver_shopping_search` | 쇼핑 검색 | query, display, start, sort, filter |
| `naver_image_search` | 이미지 검색 | query, display, start, sort, filter |

**핵심 코드 구조:**
```typescript
// packages/naver-search/src/index.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "@korea-mcp/naver-search",
  version: "1.0.0",
});

// 웹 검색 Tool 등록
server.tool(
  "naver_web_search",
  "네이버 웹 검색. 한국어 웹 콘텐츠를 검색합니다.",
  {
    query: z.string().describe("검색어"),
    display: z.number().min(1).max(100).default(10).describe("결과 수"),
    sort: z.enum(["sim", "date"]).default("sim").describe("정렬 (sim: 정확도, date: 날짜순)"),
  },
  async ({ query, display, sort }) => {
    const results = await naverApi.search("webkr", { query, display, sort });
    return {
      content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
    };
  }
);

// 서버 시작
const transport = new StdioServerTransport();
await server.connect(transport);
```

#### Day 4-5: 테스트 + npm 배포

```bash
# 빌드
npm run build

# 로컬 테스트 (Claude Desktop에서)
# claude_desktop_config.json:
{
  "mcpServers": {
    "naver-search": {
      "command": "npx",
      "args": ["@korea-mcp/naver-search"],
      "env": {
        "NAVER_CLIENT_ID": "your-id",
        "NAVER_CLIENT_SECRET": "your-secret"
      }
    }
  }
}

# npm 배포
npm publish --access public
```

### Week 2: 공공데이터 MCP + 문서화

#### Day 6-7: 기상청 날씨 MCP
- 공공데이터포털 API 키 발급
- 초단기실황, 단기예보 Tool 구현

#### Day 8-9: 대중교통 MCP
- 서울 버스/지하철 실시간 도착 정보
- 전국 기차 시간표

#### Day 10: 문서화 + GitHub 공개
- README.md (한국어/영어)
- 설치 가이드 (스크린샷 포함)
- 블로그 포스트 작성
- GitHub 레포 공개 + 스타 모으기

---

## Phase 2: 확장 (Week 3~4)

### Week 3: 카카오 + 네이버 지도

| 패키지 | 구현할 Tools |
|--------|------------|
| `@korea-mcp/kakao-map` | 키워드 검색, 카테고리 검색, 좌표→주소 변환 |
| `@korea-mcp/naver-map` | 장소 검색, 길찾기(자동차/대중교통/도보), 지오코딩 |

### Week 4: 허브 웹사이트 v1

- Next.js 15 앱 생성
- 서버 카탈로그 페이지 (현재 제공 중인 MCP 서버 목록)
- 설치 가이드 (각 서버별 step-by-step)
- 블로그 섹션 (MCP 소개, 활용 사례)
- Vercel 배포

---

## Phase 3: 수익화 (Week 5~8)

### Week 5-6: 프리미엄 서버
- `@korea-mcp/finance` (주식 시세, 환율, 금리)
- `@korea-mcp/real-estate` (아파트 실거래가, 시세)
- 이 서버들은 API 키 + 프록시 서버 방식으로 유료화

### Week 7-8: 결제 + 관리 시스템
- Supabase에 사용자/API키/사용량 테이블
- Stripe 또는 토스페이먼츠 연동
- API 프록시 서버 (사용량 카운트 + 제한)
- 대시보드 (내 API 키, 사용량 차트)

---

## 핵심 성공 지표 (KPI)

| 기간 | GitHub Stars | npm Downloads/월 | 유료 사용자 | MRR |
|------|-------------|-----------------|-----------|-----|
| 1개월 | 100 | 500 | 0 | $0 |
| 3개월 | 500 | 5,000 | 50 | $500 |
| 6개월 | 2,000 | 20,000 | 200 | $2,500 |
| 12개월 | 5,000 | 50,000 | 1,000 | $12,000 |

---

## 마케팅 전략

1. **Build in Public** - X(트위터), 블로그에 개발 과정 공유
2. **한국 개발자 커뮤니티** - 카카오 오픈채팅, Discord, GeekNews
3. **기술 블로그** - velog, Medium에 MCP 튜토리얼 연재
4. **Smithery.ai 등록** - 글로벌 MCP 레지스트리에 등록
5. **컨퍼런스** - if(kakao), DEVIEW, FEConf 등 발표 신청

---

## 필요한 외부 API 키 목록

| 서비스 | API 발급처 | 무료 한도 | 용도 |
|--------|-----------|----------|------|
| 네이버 검색 | developers.naver.com | 25,000건/일 | 검색 MCP |
| 네이버 지도 | developers.naver.com | 무료 (개인) | 지도 MCP |
| 카카오맵 | developers.kakao.com | 300,000건/일 | 카카오 MCP |
| 공공데이터포털 | data.go.kr | 1,000건/일 | 공공 MCP |
| 기상청 | data.go.kr | 10,000건/일 | 날씨 MCP |
| 한국거래소 | data.krx.co.kr | 무제한 | 금융 MCP |

---

## 리스크 & 대응

| 리스크 | 대응 방안 |
|--------|---------|
| API 사용 제한 초과 | 캐싱 레이어 추가, Rate limiting |
| 네이버/카카오 API 변경 | 버전 관리, 자동 테스트 |
| 경쟁자 등장 | 빠른 선점 + 커뮤니티 구축으로 Lock-in |
| MCP 프로토콜 변경 | 공식 SDK 사용으로 자동 대응 |
| 수익화 실패 | 컨설팅/외주 개발로 수익 다각화 |

---

## 바로 시작하기

```bash
# Step 1: 새 레포 생성
mkdir korea-mcp-hub && cd korea-mcp-hub

# Step 2: 클로드코드로 프로젝트 초기화
claude "TypeScript monorepo 프로젝트를 셋업해줘.
npm workspaces + turborepo 사용.
첫 번째 패키지는 @korea-mcp/naver-search.
MCP 공식 SDK를 사용하고, 네이버 검색 API를 연동해줘."

# Step 3: 네이버 개발자 센터에서 API 키 발급
# https://developers.naver.com/apps/#/register

# Step 4: 개발 시작!
```
