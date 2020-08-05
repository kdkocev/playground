(define (mylength l)
  (define (iter l n)
    (if (eq? l '()) n (iter (cdr l) (+ n 1)))
    )
  (iter l 0)
)

(define (myfilter pred l)
  (define (iter l res)
    (if (eq? l '()) res
        (if (pred (car l))
            (iter (cdr l) (cons (car l) res))
            (iter (cdr l) res)
            )
        )
    )
  (reverse (iter l (list)))
)

(define (myreverse l)
  (define (iter l res)
    (if (eq? l '()) res
        (iter (cdr l) (cons (car l) res)))
  )
  (iter l '())
)

(define (mymap f l)
  (define (iter l res)
    (if (eq? l '()) res
        (iter (cdr l) (cons (f (car l)) res))
        )
    )
  (reverse (iter l '()))
  )

(define (range x y)
  (define (iter a b res)
    (if (< b a) res
        (iter a (- b 1) (cons b res))
        )
    )
  (iter x y '())
  )
