 member(H, [H|_]).
member(H, [_|T]) :- member(H, T).

concat([], L2, L2).
concat([H|T], L2, [H|Res]):-concat(T, L2, Res).

append2([], []).
append2([H|T], R):-concat(H, L, R), append2(T, L).

min(X, L):-member(X, L), not((member(Y, L), Y < X)).

without([], _, []).
without([H|T], H, L):- without(T, H, L).
without([H|T], X, [H|L]):- dif(X, H), without(T, X, L).

without_one_occurence([], _, []).
without_one_occurence([H|T], H, T).
without_one_occurence([H|T], X, [H|L]) :- dif(X, H), without_one_occurence(T, X, L).

sorted([], []).
sorted(L, [H|T]):- min(H, L), without_one_occurence(L, H, L1), sorted(L1, T).

last_two([X, Y], [X, Y]).
last_two([_|T], R) :- last_two(T, R).

two_oldest_ages(Ages, Result) :- sorted(Ages, Sortedages), last_two(Sortedages, Result).