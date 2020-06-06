%% A < B <=> x e A => x e B
%% x e A => x e B         <=>     not(x e A ^ not(x e B))

%% A => B
%% !A || B
%% A & !B


%% x e L <=> L: [H|T], (x == H) || x e T
%% member(X, L)

member(X, [X|_]).
member(X, [_|T]):-member(X, T).

issubset(A, B):-not((member(X, A), not(member(X, B)))).

concat([], L2, L2).
concat([H|T], L2, [H|Res]):-concat(T, L2, Res).

%% append2([[1,2,3], [4,5],[6,7]], [1,2,3,4,5,6,7]).
append2([], []).
append2([H|T], R):-concat(H, L, R), append2(T, L).