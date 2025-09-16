class Node:
    def __init__(self, data):
        self.data = data
        self.next = None



class LinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.length = 0

    def append(self, data):
        node = Node(data)
        if self.head == None:
            self.head = node
            self.tail = node
        else:
            self.tail.next = node
            self.tail = node
        self.length+=1
    
    def get_node(self, index):
        if index < 0 or self.length <= index:
            return print("배열의 길이와 맞지 않습니다.")
        
        cur = self.head
        for _ in range(index):
            cur = cur.next
        
        return cur


    def delete(self, index):
        if index < 0 or self.length <= index:
            return print("배열의 길이와 맞지 않습니다.")
        
        value = self.get_node(index).data
        if index == 0:
            self.head = self.head.next
        elif index == self.length-1:
            prev_node = self.get_node(index-1)
            prev_node.next = None
            self.tail = prev_node
        else:
            
            prev_node = self.get_node(index-1)
            next_node = self.get_node(index+1)
            prev_node.next = next_node
        
        self.length -= 1
        return value


n,k = map(int,input().split())

linked_list = LinkedList()
for i in range(1,n+1):
    linked_list.append(i)


result = []
target_idx = k-1
for i in range(n):
    if linked_list.length == 1:
        result.append(linked_list.delete(0))
        break
    result.append(linked_list.delete(target_idx))
    target_idx = (target_idx + k-1) % linked_list.length

print("<", end = "")
for i in range(n):
    if(i == n-1):
        print(result[i], end="")
    else:
        print(result[i], end=", ")

print(">")