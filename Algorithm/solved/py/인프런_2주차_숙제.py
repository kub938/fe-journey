#배달의 민족 배달 가능 여부

shop_menus = ["만두", "떡볶이", "오뎅", "사이다", "콜라"]
shop_orders = ["오뎅", "콜라", "만두"]



## 이분탐색 풀이
def is_available_to_order_binary(menus, orders):
    # 이분 탐색 진행하는데 일단 정렬 하고 target은 ord해서 진행?

    # left right mid = index로 지정 
    n = len(shop_menus)
    m = len(shop_orders)

    cnt = 0

    for target in shop_orders:
        left = 0
        right = n-1
        while left <= right:
            mid =( left + right ) // 2
            now_value = shop_menus[mid]
            if target == now_value:
                cnt +=1
                break
            if target < now_value:
                right = mid - 1
            elif target > now_value:
                left = mid + 1
    
    if cnt == m:
        return True
    else:
        return False

shop_menus.sort()
result = is_available_to_order_binary(shop_menus, shop_orders)
print(result)


## 집합으로 풀이

def is_available_to_order_set(menus, orders):
    menus_set = set(menus)
    order_set = set(orders)
    
    same_menu = menus_set & order_set

    if len(same_menu) == len(shop_orders):
        return True
    else:
        return False



result2 = is_available_to_order_set(shop_menus, shop_orders)
print(result2)

def is_available_to_order_set2(menus, orders):
    menus_set = set(menus)

    for order in orders:
        if order not in menus_set:
            return False
    return True

result3 = is_available_to_order_set2(shop_menus, shop_orders)
print(result3)
