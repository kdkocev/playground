const Y = h => (f => f(f))(g => h(x => g(g)(x)));

// const why = f => (x => f(x(x)))(x => f(x(x)))

module.exports = {Y}