/* dvumesten predikat dali 2 celi 4isla imat edni i su6ti prosti deliteli */
int(0).
int(N):-int(N1), N is N1 + 1.

between(A, A, Y):- A < Y.
between(A, X, Y):- X < Y, X1 is X + 1, between(A, X1, Y).

divisable(X, Y):- K is X mod Y, K = 0.

prime(2).
prime(X):- X > 2, not((between(Y, 2, X), divisable(X, Y))).
