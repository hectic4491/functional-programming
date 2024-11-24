// Chapter 2; First Class Functions

/*
# A Quick Review

When we say functions are "first class", we mean they are just like
everyone else. So in other words, like a normal class. We can treat
functions like any other data type and there is nothing particularly
special about them. They may be stored in arrays, passed around as
function parameters, assigned to variables, and what have you.

That is JavaScript 101, but worth mentioning since a quick code search on
github will reveal the collective evasion, or perhaps widespread
ignorance of this concept. Shall we go for a feigned example? We shall.
*/

let hi = name => `Hi ${name}`;
let greeting = name => hi(name);

/*
Here, the function wrapper around 'hi' in 'greeting' is completely 
redundant. Why? Because functions are callable in JavaScript. When
'hi' has the () at the end it will run and return a value. When it does
not, it simply returns the function stored in the variable. Just to be
sure, have a look yourself.
*/

console.log(hi); // -> [Function: hi]
console.log(hi("jonas")); // -> Hi jonas

/*
Since 'greeting' is merely in turn calling 'hi' with the very same
argument, we could simply write:
*/

greeting = hi;
console.log(greeting("times")) // -> "Hi times"

/*
In other words, 'hi' is already a function that expects one argument,
why place another function around it that simply calls 'hi' with the
same bloody argument? It doesn't make any damn sense. It's like donning
your heaviest parka in the dead of July just to blast the air and demand
an ice lolly.

It is obnoxiously verbose and, as it happens, bad practice to surround 
a function with another function merely to delay evaluation (we'll see
why in a moment, but it has to do with maintenance).

A solid understanding of this is critical before moving on, so let's
examine a few more examples excavated from the library of npm packages.
*/

// ignorant
// const getServerStuff = callback => ajaxCall(json => callback(json));

// enlightened
// const getServerstuff = ajaxCall;

/*
The world is littered with ajax code exactly like this. Here is the
reason both are equivalent:
*/

// this line:
// ajaxCall(json => callback(json));

// is the same as this line:
// ajaxCall(callback);

// so refactor getServerStuff:
// const getServerStuff = callback => ajaxCall(callback);

// ...which is equivalent to this:
// const getServerStuff = ajaxCall; // <- look mum, no ()'s

/*
And that, folks, is how it is done. Once more so that we understand why
I'm being so persistant.
*/

let BlogController = {
  index(posts) { return View.index(posts); },
  show(posts) { return View.show(posts); },
  create(posts) { return Db.create(posts); },
  update(posts, attrs) { return Db.update(posts, attrs); },
  destory(posts) { return Db.destroy(posts); },
};

/*
This ridiculous controller is 99% fluff. We could either rewrite it as:
*/

BlogController = {
  index: Views.index,
  show: Views.show,
  create: Db.create,
  update: Db.update,
  destroy: Db.destroy,
};

/*
... or scrap it altogether since it does nothing more than just bundle
our Views and Db together.
*/

/*
# Why Favor First Class?

...
*/