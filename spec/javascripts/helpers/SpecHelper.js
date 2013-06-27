beforeEach(function() {
});

var dates = [
{"updated_at": "2013-06-12T02:30:31Z"},
{"updated_at": "2013-04-25T05:28:00Z"},
{"updated_at": "2013-01-11T21:24:10Z"},
{"updated_at": "2013-01-14T16:54:54Z"},
{"updated_at": "2013-01-11T13:56:38Z"},
{"updated_at": "2013-04-15T02:18:27Z"}
];

var expectedDates = [
{"updated_at": "2013-01-11T13:56:38Z"},
{"updated_at": "2013-01-11T21:24:10Z"},
{"updated_at": "2013-01-14T16:54:54Z"},
{"updated_at": "2013-04-15T02:18:27Z"},
{"updated_at": "2013-04-25T05:28:00Z"},
{"updated_at": "2013-06-12T02:30:31Z"}
];
