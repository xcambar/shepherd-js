(typeof s6d != 'undefined') && describe('Declare modules by their URLs', function () {
    it ('should be able to import modules from a relative URL', function () {
        var spy = this.loadModule('fixtures/importFromRelativeURL.js');
        runs(function () {
            expect(s6d.get('fixtures/importFromRelativeURL.js').imp1()).toEqual('external loaded');
            expect(typeof s6d.get('fixtures/importFromRelativeURL.js').ref1).toBe('function');
        });
    });

    it ('should be able to import modules from an absolute URL (WORKS WHEN htpp://localhost:8000/test IS THE JASMINE BASE URL!)', function () {
        var spy = this.loadModule('fixtures/importFromAbsoluteURL.js');
        runs(function () {
            expect(s6d.get('fixtures/importFromAbsoluteURL.js').imp1()).toEqual('external loaded');
            expect(typeof s6d.get('fixtures/importFromAbsoluteURL.js').ref1).toBe('function');
        });
    });
});
