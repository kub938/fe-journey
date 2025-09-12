input = "abadabac"

cnt_arr =  [-1]*26
def find_not_repeating_first_character(string):
    for i in string:
        cnt_arr[ord(i)-ord("a")] += 1

    #그 자리 index + ord("a")

    for i in range(len(string)):
        if(cnt_arr[ord(string[i]) -  ord("a")] == 0):
            return string[i]
        
    return ("없음")


result = find_not_repeating_first_character
# print("정답 = d 현재 풀이 값 =", result("abadabac"))
# print("정답 = c 현재 풀이 값 =", result("aabbcddd"))
print("정답 =_ 현재 풀이 값 =", result("aaaaaaaa"))