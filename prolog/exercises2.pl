mymember(X, [X|_]).
mymember(X, [_|T]):-mymember(X, T).

concat([], Y, Y).
concat([H|T], Y, [H|L]):-concat(T, Y, L).

append2([X], X).
append2([HL|TL], Res):-concat(HL, Res2, Res), append2(TL, Res2).

%% list diameter
%% occurences(X, L, N)
occurences(_, [], 0).
occurences(X, [X|L], N):-occurences(X, L, N1), N is N1 + 1.
occurences(X, [H|L], N):-occurences(X, L, N), X \= H.

unique([], []).
unique([H|T], R):-unique(T, R), member(H, R).
unique([H|T], [H|R]):-unique(T, R), not(member(H, R)).

mostfrequent(L, N):-unique(L, Uniq), member(X, Uniq), occurences(X, L, N), not(
	(member(Y, Uniq), occurences(Y, L, N1), N1 > N)
).

leastfrequent(L, N):-unique(L, Uniq), member(X, Uniq), occurences(X, L, N), not(
	(member(Y, Uniq), occurences(Y, L, N1), N1 < N)
).

list_diameter(L, N):-mostfrequent(L, Most), leastfrequent(L, Least), N is Most - Least.

int(0).
int(N):-int(N1), N is N1 + 1.

mostfreq(L, N):-unique(L, R), member(X, R), occurences(X, L, N), not(
	(member(Y, L), occurences(Y, L, N1), N1 > N)
).

leastfreq(L, N):-unique(L, R), member(X, R), occurences(X, L, N), not(
	(member(Y, L), occurences(Y, L, N1), N1 < N)
).

min(X, L):-member(X, L), not((member(Y, L), Y < X)).

without([H|L], X, [H|R]):-X \= H, without(L, X, R).
without([X|L], X, R):-without(L, X, R).

mysort([], []).
mysort(L, [H|R]):-member(H, L), min(H, L).