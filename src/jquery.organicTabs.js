(function($) {

    $.organicTabs = function(el, options) {
        var base = this;
        base.$el = $(el);

        base.init = function() {

            base.options = $.extend({},$.organicTabs.defaultOptions, options);

            base.$nav = base.$el.find(base.options.headingsSelector);
            base.$nav.delegate("li a", "click", function() {
                // Figure out ID of new list
                var listID = $(this).attr("href").substring(1);

                // Change to tab
                base.changeTo(listID);

                // Don't behave like a regular link
                // Stop propagation and bubbling
                return false;
            });

        };
        base.init();

        // Save the organicTabs instance into the DOM element properties so that we can call methods on it later on
        el.organicTabs = base;
    };

    /* changeTo - Change the current tab to given tab
     *
     * @param   tabID   (String)  The ID of the tab to change to
     */
    $.organicTabs.prototype.changeTo = function(tabID) {
        var self = this;

        // Figure out current list via CSS class
        var curList = self.currentTab();

        // List moving to
        var $newList = self.$el.find(self.options.headingsSelector + " a[href='#" + tabID + "']");

        // Set outer wrapper height to (static) height of current inner list
        var $allListWrap = self.$el.find(self.options.contentsSelector);
        curListHeight = $allListWrap.height();

        $allListWrap.height(curListHeight);

        if ((curList.length > 0) && (tabID.length > 0) && (tabID != curList) && ( self.$el.find(":animated").length === 0))
        {
            // Fade out current list
            self.$el.find(self.options.contentsSelector + " #" + curList).fadeOut(self.options.fadingSpeed, self.options.fadingEasing, function() {
                // Fade in new list on callback
                var $listEl = self.$el.find(self.options.contentsSelector + " #" + tabID);
                $listEl.fadeIn(self.options.fadingSpeed, self.options.fadingEasing);

                // Adjust outer wrapper to fit new list snuggly
                var newHeight = $listEl.height();

                if(self.options.updateAlong !== null) {
                    $(self.options.updateAlong).each(function(index, el) {
                        $(el).animate({
                            height: $(el).height() - curListHeight + newHeight
                        }, self.options.sizingSpeed,self.options.sizingEasing);
                    });
                }

                $allListWrap.animate({
                    height: newHeight
                }, self.options.sizingSpeed, self.options.sizingEasing, function() {
                    // Trigger the "tab changed" event when it's fully changed
                    self.$el.triggerHandler("organicTabs.changed", [tabID, $listEl]);
                });

                // Remove highlighting - Add to just-clicked tab
                self.$el.find(self.options.headingsSelector + " li a").removeClass("current");
                $newList.addClass("current");
            });
        }
    };

    /* currentTab - Return the ID of the current tab
     *
     * @return ID of the current tab
     */
    $.organicTabs.prototype.currentTab = function() {
        return this.$el.find("a.current").attr("href").substring(1);
    };


    $.organicTabs.defaultOptions = {
        headingsSelector: ".nav",        // jQuery selector string to find headings list(s) inside the target element
        contentsSelector: ".list-wrap",  // jQuery selector string to find contents container(s) inside the target element

        updateAlong: null,	      		 // Provide elements to be updated along with the regular wrapper. It's useful in
        // nesting cases when you want a parent element to be resized correctly

        fadingSpeed: 300,                // Speed of fading animations
        fadingEasing: "swing",           // Easing used for fading animations

        sizingSpeed: 300,                // Speed of resizing animations
        sizingEasing: "swing"            // Easing used for resizing animations
    };

    $.fn.organicTabs = function(args) {
        // Turn arguments into an Array object
        var organicArgs = Array.prototype.slice.call(arguments);

        return this.each(function() {
            // Initialize the tabs if first arg is not a string
            if (typeof args !== "string")
            {
                new $.organicTabs(this, args);
            }
            // If it is a string, it's a method name, so we invoke it
            else
            {
                methodName = organicArgs.shift();
                this.organicTabs[methodName].apply(this.organicTabs, organicArgs);
            }
        });
    };

    /*
     * Automatically apply tabs on DOM having the data-organic-tabs="organic" attribute
     */
    $(function () {
        $('[data-organic-tabs="organic"]').each(function () {
            var $tabs = $(this);

            // TODO: make it possible to declare options through data-organic-tabs-* attributes?
            $tabs.organicTabs();
        });
    });

})(jQuery);