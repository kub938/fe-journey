class Person:
    name = ""
    def __init__(self, name_param):
        self.name = name_param

    def talk(self):
        print("안녕하세요 저는", self.name, "입니다")

person_1 = Person("유재석")
print(person_1.name)

person_2 = Person("박명수")
person_2.talk()