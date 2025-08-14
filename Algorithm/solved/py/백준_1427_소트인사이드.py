# # 병합정렬

# def merge_sort(arr):
#     if(len(arr) <= 1):
#         return arr
    
#     mid = len(arr) // 2

#     left_half = merge_sort(arr[:mid])
#     right_half = merge_sort(arr[mid:])

#     return merge(left_half, right_half)

# def merge(left, right):
#     result = []
#     i = j = 0

#     while i < len(left) and j < len(right):
#         if(left[i] >= right[j]):
#             result.append(left[i])
#             i+=1
#         else:
#             result.append(right[j])
#             j+=1

    
#     result.extend(left[i:])
#     result.extend(right[j:])

#     return result


# data = list(map(int,input()))
# sorted_data = merge_sort(data)
# print("".join(map(str, sorted_data))) 



# bubble sort
# data = list(map(int,input()))

# n = len(data)
# for i in range(n-1):
#     for j in range(i,n):
#         if(data[i] < data[j]):
#             data[i], data[j] = data[j] , data[i]


# print("".join(map(str, data)))

#quick sort
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x >pivot]

    return quick_sort(left) + middle + quick_sort(right)


data = list(map(int,input()))

print(quick_sort(data))
    