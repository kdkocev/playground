member(X, [X|_]).
member(X, [_|T]):-member(X, T).

min(X, L):-member(X, L), not((member(Y, L), Y < X)).

min2(X, [H]):- X =< H.
min2(X, [H|T]):- X =< H, min2(X, T).

sorted([_]).
sorted([H|T]):-min2(H, T), sorted(T).

mysort(L, R):-sorted(R), member(X, L), member(X, R).

musort(L, R):-not(member(X, L)), not(member(X, R)).
musort(L, R):-member(X, L), member(X, R).

concat([], Y, Y).
concat([H|T], Y, [H|Z]):-concat(T, Y, Z).

append2([],[]).
append2([H|T], L):-concat(H, L2, L), append2(T, L2).

%% without(L, X, R):-
without(L, X, R):-append2([L1, [X], L2], L), append2([L1, L2], R).

misort([], []).
misort(L, [X|R]):-min(X, L), without(L, X, L1), misort(L1, R).

variation(L, [H|R]):-without(L, H, L1), variation(L1, R).
variation([], []).

varsort(L, R):-variation(L, R), sorted(R).