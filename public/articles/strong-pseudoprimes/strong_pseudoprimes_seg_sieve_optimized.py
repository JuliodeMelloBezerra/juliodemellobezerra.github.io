from sage.all import *
import time

start_time = time.time()

# =============================================================================
# Constructing Strong Pseudoprimes via Arnault's Method (h = 3)
# =============================================================================
# We construct a 3-prime Carmichael number n = p1 * p2 * p3 that is a strong
# pseudoprime to all prime bases b <= t, following Arnault (1995) and
# Albrecht et al., "Prime and Prejudice" (2018), enhanced with:
#   1. Mod-4 congruence alignment (eliminating backtracking CRT trees)
#   2. Mod-8 residue selection (preferring p_i = 3 or 5 mod 8)
#   3. Segmented bytearray sieve with C-level .find(1) survivor scanning
#   4. Quadratic-reciprocity specialized base-2 Miller-Rabin (no valuation(2)
#      in the hot loop when p_i = 3, 5, 7 mod 8)
#   5. Mertens-optimal sieve bound B = O(t^2)
# =============================================================================


def generate_basis(n):
    """Return the prime basis T of all primes p <= n."""
    return list(prime_range(1, n + 1))


def miller_rabin(n, basis=None):
    """
    Standard Miller-Rabin test over the chosen prime basis T.
    Used only as the final verification step once a triple (p1, p2, p3) passes
    the fast single-base custom pseudoprimality checks.
    """
    if basis is None:
        basis = T

    r, s = 0, n - 1
    while s % 2 == 0:
        r += 1
        s //= 2

    for b in basis:
        if b >= n:
            break
        if gcd(b, n) != 1:
            return False
        x = pow(b, s, n)
        if x == 1 or x == n - 1:
            continue
        for _ in range(r - 1):
            x = pow(x, 2, n)
            if x == n - 1:
                break
        else:
            return False
    return True


def random_base_miller_rabin(n, k, seed=None):
    """
    Run k independent Miller-Rabin checks with uniformly random bases.
    Retained for benchmarking against the deterministic base-2 reciprocity test.
    """
    if seed is not None:
        set_random_seed(seed)

    r, s = 0, n - 1
    while s % 2 == 0:
        r += 1
        s //= 2

    for _ in range(k):
        a = randint(2, n - 2)
        if gcd(a, n) != 1:
            return False
        x = pow(a, s, n)
        if x == 1 or x == n - 1:
            continue
        for _ in range(r - 1):
            x = pow(x, 2, n)
            if x == n - 1:
                break
        else:
            return False
    return True


t = 1200
T = generate_basis(t)
h = 3


def Sb(T):
    """
    For each prime b in T, compute the set S_b of odd residues p in (3, 4b)
    such that the Kronecker/Jacobi symbol (b / p) == -1.
    Note: For b = 2, 4b = 8 and S_2 = [3, 5], which automatically excludes
    1 and 7 mod 8 whenever 2 is in T.
    """
    S = {}
    for b in T:
        S[b] = [p for p in range(3, 4 * b, 2) if kronecker_symbol(b, p) == -1]
    return S


def find_congruent(B, prefer_mod4=(3, 1)):
    """
    Find a compatible system of residues across all b in T.
    Since the moduli 4*b share only the factor 4 in common, the sole obstruction
    to the Chinese Remainder Theorem is agreement modulo 4.
    By checking r = 3 mod 4 before r = 1 mod 4 (when k2 = k3 = 1 mod 4), we
    prefer p_i = 3 mod 8 (where s = 1 and 2^((p-1)/2) == -1 mod p in one step).
    """
    for r in prefer_mod4:
        solution = []
        for L in B.values():
            found = next((x for x in L if x % 4 == r), None)
            if found is None:
                break
            solution.append(found)
        if len(solution) == len(B):
            return solution
    return None


def Rt(T, k, S, S_base_sets=None):
    """
    Compute the intersection of shifted residue sets:
        bigcap_{i=1}^h k_i^{-1} (S_b + k_i - 1) mod 4b
    for each prime b in T.
    Precomputing S_base_sets for k[1] = 1 avoids redundant set allocations.
    """
    B = {}
    for b in T:
        mod = 4 * b
        if S_base_sets is not None:
            inter = set(S_base_sets[b])
        else:
            inter = set(S[b])

        for i in range(2, h + 1):
            ki = k[i]
            inv = inverse_mod(ki, mod)
            shift = ki - 1
            inter &= {(inv * (s + shift)) % mod for s in S[b]}
            if not inter:
                break
        B[b] = sorted(inter)
    return B


def supplemental_k(n, basis=None):
    """
    Generate candidate supplemental primes k_i in (n, 3n] coprime to T.
    Ordering primes congruent to 1 mod 4 first enables B[2] to contain 3 mod 8,
    making p1 = p2 = p3 = 3 mod 8 achievable on the first iteration.
    """
    if basis is None:
        basis_set = set(generate_basis(n))
    else:
        basis_set = set(basis)
    candidates = [q for q in prime_range(n + 1, 3 * n + 1) if q not in basis_set]
    # Partition so that primes == 1 mod 4 are paired together first
    mod4_1 = [q for q in candidates if q % 4 == 1]
    mod4_3 = [q for q in candidates if q % 4 == 3]
    return mod4_1, mod4_3, candidates


mod4_1, mod4_3, supplemental = supplemental_k(t, T)
residue_sets = Sb(T)
base_sets = {b: set(residue_sets[b]) for b in T}

candidate_sol = None
# First try pairs (k2, k3) with k2 = k3 = 1 mod 4 so that p_i = 3 mod 8 is valid
search_pools = [mod4_1, supplemental]
for pool in search_pools:
    for i in range(len(pool) // 2):
        k = {1: 1, 2: pool[i], 3: pool[-(i + 1)]}
        B = Rt(T, k, residue_sets, base_sets)
        candidate_sol = find_congruent(B, prefer_mod4=(3, 1))
        if candidate_sol is not None:
            break
    if candidate_sol is not None:
        break

if candidate_sol is None:
    print('No candidate solution found')
    raise SystemExit

# Korselt divisibility congruences: p1 * p2 * p3 = 1 mod (k2, k3)
x2 = inverse_mod(-k[3], k[2])
x3 = inverse_mod(-k[2], k[3])

crt1 = candidate_sol + [x2, x3]
crt2 = [i * 4 for i in T] + [k[2], k[3]]
try:
    r = crt(crt1, crt2)
except Exception:
    print('candidate solution is not a solution...')
    raise

mod = 4 * prod(T) * k[2] * k[3]

print('r = %d mod %d , k2=%d, k3=%d' % (r, mod, k[2], k[3]))
current_time = time.time()
total_time = current_time - start_time
print(f'CRT & basis setup took {total_time:.4f} seconds.')


# =============================================================================
# Segmented Sieve over j in N
# =============================================================================
# Note on Pritchard's Wheel Sieve:
# Pre-sieving with a dynamic wheel over the smallest primes above t introduces
# non-unit stride bookkeeping and large wheel state tables whose performance
# fluctuates erratically with t. A contiguous bytearray with slice assignment
# (good[i::q] = zero[:n]) and C-level .find(1) survivor scanning consistently beats
# Python-level wheel sieving.
# =============================================================================


def prepare_sieve(M, r, k2, k3, t, B):
    """
    For each sieve prime q in (t, B] coprime to k2 and k3, precompute the
    up to 3 forbidden residue classes for j mod q where q | p1*p2*p3:
        b1 = -r * M^{-1} mod q
        b2 = b1 + (1 - k2^{-1}) * M^{-1} mod q
        b3 = b1 + (1 - k3^{-1}) * M^{-1} mod q
    """
    data = []
    for q in prime_range(t + 1, B + 1):
        if q == k2 or q == k3:
            continue
        invM = inverse_mod(M, q)
        invk2 = inverse_mod(k2, q)
        invk3 = inverse_mod(k3, q)

        b1 = (-r * invM) % q
        b2 = (b1 + (1 - invk2) * invM) % q
        b3 = (b1 + (1 - invk3) * invM) % q

        data.append((q, tuple({b1, b2, b3})))

    return data


def sieve_block(k0, L, data, zero_buf):
    """
    Sieve the interval [k0, k0 + L) using fast slice assignment.
    Accepts a pre-allocated zero_buf to avoid reallocating L zero bytes per block.
    """
    good = bytearray(b'\x01') * L

    for q, residues in data:
        for b in residues:
            i = (b - k0) % q
            if i < L:
                n = (L - 1 - i) // q + 1
                good[i::q] = zero_buf[:n]

    return good


# =============================================================================
# Quadratic-Reciprocity Base-2 Miller-Rabin & Strong Lucas
# =============================================================================
# Since 2 in T, candidate_sol[0] = r mod 8 lies in S_2 = {3, 5}.
# More generally, for an odd prime p = 2^s * d + 1, quadratic reciprocity gives:
#   - p = 3 mod 8  => s = 1, d = (p-1)>>1, and 2^d == -1 mod p
#   - p = 7 mod 8  => s = 1, d = (p-1)>>1, and 2^d == +1 mod p
#   - p = 5 mod 8  => s = 2, d = (p-1)>>2, and 2^(2d) == -1 mod p
#   - p = 1 mod 8  => s >= 3, full squaring loop up to r = s - 2
# Notice that for 3, 5, and 7 mod 8, the 2-adic valuation s is known a priori,
# so we never need to call d.valuation(2) inside the hot loop!
# =============================================================================

rmod8 = candidate_sol[0] % 8
k2mod8 = k[2] % 8
k3mod8 = k[3] % 8

if rmod8 in (1, 5):
    ourcase = [rmod8] * 3
else:
    ourcase = [
        rmod8,
        (k2mod8 * (rmod8 - 1) + 1) % 8,
        (k3mod8 * (rmod8 - 1) + 1) % 8,
    ]


def MR_1(p):
    """Base-2 Miller-Rabin for p == 1 mod 8 (requires s = v_2(p-1) >= 3)."""
    d = p - 1
    s = d.valuation(2)
    d >>= s

    x = pow(2, d, p)
    if x == 1 or x == p - 1:
        return True

    for _ in range(s - 3):
        x = (x * x) % p
        if x == p - 1:
            return True
    return False


def MR_5(p):
    """
    Base-2 Miller-Rabin for p == 5 mod 8.
    Since p - 1 == 4 mod 8, s = 2 always and d = (p - 1) >> 2.
    """
    d = (p - 1) >> 2
    x = pow(2, d, p)
    return (x * x) % p == p - 1


def MR_3(p):
    """
    Base-2 Miller-Rabin for p == 3 mod 8.
    Since p - 1 == 2 mod 8, s = 1 always and d = (p - 1) >> 1.
    """
    return pow(2, (p - 1) >> 1, p) == p - 1


def MR_7(p):
    """
    Base-2 Miller-Rabin for p == 7 mod 8.
    Since p - 1 == 6 mod 8, s = 1 always and d = (p - 1) >> 1.
    """
    return pow(2, (p - 1) >> 1, p) == 1


def MR_1_checked(p):
    return MR_1(p) and (not p.is_square())


MR_DISPATCH = {
    1: MR_1_checked,
    3: MR_3,
    5: MR_5,
    7: MR_7,
}


def MR(i, p):
    return MR_DISPATCH[i](p)


# =============================================================================
# Strong Lucas Test with Selfridge Parameters (for Baillie-PSW experiments)
# =============================================================================

SELFRIDGE_D = tuple((-1) ** i * (2 * i + 5) for i in range(20))


def selfridge_D(n):
    n = Integer(n)
    for D in SELFRIDGE_D:
        if kronecker_symbol(D, n) == -1:
            return Integer(D)
    return Integer(45)


def lucas_parameters(n):
    D = selfridge_D(n)
    if D == 5:
        P = Integer(5)
        Q = Integer(5)
    else:
        P = Integer(1)
        Q = (1 - D) // 4
    return D, P, Q


def lucas_uv(n, k, P, Q):
    n = Integer(n)
    k = Integer(k)
    P = Integer(P)
    Q = Integer(Q)

    if k == 0:
        return Integer(0), Integer(2 % n), Integer(1 % n)

    D = P * P - 4 * Q
    inv2 = inverse_mod(2, n)

    U = Integer(1)
    V = P % n
    Qk = Q % n

    for bit in bin(k)[3:]:
        U2 = (U * V) % n
        V2 = (V * V - 2 * Qk) % n
        Q2 = (Qk * Qk) % n

        if bit == '0':
            U, V, Qk = U2, V2, Q2
        else:
            U = ((P * U2 + V2) * inv2) % n
            V = ((D * U2 + P * V2) * inv2) % n
            Qk = (Q2 * Q) % n

    return U, V, Qk


def strong_lucas(n):
    D, P, Q = lucas_parameters(n)
    m = n + 1
    s = m.valuation(2)
    d = m >> s

    U, V, Qd = lucas_uv(n, d, P, Q)

    if U == 0 or V == 0:
        return True

    for _ in range(1, s):
        V = (V * V - 2 * Qd) % n
        Qd = (Qd * Qd) % n
        if V == 0:
            return True
    return False


# Bind the exact test functions for p1, p2, p3 outside the hot loop
test_p1 = MR_DISPATCH[ourcase[0]]
test_p2 = MR_DISPATCH[ourcase[1]]
test_p3 = MR_DISPATCH[ourcase[2]]


def find_triple(M, r, k2, k3, t, B=10*t ** 2, block_size=10*t ** 2):
    """
    Search for j >= 0 such that:
        p1 = r + j * M
        p2 = k2 * (p1 - 1) + 1 = A2 + j * M2
        p3 = k3 * (p1 - 1) + 1 = A3 + j * M3
    are all probable primes and n = p1 * p2 * p3 passes Miller-Rabin over T.
    By Mertens' third theorem and FFT multiplication asymptotics, B = t^2 is
    the optimal sieve bound.
    """
    data = prepare_sieve(M, r, k2, k3, t, B)
    zero_buf = bytes(block_size)

    # Precompute linear progression constants for p2 and p3
    A2 = k2 * (r - 1) + 1
    A3 = k3 * (r - 1) + 1
    M2 = k2 * M
    M3 = k3 * M

    k0 = 0
    while True:
        good = sieve_block(k0, block_size, data, zero_buf)

        # Scan survivors at C speed using bytearray.find(1)
        i = good.find(1)
        while i != -1:
            j = k0 + i
            p1 = r + j * M
            if test_p1(p1):
                p2 = A2 + j * M2
                if test_p2(p2):
                    p3 = A3 + j * M3
                    if test_p3(p3):
                        pseudoprime = p1 * p2 * p3
                        if miller_rabin(pseudoprime):
                            return p1, p2, p3, pseudoprime
            i = good.find(1, i + 1)

        k0 += block_size


p1, p2, p3, pseudoprime = find_triple(mod, r, k[2], k[3], t)

print('p1 is ', p1)
print('p2 is ', p2)
print('p3 is ', p3)
print('pseudoprime: ', pseudoprime)
print('bitlength: ', pseudoprime.nbits(), 'digits: ', pseudoprime.ndigits())

current_time = time.time()
total_time = current_time - start_time
print(f'Program took {total_time:.4f} seconds to run.')
