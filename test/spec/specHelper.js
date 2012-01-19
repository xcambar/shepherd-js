beforeEach(function () {
    this.addMatchers({
        toHaveMembers: function (expected) {
            for (var i = 0; i < expected.length; i++) {
                if(!this.actual.hasOwnProperty(expected[i])) {
                    return false;
                }
            }
            return true;
        }
    })
})