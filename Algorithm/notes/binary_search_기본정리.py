finding_target = 14
finding_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]


def is_existing_target_number_binary(target, array):
    # 중요! 일단 정렬이 되어있어야 사용 가능
    #array에서 target의 idx를 찾는거지 그럼 mid, left, right = idx로 구성
    # mid의 값이 target의 값보다 작으면 left를 mid+1로
    # mid의 값이 ta ... 크면 right를 mid-1로 이동
    # 언제까지? left > right일때 까지
    # left <= right이면 동작
    # 왜 == 인 경우도 돌려야 하나?
    # [1, 2, 3, 4, 5] 에서 만약 target이 마지막 값인 5인 경우
    # 최후에는 right는 4로 고정되어 있고 left만 값이 상승해 right와 left가 같아진 경우 target인 5를 찾을 수 있기 때문에
    # == 의 경우도 진행해야 한다.

    left = 0
    right = len(array)-1
    while(left <= right):
        mid = (left+right) // 2
        mid_value = array[mid]
        if mid_value < target:
            left = mid + 1
        elif mid_value > target:
            right = mid - 1
        elif mid_value == target:
            return mid
    # 구현해보세요!
    return -1


result = is_existing_target_number_binary(finding_target, finding_numbers)
print(result)