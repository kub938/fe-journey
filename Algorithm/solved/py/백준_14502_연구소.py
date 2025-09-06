from collections import deque
from itertools import combinations


n,m = map(int,input().split())
board = [list(map(int,input().split())) for _ in range(n)]

result = 0
viruses = []
empty_point = []
empty_count = 0
dx,dy = [-1,1,0,0],[0,0,-1,1]


def in_range(x,y):
    return 0<=x<n and 0<=y<m

for i in range(n):
    for j in range(m):
        if(board[i][j] == 2):
            viruses.append([i,j])
        elif(board[i][j] == 0):
            empty_point.append([i,j])
            empty_count += 1


for a,b,c in combinations(empty_point, 3):
    visited = [[0](m) for _ in range(n)]
    board[a[0]][a[1]] = board[b[0]][b[1]] = board[c[0]][c[1]] = 1
    que = deque()
    infectedCount = 0
    for v in viruses:
        que.append(v)
    while(que):
        x,y = que.popleft()
        for i in range(4):
            nx = x+dx[i]
            ny = y+dy[i]
            if(not in_range(nx,ny)):
                continue
            if(visited[nx][ny] == 1):
                continue
            if(board[nx][ny] != 2 and board[nx][ny] != 1):
                que.append([nx,ny])
                infectedCount += 1
                visited[nx][ny] = 1 

    result = max(result, empty_count - infectedCount - 3)
    board[a[0]][a[1]] = board[b[0]][b[1]] = board[c[0]][c[1]] = 0



print(result)



