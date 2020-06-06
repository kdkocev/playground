/* p(X,Y) ako X e spisak ot spisaci v Y da se generirat pri preudovletvorqvane spisacite koito sa dekartovo proizvedenie na spisacite v X:  x = [[1,2,3],[4],[6,7]] to Y trqbva da e [[1,4,6],[1,4,7],[2,4,6],[2,4,7] i tn] */
concat([], Y, Y).
concat([H|T], Y, [H|L]):-concat(T, Y, L).

append2([],[]).
append2([H|T], L):-concat(H, L2, L), append2(T, L2).

len(0, []).
len(N, [_|T]):-len(N1, T), N is N1 + 1.

int(0).
int(N):-int(N1), N is N1 + 1.

member(X, [X|_]).
member(X, [_|T]):-member(X, T).

foreach(X, L):-append2([_,X,_],L), len(1, X).

p([],[]).
p([HL|TL], [H|T]):-member(H, HL), p(TL, T).

/* solution here is correct */
