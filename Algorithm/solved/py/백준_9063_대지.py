import sys

n = int(input())
coord = list(list(map(int,input().split(" "))) for _ in range(n))
min_x,min_y = float("inf"), float("inf")
max_x,max_y = float("-inf"),float("-inf")


for x,y in coord:
    min_x = min(min_x, x)
    max_x = max(max_x,x)
    min_y = min(min_y, y)
    max_y = max(max_y,y)

print((max_y - min_y )* (max_x-min_x))