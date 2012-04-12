/**
module parent {
    module common at '/test/fixtures/recursive/useCase2/common.js';
    module child at '/test/fixtures/recursive/useCase2/child.js';
    export common, child;
}
**/

// Use Case 2: Parent and child share a common dependency

console.log('running INDEX.JS', common);