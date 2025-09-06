#1. 문제 요약


# 2. 입력 범위
# n, m = 3~8
# 시간 2초
# 바이러스 = 2~10
# 빈칸 개수 = 3개 이상 => 빈칸이 3개일 시? 벽 3개가 쳐져서 0이 출력

# 3. 엣지케이스


# 4. 접근 방법
# bfs + 조합

# 5. 로직 시물레이션
# 1. 감염된 좌표 배열 넣고 - infected_point
# 2. 0인거 좌표 넣고 - empty_point
# 3. 0인거 combination 해서 3개 뽑은다음에
# 4. 각각 좌표 que에 넣고, board에 1로 표시하고
# 5. bfs
# 6. 조건은? 범위, visited, board에 1,2가 아닌경우에 infected_count 한개 올리고 큐에 넣는다
# 7. 그리고 board 벽 3개 다시 초기화 
# 8. 안전영역은 result = max(result, empty_point - infected_count - 3)


# 6. 시간 복잡도 점검
# - combination은 64개 중 3개 뽑는 연산 * bfs 하면? 시간복잡도 뭐임?


# 7. 예외 상황
# - 바이러스가 없을경우? 그냥 bfs 돌아감
# - 안전영역이 0인 경우?



from collections import deque
from itertools import combinations

def in_range(x,y):
    return 0<=x<n and 0<=y<m

n,m = map(int,input().split())
board = [list(map(int,input().split())) for _ in range(n)]
infected_point = []
empty_point = []
empty_count = 0
result = 0
dx,dy = [[-1,1,0,0],[0,0,-1,1]]


for i in range(n):
    for j in range(m):
        if(board[i][j] == 0):
            empty_point.append([i,j])
            empty_count += 1

        elif(board[i][j] == 2):
            infected_point.append([i,j])


for a,b,c in combinations(empty_point, 3):
    board[a[0]][a[1]] = board[b[0]][b[1]] = board[c[0]][c[1]] = 1
    que = deque()
    visited = [[0]*m for _ in range(n)]
    infected_count = 0 

    for i in infected_point:
        que.append(i)

    while(que):
        x,y = que.popleft()
        for i in range(4):
            nx,ny = x+dx[i] ,y+dy[i]
            if(not in_range(nx,ny)): continue

            if(visited[nx][ny] == 1): continue

            if(board[nx][ny] != 1 and board[nx][ny] != 2):
                que.append([nx,ny])
                visited[nx][ny] = 1
                infected_count += 1
    
    result = max(result, empty_count - 3 - infected_count)
    board[a[0]][a[1]] = board[b[0]][b[1]] = board[c[0]][c[1]] = 0


print(result)

        

    


