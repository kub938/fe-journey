nums = list(map(int,input()))


zero_cnt = 0
one_cnt = 0
result = 0


if nums[0] == 1:
    one_cnt += 1
else:
    zero_cnt += 1

for i in range(len(nums)-1):
    if(nums[i] == 0 and nums[i+1] == 1):
        one_cnt +=1
    elif nums[i] == 1 and nums[i+1] == 0:
        zero_cnt +=1
       

if (zero_cnt > one_cnt):
    print(one_cnt)
else:
    print(zero_cnt)



    

    

