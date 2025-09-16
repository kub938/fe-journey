class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedList:
    def __init__(self, value):
        self.head = Node(value)
        self.length = 0

    def append(self, value):
        cur = self.head
        while cur.next is not None:
            cur = cur.next
        cur.next = Node(value)
        self.length+=1


def get_linked_list_sum(linked_list_1, linked_list_2):
    num1 = ""
    num2 = ""
    cur1 = linked_list_1.head
    for i in range(linked_list_1.length+1):
        num1 += str(cur1.data)
        cur1 = cur1.next
    
    cur2 = linked_list_2.head
    for i in range(linked_list_2.length+1):
        num2 += str(cur2.data)
        cur2 = cur2.next
    
    return int(num1) + int(num2)


linked_list_1 = LinkedList(6)
linked_list_1.append(7)
linked_list_1.append(8)

linked_list_2 = LinkedList(3)
linked_list_2.append(5)
linked_list_2.append(4)

print(get_linked_list_sum(linked_list_1, linked_list_2))