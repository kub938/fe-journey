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
        if self.tail is None:
            self.tail = node
            self.head = node
        else:
            self.tail.next = node
            self.tail = node
        self.length += 1
    
    def first_append(self, data):
        node = Node(data)
        if self.head is None:
            self.head = node
            self.tail = node
        else:
            node.next = self.head
            self.head = node
        self.length += 1
        
    
    def get_list(self):
        cur = self.head
        while(cur):
            print(cur.data)
            cur = cur.next

    def get_node(self, index):
        cur_node = self.head
        for i in range(index):
            cur_node = cur_node.next
        return cur_node

    def add_node(self, index ,data):
        if(index > self.length or 0 > index):
            return print("index가 현재 list의 길이보다 크거나 작습니다")
        
        node = Node(data)
        if self.head is None:
            self.head = node
            self.tail = node
        elif index == 0:
            self.first_append(data)
        elif index == self.length:
            self.append(data)
        else:
            prev_node = self.get_node(index-1)
            node.next = prev_node.next
            prev_node.next = node
        self.length += 1
    
    def delete(self, index):
        if(index > self.length or 0 > index):
            return print("index가 현재 list의 길이보다 크거나 작습니다")
        if index == 0:
            target = self.get_node(0) 
            self.head = target.next
            # target = None

            
        elif index == self.length:
            prev_node = self.get_node(index-1)
            prev_node.next = None
            self.tail = None
        
        else:
            target = self.get_node(index)
            target_prev = self.get_node(index-1)
            target_prev.next = target.next
            # target = None None 안해줘도 알아서 GC 작동 

        self.length -= 1




            






test_list = LinkedList()


for i in range(20,30):
    test_list.first_append(i)

test_list.add_node(10,100)

test_list.delete(1)

test_list.get_list()
    
        

    
    
    

