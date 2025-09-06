# 1. 문제
# 섬을 잇는 다리의 최소값 구하기

# 2. 입력 범위
# n = 100 이하
# 0 = 바다 1 = 육지

# 3. 최소 최대 경계 조건
# 최소 = 1
# 최대 = 98
# 경계조건 = 

# 4. 알고리즘
# bfs 사용해서 라벨링, 조건 : 1일때 
# bfs 사용해서 퍼지기, 조건 : 0일때, 시작한 섬(start) 이랑 다를때, 움직일때마다 dis 높이고 다른섬 전역 min(result) 비교


# 5. 로직 시물레이션
# 1. board에 섬 라벨링 + edge 체크 (edge 체크는 nx ny가 0일 경우 x,y를 배열에 넣는식으로 만듬)
# 2. 최단거리 :for len(edge)만큼 실행 que에 edge[i] 다 넣고 시작
#    label_num랑 다른 숫자 나오면 result = min(dis, result)
#    그냥 0 이면 dis += 1
# 3. result 출력


from collections import deque


n = int(input())
board = [list(map(int,input().split())) for _ in range(n)]
dx,dy = [-1,1,0,0],[0,0,-1,1]
result = 100000
edge = {}

def in_range(x,y):
    return  0<=x<n and 0<=y<n

def labeling(X,Y):
    que = deque()
    visited[X][Y] = 1
    board[X][Y] = label_num
    que.append([X,Y])
    edge[label_num] = []
    while(que):
        x,y = que.popleft()
        flag = False
        for i in range(4):
            nx,ny = x+dx[i], y+dy[i]
            if(not in_range(nx,ny)): continue

            if(board[nx][ny] != 0 and visited[nx][ny] == 0):
                board[nx][ny] = label_num
                visited[nx][ny] = 1
                que.append([nx,ny])
            
            if(board[nx][ny] == 0):
                flag = True
        if(flag):
            edge[label_num].append([x,y])


def get_min_dis(label_id):
    global result
    q = deque()
    dist = [[-1] * n for _ in range(n)]

    for (x,y) in edge[label_id]:
        dist[x][y] = 0
        q.append([x,y])
    
    while q:
        x, y = q.popleft()
        d = dist[x][y]
        if d >= result:
            continue
        for i in range(4):
            nx,ny = x+dx[i] , y+dy[i]
            if not in_range(nx,ny):
                continue
                
            if board[nx][ny] == 0 and dist[nx][ny] == -1:
                dist[nx][ny] = d + 1
                q.append([nx,ny])
            elif board[nx][ny] > 0 and board[nx][ny] != label_id:
                result = min(result, d)



    
visited = [[0]*n for _ in range(n)]
label_num = 1
for i in range(n):
    for j in range(n):
        if(visited[i][j] == 0 and board[i][j]>0):
            labeling(i,j)
            label_num+=1

for label_id in edge.keys():
    get_min_dis(label_id)


print(result)