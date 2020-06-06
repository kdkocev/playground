member(X, [X|_]).
member(X, [_|T]):-member(X, T).

occurences(_, 0, []).
occurences(X, N, [H|T]):-H \= X, occurences(X, N, T).
occurences(X, N, [X|T]):-occurences(X, N1, T), N is N1 + 1.

second([_,X], X).

maxOcc(X, L):-member(Y, L), second(Y, X), not((member(Z, L), second(Z, X1), X1 > X)).

hist([], []).
hist([H|T], [[H, N]|T1]):-occurences(H, N1, T), N is N1 + 1, hist(T, T1).
