(typeof window != 'undefined') && describe('Declare modules by their URLs', function () {
    it ('should be able to import modules from a relative URL', function () {
        var spy = this.loadModule('fixtures/importFromRelativeURL.js');
        runs(function () {
            expect(s6d.get('fixtures/importFromRelativeURL.js').imp1()).toEqual('external loaded');
            expect(typeof s6d.get('fixtures/importFromRelativeURL.js').ref1).toBe('function');
        });
    });

    it ('should be able to import modules from an absolute URL (works ONLY when the baseURL of Jasmine spec runner is /test)', function () {
        var spy = this.loadModule('fixtures/importFromAbsoluteURL.js');
        runs(function () {
            expect(s6d.get('fixtures/importFromAbsoluteURL.js').imp1()).toEqual('external loaded');
            expect(typeof s6d.get('fixtures/importFromAbsoluteURL.js').ref1).toBe('function');
        });
    });
});
