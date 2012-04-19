// s6d
module child {
    module common at 'fixtures/recursive/useCase2/common.js';
	export common, whatever;
}
// -s6d
console.log('running CHILD.JS', common);
var whatever = 'some value';