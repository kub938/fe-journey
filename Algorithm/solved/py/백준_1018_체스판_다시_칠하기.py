# 1. W부터 시작할때
# 2. B부터 시작할때

n,m = tuple(map(int,input().split()))
board = list(list(input()) for _ in range(n))

def check(color):
    result = float("inf")
    for k in range(n-7):
        for l in range(m-7):
            cnt = 0
            now_color = color
            for i in range(k,8+k):
                for j in range(l,8+l):
                    if(now_color != board[i][j]):
                        cnt += 1
                    if(j!=l+7):
                        now_color = "B" if now_color == "W" else "W"
            result = min(result , cnt)
    return result

print(min(check("W"),check("B")))




