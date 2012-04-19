// s6d
module parent {
    module common at 'fixtures/recursive/useCase2/common.js';
    module child at 'fixtures/recursive/useCase2/child.js';
    export common, child;
}
// -s6d

// Use Case 2: Parent and child share a common dependency

console.log('running INDEX.JS', common);