%% p(X) if a graph is cyclic
%% X = [ [1, 2], [2, 3], [2, 4], [4, 5], [6, 3], [4, 6], [5, 6] ]
%% G is [ [1, 2], [2, 3], [2, 4], [4, 5], [6, 3], [4, 6], [5, 6] ].
%% [ [1, 2], [2, 3], [2, 4], [4, 5], [6, 3], [4, 6], [5, 6] ]

%% X is a leaf in L e.g. has no paths from X to another node
%% leaf(X, L).

zip([], [], []).
zip([H1|T1], [H2|T2], [[H1,H2]|T]):-zip(T1, T2, T).

%% zipN(L, R) ??

heads([], []).
heads([[H,_]|L], [H|R]):-heads(L, R).

tails([], []).
tails([[_, T]|L], [T|R]):-tails(L, R).

leaf(X, L):-heads(L, Hds), tails(L, Tls), sort(Hds, H), sort(Tls, T), member(X, T), not(member(X, H)).

secondEl([_,X], X).

graphWithout([], _, []).
graphWithout([[_,X]|T], X, Res):-graphWithout(T, X, Res).
graphWithout([H|T], X, [H|Res]):-not(secondEl(H, X)), graphWithout(T, X, Res).


%%  this works. recognises acyclic graphs
acyclic([]).
acyclic(G):-leaf(X, G), graphWithout(G, X, Res), acyclic(Res).


cyclic(G):-not(acyclic(G)).
