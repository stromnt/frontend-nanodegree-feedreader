/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*
         * Check that every feed has a non empty url defined.
         */
        it('has a non empty url for each feed', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.trim().length).toBeGreaterThan(0);
            });
        });

        /*
         * Check that every feed has a valid name
         *
         */
        it('has a non empty name for each feed', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.trim().length).toBeGreaterThan(0);
            });
        });
    });


    /* Suite to test menu functionality */
    describe('The menu', function() {

        /*
         * Check that the menu is intially hidden
         */
        it('menu should be hidden initially', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /*
         * Check that clicking the menu button toggles the slideout on and off
         */
        it('menu toggles on and off when menu item is clicked', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);

        });
    });

    /* Suite to test the initial feed entries */
    describe('Initial Entries', function() {
        /*
         * Test to check that the first feed has at least 1 entry
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('feed has at least one entry', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });

    });

    /* Suite to check that a new feed loads */
    describe('New Feed Selection', function() {
        /*
         * Check that a new feed loads different content to the initial feed
         */
        var first;
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        beforeEach(function(done) {
            first = $('.feed').html();
            loadFeed(1, function() {
                done();
            });
        });

        it('feed has changed', function() {
            expect($('.feed').html()).not.toEqual(first);
            loadFeed(0);
        });

    });

}());