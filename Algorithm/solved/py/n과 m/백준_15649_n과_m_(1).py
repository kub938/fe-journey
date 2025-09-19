n,m = map(int,input().split())


#1 ~ n까지들 중 길이가 m인 수열
#

def dfs(depth, visited, arr):
    if(depth == m):
        print(*arr)
        return
    for i in range(n):
        if visited[i] == True:
            continue
        visited[i] = True
        arr.append(i+1)
        dfs(depth+1, visited, arr)
        arr.pop()
        visited[i] = False
    


dfs(0,[0]*n,[])