/**
module child {
    module common at 'fixtures/recursive/useCase2/common.js';
	export common, whatever;
}
**/
console.log('running CHILD.JS', common);
var whatever = 'some value';