# 1. 문제
# 섬들 사이를 잇는 다리 길이의 최소값을 구해라

# 2. 입력
# N = 100이하
# 0 = 바다
# 1 = 육지

# 3. 엣지케이스
# 싹다 바다일때
# ㄷ싹다 육지일 때
# 섬이 하나일때
# 섬이 양 꼭짓점에 있을 때(최대거리)
# 섬이 한칸 옆에 있을 때(최단거리)

# 4. 알고리즘 및 풀이
# 멀티소스 bfs
# 섬 labeling, edge 배열 준비
# 거리 -> 멀티 소스 bfs로 체크, dis는 que에 넣어서 준비, 초기 큐에는 edge배열이랑 dis = 0으로 넣어서 초기화
# 

# 5. 로직
# 1. board 받기, min_dis, label_num , edge 배열
# 2. board 2중 for문 돌면서 bfs 돌림
#    - 조건 : visited가 0이고 값이 >0 일 경우 bfs 진행
#    2-1. bfs 내부 조건 : visited == 0, 지금 들어왔을때의 label_num랑 다음 넘버랑 같을 때 board에 직접 라벨링
#             edge 조건 : board의 값이 0일 경우에 추가(dis = 0 이랑 같이) , 해쉬값(key = label num, value)으로 추가
# 3. 그 후 edge 길이만큼 for문 돌려서 해당 label_num 부터 진행
# 4. 해당 key값의 value를 모두 que에 넣은뒤 진행
# 5. 가지치기 : 현재 dis가 min_dis 보다 크면 continue
# 6. bfs 조건 : 0일때 확장, que에 dis+1해서 전송 , visited == 0일때 움직임,
#              - value > 0 이고 내 label_num이랑 다를때 : dis랑 min_dis랑 비교한뒤에 더 작은값 하고 continue     
# 7. result 출력


from collections import deque

n = int(input())
board = [list(map(int,input().split())) for _ in range(n)]
min_dis = 100000000
label_num = 1
edge_list = {}
dx,dy = [-1,1,0,0],[0,0,-1,1]
visited = [[0]*n for _ in range(n)]

def in_range(x,y):
    return 0<=x<n and 0<=y<n

def set_label(X,Y,label_num):
    que = deque()
    que.append([X,Y])
    edge_list[label_num] = []
    visited[X][Y] = label_num
    board[X][Y] = label_num

    while(que):
        x,y = que.popleft()
        flag = False
        for i in range(4):
            nx,ny = x+dx[i], y+dy[i]
            if(not in_range(nx,ny)): continue

            if(board[nx][ny] == 0):
                flag = True
                continue

            if(visited[nx][ny] == 0 and board[nx][ny] > 0):
                que.append([nx,ny])
                visited[nx][ny] = 1
                board[nx][ny] = label_num
        
        if(flag):
            edge_list[label_num].append([x,y,0])


def get_min_dis(k):
    global min_dis
    que = deque()
    for edge in edge_list[k]:
        que.append(edge)
    visited = [[0]*n for _ in range(n)]

    while(que):
        x,y,dis = que.popleft()
        if(min_dis < dis): continue

        for i in range(4):
            nx,ny = x+dx[i], y+dy[i]
            if(not in_range(nx,ny)): continue
            if(visited[nx][ny] != 0): continue

            if(board[nx][ny] == 0):
                que.append([nx,ny,dis+1])
                visited[nx][ny] = 1
            elif(board[nx][ny] > 0 and board[nx][ny] != k):
                min_dis = min(dis, min_dis)
            

for i in range(n):
    for j in range(n):
        if (visited[i][j] == 0 and board[i][j] > 0):
            set_label(i,j,label_num)
            label_num+=1

for k in edge_list.keys():
    get_min_dis(k)

print(min_dis)