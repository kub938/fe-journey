

n,m = map(int,input().split())


# 처음 풀이
# def dfs(depth, visited, arr):
#     if(depth == m):
#         print(*arr)
#         return
    
#     for i in range(n):
#         if(visited[i] == True):
#             continue
#         if(len(arr) >= 1 and arr[-1] > i+1):
#             continue

#         arr.append(i+1)
#         visited[i] = True
#         dfs(depth+1, visited, arr)
#         visited[i] = False
#         arr.pop()


# dfs(0,[0]*n ,[])




# 개선
def dfs_2(depth, start, arr):
    if(depth == m):
        print(*arr)
        return
    for i in range(start, n+1):
        arr.append(i)
        dfs_2(depth+1 , i+1, arr)
        arr.pop()

dfs_2(0,1,[])