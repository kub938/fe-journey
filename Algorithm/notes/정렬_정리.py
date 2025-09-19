# 1. 버블 정렬

# - 0번 1번 비교 -> 1번 2번 비교 -> 2번 3번 비교 -> ...
# - 이런식으로 진행시 맨 뒤에 가장 큰 숫자가 놓이게 됨
# - 2개씩 비교하며 뒤의 숫자가 더 크면 자리를 바꿈
# - 몇번 시켜야될까? =

arr = [5,2,1,4,10]
n = len(arr)



# 최적화 안한 기본 버전 O(n^2)
def bubble_sort_basic(arr):
    for i in range(n-1):
        for j in range(n-1-i):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1] , arr[j]
    
    return arr

print(bubble_sort_basic(arr))
    

arr = [5,2,1,4,10]
# 최적화 한 버전 O(n^2) 최악의 경우는 같지만 빠르게 완성될 경우 flag를 통해 빠르게 탈출 할 수 있음
def bubble_sort(arr):
    for i in range(n-1):
        complete = True
        for j in range(n-1-i):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1] , arr[j]
                complete = False
            if complete:
                break
    return arr
    
print(bubble_sort(arr))



# 2. 선택 정렬
# 가장 작은 사람을 찾아서 맨 앞부터 정렬시키는 방법

selection_arr = [9,5,2,3,10]
selection_arr_length = len(selection_arr)

for i in range(selection_arr_length):
    min_idx = i
    for j in range(i+1,selection_arr_length):
        if selection_arr[min_idx] > selection_arr[j]:
            min_idx = j

    selection_arr[i], selection_arr[min_idx] = selection_arr[min_idx], selection_arr[i]

print(selection_arr) 
            


# 3. 삽입 정렬 O(n^2) , 오메가(n)
# 한개씩 수를 삽입해 가며 내 자리를 찾는 연산

insertion_arr = [4,6,2,9,1]
insertion_arr_length = len(insertion_arr)
def insertion_sort(arr):
    sorted_arr = [] 
    for i in range(insertion_arr_length):
        sorted_arr.append(insertion_arr[i])
        for j in range(i, 0, -1):
            if (sorted_arr[j] < sorted_arr[j-1]):
                sorted_arr[j], sorted_arr[j-1] = sorted_arr[j-1], sorted_arr[j]
            else:
                break
            
    return sorted_arr

print(insertion_sort(insertion_arr))


# 4. 병합 정렬
# 정렬되어있는 A, B 배열을 병합시키며 다시 정렬시키는 정렬법

# 아래 코드는 단순히 2개의 배열을 merge하는 코드라고 생각 할 수 있지만
# 분할 정복 개념으로 생각 하기 위한 기반으로 보면 된다
# 이 때 분할 정복이란  문제를 작은 두개의 문제로 분리하고 각각 해결한 다음 결과를 모아 원래의 문제를 해결하는 전략인데
# 병합 정렬에서는 모든 원소를 계속해서 1/2로 분할해 병합하는 형식으로 진행한다
# 예를들어 [4,3,1],[5,2,6] 이렇게 두 배열이 존재할 때
# 1차 분할  = [4] ,[3,1] ,[5] ,[2,6]
# 2차 분할 = [4] , [3], [1], [5], [2], [6]
# 이렇게 한개의 원소를 가지게 모두 분할 한 뒤

merge_arr = [1,5,3,2,5,10,12,311,34]
# 일단 merge
def merge(arr_A, arr_B):
    len_A = len(arr_A)
    len_B = len(arr_B)
    target_A = 0
    target_B = 0
    sorted_arr = []

    while(target_A < len_A and target_B < len_B):
        if(arr_A[target_A] < arr_B[target_B]):
            sorted_arr.append(arr_A[target_A])
            target_A+=1
        else:
            sorted_arr.append(arr_B[target_B])
            target_B += 1
    
    while(target_A < len_A):
        sorted_arr.append(arr_A[target_A])
        target_A +=1

    while(target_B < len_B):
        sorted_arr.append(arr_B[target_B])
        target_B +=1
    
    return  sorted_arr


def merge_sort(arr):
    if(len(arr) <= 1):
        return arr
    return merge(merge_sort(arr[len(arr)//2:]) , merge_sort(arr[:len(arr)//2])) # 왼쪽, 오른쪽 나눠서 재귀

print("after merge =", merge_sort(merge_arr))
    
    
# def merge_sort(array):
#     if len(array) <= 1:
#         return array
#     mid = len(array) // 2
#     left_array = array[:mid]
#     right_array = array[mid:]
#     return merge(merge_sort(left_array), merge_sort(right_array))