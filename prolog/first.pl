member(X, [X|_]).
member(X, [_|T]):-member(X, T).

nat(0).
nat(X):-nat(Y),X is Y+1.


append3([], X, X).
append3([H|T], L2, [H|R]):-append3(T, L2, R).

/* filter all elements that are greater than 6 */
sift([],[]).
sift([H|T],[H|Res]):- H > 6, sift(T,Res).
sift([_|T],Res):- sift(T,Res).


startsWith([],_).
startsWith([H|T], [H|T1]):-startsWith(T,T1).

endsWith(L1,L1).
endsWith(L1, [_|T]):-endsWith(L1,T).

/* finish pls. The internal sublists are not evaluated */
isAConsecutiveSublist(L1, L2):-startsWith(L1,L2).
isAConsecutiveSublist(L1, L2):-endsWith(L1,L2).


/* List length */
len(0,[]).
len(X, [_|T]):-len(Y,T), X is Y + 1.

/* delete all Xs from a List */
delete_all([],_,[]).
delete_all([X|T], X, Res):- delete_all(T, X, Res).
delete_all([H|T], X, [H|Res]):- not(H = X), delete_all(T, X, Res).


replace_all([],_,_,[]).
replace_all([X|T], X, Y, [Y|Res]):- replace_all(T, X, Y, Res).
replace_all([H|T], X, Y, [H|Res]):- not(H = X), replace_all(T, X, Y, Res).


concat([],X,X).
concat([H1|T1], L2, [H1|Res]):- concat(T1, L2, Res).

/* append2(listOfLists, Result) */
append2([], []).
append2([H|L], Res):- concat(H, Res2, Res), append2(L, Res2).


all_sublists(X, L2):-append([_,X,_], L2).


all_sublists_with_length(X, N, L):-append([_,X,_], L), len(N, X).

/* math */
division_remainder(X,Y,X):- Y > X.
division_remainder(X,Y,Res):- Z is X - Y, Z >= 0, division_remainder(Z,Y,Res).

division_whole(X,Y,0):- Y > X.
division_whole(X,Y,Res):- Z is X - Y, division_whole(Z, Y, Res1), Res is Res1 + 1.



/* all divisors of N */
is_divisor(X, N):- division_remainder(N,X,0).
all_divisors_greater_than(1, 0, [1]).
all_divisors_greater_than(X, Y, []):-Y > X.
all_divisors_greater_than(X, Y, Res):- not(is_divisor(Y, X)), Y is Y1 + 1, all_divisors_greater_than(X, Y1, Res).
all_divisors_greater_than(X, Y, [Y|Res]):- is_divisor(Y, X), Y is Y1 + 1, all_divisors_greater_than(X, Y1, Res).


/* last element from a list */
last_of(X, [X]).
last_of(X, L):-append2([_,[X]],L), len(N,L), N > 0.

list_init(L1, L2):-append2([L1,[_]],L2).

appendN([],[]).
appendN([H|T], Res):- concat(H, Y, Res), appendN(T, Y).

memberN(X, [X|_]).
memberN(X, [_|T]):- memberN(X, T).

with_len_3(X, L):-appendN([_,X,_], L), len(3, X).
non_empty_sublists(X, L):- appendN([_,X,_], L), len(N, X), not(N = 0).

reverseN([H|T], L):-appendN([T,[H]], L).

integ(0).
integ(X):-integ(X1), X is X1 + 1.


odd(1).
odd(X):-odd(X1), X is X1 + 2.

even(2).
even(X):-even(X1), X is X1 + 2.

bigger_than_every_el(_, []).
bigger_than_every_el(X, [H|T]):- X > H, bigger_than_every_el(X, T).

max_of(X, [X]).
max_of(X, [X|T]):- bigger_than_every_el(X,T).
max_of(X, [H|T]):- X > H, max_of(X, T).

/* X spisaci koito se vijdat */

/* exam 8apr 2017 task 1 test 1 ?- p([1,0,2,1,3,4,2],X). */

p([H|T], X):- p2(X, [H|T], H-1).

p2([], [], _).
p2(X,[H|T],N):- H < N, p2(X, T, N).
p2([H|T1], [H|T], N):- p2(T1, T, H), H > N.

/* ?- member(X, [[1,2],[1],[2], [2,3],[3],[1,3],[1,1]]), concat(T1, T2, X), member(T1,[[1,2],[1],[2],[2,3],[3],[1,3],[1,1]]), member(T2,[[1,2],[1],[2],[2,3],[3],[1,3],[1,1]]). */

zad2(X, L):- member(X, L), concat(T1,T2,X), member(T1,L), member(T2,L).