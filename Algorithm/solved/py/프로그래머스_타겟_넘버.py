

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


# DP 풀이
# i = 숫자를 합/뺀 결과값
# i 번째까지 봤을때 합이 얼마인가?
# dp의 key, value 값은 합이 key가 몇번나왔는지 = value
# key값에서 number을 +,- 한 값을 key로 잡고 +1씩, 그중 target값을 출력

def solution(numbers, target):
    n = len(numbers)
    dp = {0:1}
    for i in numbers:
        tmp = {}
        for k, value in dp.items():
            sum_value = k+i
            minus_value = k-i
            tmp[sum_value] = tmp.get(sum_value, 0) + value
            tmp[minus_value] = tmp.get(minus_value, 0) + value
            # get(sum_value, 0) 은 sum_value가 없으면 0을 리턴하는 함수
            
        dp = tmp
    return dp[target]


