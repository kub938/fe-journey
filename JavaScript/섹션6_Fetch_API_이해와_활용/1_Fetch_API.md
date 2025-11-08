# Fetch API

## Fetch 함수의 두 번재 파라미터

```javascript
fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer 토큰",
  },
  body: JSON.stringify(data),
  credentials: "include",
  signal: controller.signal,
});
```

### REST

(REpresentational State Transfer)

- 웹의 장점을 활용하는 아키텍처 스타일 입니다.
- Rest란?

  - 자원의 표현을 통해 상태를 전달한다는 뜻
    서버의 자원을 URI로 표현하고 그 자원에 대한 행위는 HTTP 메서드(GET,POST, PUT, DELETE)로 구분합니다.

    즉 URL은 자원을 나타내고 HTTP 메서드는 무엇을 할지를 나타냅니다.

### 1. method

get(조회),post(생성),put(전체 교체),patch(부분 수정),delete(데이터 삭제)

get/delete = body 없이 보냄

post/put/patch = content-type, body 설정

### 2. headers

#### 일반적인 header 속성

Content-type : 데이터 형식(application/json) (받을때, 줄때)

Authorization: 토큰정보 전달

X-Custom-Header: 사용자 내부 규약용(여러 이름 가능)

http 표준적인 header는 여러가지가 있으므로 공부해보는 것이 좋음

#### header 종류

브라우저에서 자동으로 처리되는 헤더 + 보안상 직접 설정 불가능한 헤더 들도 있음

1. General Headers (요청과 응답 모두에서 사용되는 일반적인 헤더)
   - Cache-Control (캐시 정책 설정)
   - Connection (연결 유지 여뷰)
   - Date (메시지 생성 날짜)
   - Transfer-Encoding (데이터 전송 형식 ex.chunked)
2. Request Header
   - Host (요청할 서버의 도메인 ex. api.example.com)
   - User-Agent (요청을 보낸 클라이언트 정보 ex. User-Agent: Chrome/120.0)
   - Authorization (인증 토큰 정보 ex. Bearer eyJhb...)
   - Content-Type (요청 본문의 타입 ex. application/json)
   - Accept (클라이언트가 받고 싶은 응답 타입 Accept: application/json)
   - Cookie (클라이언트의 세션 쿠키 정보)
3. Response Headers
   - Content-Type (응답 데이터의 형식 ex. application/json)
   - Content-Length (응답 데이터의 길이)
   - Set-Cookie (클라이언트에 쿠키를 저장)
   - Access-Control-Allow-Origin (Cors 허용 도메인)
   - Cache-Control (응답 데이터 캐싱 정책)
4. Entity Headers (본문(content)에 대한 메타데이터를 포함하는 header)

   - Content-Encoding (데이터 압축 방식)
   - Content-Language (컨텐츠 언어)
   - Content-Location (리소스의 실제 URL 위치)
   - Content-Range (부분 요청 범위 정보 (스트리밍 등에서 사용))

#### 3.body

GET/DELETE에서는 사용안함 (필요 없음)

JSON.stringify(data)를 주로 사용 (data를 string으로 바꿔서 전송)

JSON, FormData, Blob 등 사용 가능

#### 4.signal

요청 중단
이미 보낸 요청을 취소 할 수 있음

```javascript
const controller = new AbortController();
fetch(url, { signal: controller.signal });
controller.abort(); //요청 중단
```

## Fetch API 응답 처리

response 객체형태

```javascript
response = {
  status : HTTP 상태코드
  ok: 2XX 에서만 true (비정상 status 판단할때 사용)
  headers: 응답 헤더들
  body: 본문(ReadableSteam 형태이므로 파싱해서 확인해야함)
}
```
