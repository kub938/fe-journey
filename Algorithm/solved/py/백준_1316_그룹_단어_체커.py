n = int(input())
str_arr =  [list(input()) for _ in range(n)]
flag = True
result = 0

def checker(str):
    alpha[str[0]] = 1
    for i in range(1, len(str)):
        if(alpha[str[i]] == 0):
            alpha[str[i]] = 1
            continue
        if(str[i] != str[i-1]):
            return False
    return True


for str in str_arr: 
    alpha = {chr(i):0 for i in range(ord("a"), ord("z") + 1)}
    if(checker(str)):
        result+=1

print(result)
