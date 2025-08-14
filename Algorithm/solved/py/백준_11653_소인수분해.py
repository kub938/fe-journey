n = int(input())


div_num = 2
result = []

while(n != 1):
    if (n % div_num == 0):
        n //= div_num
        result.append(div_num)
        div_num = 2
        continue
    div_num+=1

for r in result:
    print(r)

