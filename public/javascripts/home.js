const exemplar = new Singleton('/');
console.log(exemplar.getInstance());

const exemplar2 = new Singleton('/connect');
console.log(exemplar2.getInstance());
