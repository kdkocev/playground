%% p(L, N)
%%  L spisak + 4isla
%% N 4islo 
%%  razpoznava dali N moje da se predstavi kato proizvedenie na nqkolko elementa ot L





sum([], 0).
sum([H|T], N):- sum(T, N1), N is N1 + H.


member(X, [X|_]).
member(X, [_|T]):-member(X, T).

concat([], Y, Y).
concat([H|T], Y, [H|Res]):-concat(T, Y, Res).

append2([], []).
append2([X|T], Res):-concat(X, Res2, Res), append2(T, Res2).

isSubsetOf(L, R):-not((member(X, L), not(member(X, R)))).

p1(L):-not(( member(A, L), member(B, L), concat(A, B, AB), append2(L, All), not((isSubsetOf(AB, All), not(isSubsetOf(All, AB)))))).


%% nqma A i B takiva 4e da nqma C koeto da e ...
%% Va,b e L => E c e L(hasDifferentMember(c, [ab]))
%% A => B .... !A || B
%% !A || B ====  !(A && !B)

%% First list has an element that is not in the second list
%% hasDifferentMember(L1, L2):-member(X, L1), not(member(X, L2)).
hasDifferentMember(L1, L2):-list_to_set(L1, L1S), list_to_set(L2, L2S), len(L1S, N1), len(L2S, N2), N1 > N2.

p(L, N):-append2([_,X,_], L), append2([_,Y,_], L), sum(X, N1), sum(Y, N2), N is N1 + N2.

len([], 0).
len([_|T], N):-len(T, N1), N is N1 + 1.
