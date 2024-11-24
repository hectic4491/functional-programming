// Chapter 1; A Brief Encounter

/*
Let's start with a touch of insanity. Here is a seagull application.
When flocks conjoin they become a larger flock, and when they breed,
they increase by the number of seagulls with whom they're breeding.
Now, this is not intended to be good Object-Oriented code, mind you,
it is here to highlight the perils of our modern, assignment based
approach. Behold:
*/

class Flock {
  constructor(n) {
    this.seagulls = n;
  }

  conjoin(other) {
    this.seagulls += other.seagulls;
    return this;
  }

  breed(other) {
    this.seagulls = this.seagulls * other.seagulls;
    return this;
  }
}

let flockA = new Flock(4);
let flockB = new Flock(2);
let flockC = new Flock(0);
let result = flockA
  .conjoin(flockC)
  .breed(flockB)
  .conjoin(flockA.breed(flockB))
  .seagulls;

console.log(result) // -> 32

/*
Who on earth would craft such a ghastly abomination? It is unreasonably
difficult to keep track of the mutating internal state. And, good heavens,
the answer is even incorrect! It should have been 16, but flockA wound up
permanently altered in the process. Poor flockA.

If you don't understand this program, it's okay, neither do I. The point
to remember here is that the state and mutable values are hard to follow,
even in such a small example.

Let's try again, this time using a more functional approach:
*/

let conjoin = (flockX, flockY) => flockX + flockY;
let breed = (flockX, flockY) => flockX * flockY;

flockA = 4;
flockB = 2;
flockC = 0;
result = 
  conjoin(breed(flockB, conjoin(flockA, flockC)), breed(flockA, flockB));

console.log(result) // -> 16

/*
Well, this time we got the right answer. With much less code. The 
function nesting is a tad confusing... (we'll remedy this in chapter 5).
It's better, but let's dig a little bit deeper. Had we scrutinized our
custom functions more closely, we would have discovered that we're just
working with simple addition (conjoin) and multiplication (breed).

There's really nothing special at all about these two functions other
than their names. Let's rename our custom functions to multiply and add
in order to reveal their true identities.
*/

const add = (x, y) => x + y;
const multiply = (x, y) => x * y;
result =
  add(multiply(flockB, add(flockA, flockC)), multiply(flockA, flockB));

console.log(result) // -> 16

/*
And with that, we gain the knowledge of the ancients:

// associative
add(add(x, y), z) === add(x, add(y, z))

// commutative
add(x, y) === add(y, x);

// identity
add(x, 0) === x;

// distributive
multiply(x, add(y, z)) === add(multiply(x, y), multiply(x, z));


Let's see if we can use these properties to simplify our little seagull
program:

// original like
add(multiply(flockB, add(flockA, flockC)), multiply(flockA, flockB));

// apply the identity property to remove the extra add
// (add(flockA, flockC) == flockA)
add(multiply(flockB, flockA), multiply(flockA, flockB));

// apply distributive property to achieve our result
multiply(flockB, add(flockA, flockA));

Great! We didn't have to write a lick of custom code other than our
calling function. We include add and multiply definitions here for
completeness, but there is really no need to write them. We surely have
an add and multiply provided by some existing library.

Throughout this book, we'll sprinkle in some category theory, set theory,
and lambda calculus and write real world examples that achieve the same
elegant simplicity and results as our flock of seagulls example.
*/