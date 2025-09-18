

# 1차 풀이 O(2^n * n)
answer = 0

def solution(numbers, target):
    set_operation(len(numbers), 0, [],numbers, target)
    return answer


# depth, operation_arr, operation 
# +면 value에 더해서 보내고 -면 

def set_operation(n,depth, operation_arr,numbers, target):
    global answer
    op = ["+" , "-"]
    if depth == n:  
        result = 0
        for i in range(n):
            if operation_arr[i] == "+":
                result += numbers[i]
            elif operation_arr[i] == "-":
                result -= numbers[i]
        
        if(result == target):
             answer += 1
                
        return 
     
    
    for i in range(2):
        operation_arr.append(op[i])   
        set_operation(n, depth+1, operation_arr,numbers, target)
        operation_arr.pop()


# 개선 버전 O(2^n)

def solution(numbers, target):
    n = len(numbers)

    def dfs(i, total):
        if i == n:
            return 1 if total == target else 0
        # 현재 숫자를 + 또는 - 로 더한 경우의 수 합산
        return dfs(i + 1, total + numbers[i]) + dfs(i + 1, total - numbers[i])

    return dfs(0, 0)