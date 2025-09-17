def count_down(number):
    if number < 0:
        return number
    return count_down(number -1), count_down(number - 2)

count_down(4)
# 시물레이션 사이트 https://recursion.vercel.app/
# 이런 방식으로 재귀를 하면 트리 형태를 띄게 되고 아래와 같이 진행된다.
# count_down(number -1) 이 먼저 쭉 dfs 처럼 실행 된 다음 number < 0이 될 경우 바로 위 함수로 재귀, number-2 실행
# 이 동작을 다시 재귀하면서 반복한다.



def factorial(number,value):
    if(number == 0):
        return value
    
    return factorial(number-1, value*number)
    

print(factorial(10, 1)) 

def factorial_2(n):
    if(n==1):
        return 1
    
    return n * factorial_2(n-1)


print(factorial_2(10))

# 이 두개의 factorial의 경우 위의 factorial이 단순한 value 누적을 넘김으로써 메모리 효율이 더 좋다
# 그 이유는 factorial_2의 경우에 n*factorial_2(n-1)은 (n* (n-1 * (n-2 * (n-3 * ...)))) 처럼 계산 결과가 아닌 연산 기록이 계속 남아있어
# 메모리 부담이 커지기 때문이다.



#앞뒤가 똑같은지 검사
# 재귀 풀이 O(n^2)
input = "abcdddd2cba"
def is_palindrome(string):
    print(string)
    if(len(string) <= 1):
        return True
    if string[0] != string[-1]:
        return False
    return is_palindrome(string[1:-1])


print(is_palindrome(input))


#반복문 풀이 (n)
def is_palindrome_2(string):
    n = len(string)
    for i in range(n//2):
        if string[i] != string[n-i-1]:
            return False
    
    return True

print(is_palindrome_2(input))


#투 포인터 풀이
def is_palindrome_two_pointer(string):
    n = len(string)
    left = 0
    right = n-1
    for i in range(n//2):
        if string[left] != string[right]:
            return False
        left += 1
        right -= 1
    return True

print(is_palindrome_two_pointer(input))
