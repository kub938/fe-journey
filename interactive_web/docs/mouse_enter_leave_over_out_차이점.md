## 🎯 mouseenter / mouseleave vs mouseover / mouseout 차이점

마우스 이벤트를 다룰 때 가장 헷갈리는 부분 중 하나가
`mouseenter/mouseleave` 와 `mouseover/mouseout` 의 차이입니다.

## 1. 기본 개념

| 이벤트         | 버블링 여부 | 자식 요소 진입 시        | 주 사용처   |
| -------------- | ----------- | ------------------------ | ----------- |
| **mouseenter** | ❌ 안 함    | 부모 이벤트 재실행 안 됨 | hover 효과  |
| **mouseleave** | ❌ 안 함    | 부모 이벤트 재실행 안 됨 | hover 해제  |
| **mouseover**  | ✅ 함       | 부모 이벤트 다시 발생    | 세밀한 추적 |
| **mouseout**   | ✅ 함       | 부모 이벤트 다시 발생    | 세밀한 추적 |

## 2. 콘솔 로그 예제

```tsx
export default function MouseTest() {
  return (
    <div
      style={{ padding: "20px", border: "2px solid blue" }}
      onMouseEnter={() => console.log("mouseenter - parent")}
      onMouseLeave={() => console.log("mouseleave - parent")}
      onMouseOver={() => console.log("mouseover - parent")}
      onMouseOut={() => console.log("mouseout - parent")}
    >
      Parent
      <button
        style={{ margin: "20px", padding: "10px" }}
        onMouseEnter={() => console.log("mouseenter - child")}
        onMouseLeave={() => console.log("mouseleave - child")}
        onMouseOver={() => console.log("mouseover - child")}
        onMouseOut={() => console.log("mouseout - child")}
      >
        Child
      </button>
    </div>
  );
}
```

## 3. 콘솔 결과 비교

### 👉 마우스가 **부모 → 자식 버튼으로 이동**

```
mouseenter - parent
mouseover - parent
mouseenter - child
mouseover - child
mouseout - parent   // ❗️ mouseover는 버블링하기 때문에 부모에서 out 발생
```

### 👉 마우스가 **자식 버튼 → 부모 영역으로 이동**

```
mouseleave - child
mouseout - child
mouseover - parent
```

### 👉 마우스가 **부모 영역을 완전히 벗어남**

```
mouseleave - parent
mouseout - parent
```

## 4. 핵심 정리

- **mouseenter/mouseleave**
  → **버블링하지 않음**. 오직 해당 요소의 경계에서만 발생.
  → “hover 상태 시작/종료”를 단순하게 감지할 때 적합.

- **mouseover/mouseout**
  → **버블링함**. 자식 요소 진입/이탈 시에도 상위 요소에서 발생.
  → 세밀하게 마우스 이동을 추적해야 할 때 사용(툴팁, 드롭다운 메뉴 등).

## 5. React에서의 팁

- JSX에서는 이벤트 이름을 camelCase로 작성해야 함:

  - `onMouseEnter`, `onMouseLeave`
  - `onMouseOver`, `onMouseOut`

- React에서는 hover 감지만 필요하면 `onMouseEnter/onMouseLeave` 조합을 쓰는 게 깔끔합니다.
