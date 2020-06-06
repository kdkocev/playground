member(X, [X|_]).
member(X, [_|T]):-member(X, T).

int(0).
int(X):-int(Y),X is Y+1.

lt(X, Y):-X < Y.

under(X, Y):- X < Y.
under(X, Y):- under(X1, Y), X1 < Y, X is X1 + 1.

between(X, Y, Z):-int(Z), Z > X, Z < Y.

/* list length */
len(0, []).
len(N, [_|T]):-len(N1, T), N is N1+1.

/* last element of a list */
last(X, [X]).
last(X, [_|T]):-last(X,T).


/* y starts with x in startsWith(x, y) */
startsWith([], _).
startsWith([H|T], [H|A]):-startsWith(T, A).

concat([], Y, Y).
concat([H|T], Y, [H|Z]):-concat(T, Y, Z).

append2([],[]).
append2([H|T], L):-concat(H, L2, L), append2(T, L2).

init(X, L):-append2([X,[_]], L).

reverse([],[]).
reverse([H|T], L):-append2([X,[H]], L), reverse(T, X).

sublists(X, L):-append2([_,X,_], L).

foreach(X, L):-append2([_,X,_], L), len(1, X).
/*
	append2(X, [1,2,3])
	append2()
 */
/* reverse list */
/*
	append
	sublists
*/


%% rotate(L, Ntimes, Res)
%% [1,2,3,4,5], 2, [3,4,5,1,2]

rotate(L, 0, L).
rotate([H|T], N, R):-append2([T, [H]], R1), N1 is N - 1, rotate(R1, N1, R).

lessThanAll(_, []).
lessThanAll(X, [H|T]):- X =< H, lessThanAll(X, T).

min(X, L):-member(X, L), lessThanAll(X, L).

mysort([], []).
mysort(L, [H|T]):-min(H, L), append2([L1,[H],L2], L), append2([L1, L2], R), sort(R, T).

mymin(X, L):-member(X, L), not((member(Y, L), Y < X)).