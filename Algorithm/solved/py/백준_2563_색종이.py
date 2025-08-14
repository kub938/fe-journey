n = int(input())
coord = [list(map(int, input().split())) for _ in range(n)]

board = [[0 for _ in range(100)] for _ in range(100)]

result = 0


for c,r in coord:
    for x in range(r,r+10):
        for y in range(c,c+10):
            if(x<100 and y<100):
                if(board[x][y] == 0):
                    board[x][y] = 1
                    result +=1


print(result)



