concat([], Y, Y).
concat([H|T], Y, [H|L]):-concat(T, Y, L).

append2([], []).
append2([H|T], R):-concat(H, L, R), append2(T, L).

repeated(_, _, []).
repeated(X, Y, R):- append2([X, X, T], R), repeated(X, Y, T).
repeated(X, Y, R):- append2([X, Y, T], R), repeated(X, Y, T).
repeated(X, Y, R):- append2([Y, X, T], R), repeated(X, Y, T).
repeated(X, Y, R):- append2([Y, Y, T], R), repeated(X, Y, T).

p(A, B, C, K):-concat(R, A, K), concat(B, C, BC), repeated(B, BC, R).

/*
B B
B BC
BC B
BC BC

A
B B A
B BC A
BC B A
BC BC A
B B B B A
B B B BC A
B B BC B A
B B BC BC A
B BC B B A
B BC B BC A
B BC BC B A
B BC BC BC A
BC B B B A
BC B B BC A
BC B BC B A
BC B BC BC A
BC BC B B A
BC BC B BC A
BC BC BC B A
BC BC BC BC A
B B B B B B A
B B B B B BC A
B B B B BC B A
B B B B BC BC A
*/
