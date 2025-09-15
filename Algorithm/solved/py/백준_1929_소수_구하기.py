m, n = map(int,input().split())



def eratosthenes(n):
    is_prime = [True] * (n+1)
    is_prime[0] = is_prime[1] = False

    p = 2
    while p*p <= n:
        if is_prime[p]:
            for i in range(p*p, n+1, p):
                is_prime[i] = False
        p += 1
    
    return [i for i, prime in enumerate(is_prime) if prime]



        

prime_arr = eratosthenes(n)

for prime_num in prime_arr:
    if(m > prime_num):
        continue
    if(n < prime_num):
        break
    
    print(prime_num)


