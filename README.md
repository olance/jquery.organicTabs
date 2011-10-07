
jQuery.organicTabs
=============

This jQuery plugin has first been authored by Chris Coyier at [css-tricks.com](http://css-tricks.com/4530-organic-tabs/).
Here's what he stated as the goal of his [tutorial](http://css-tricks.com/4530-organic-tabs/):

> The plan is to build a tabbed area, something pretty simple to do from scratch with jQuery, and then make it behave better. Of course, we'll keep it simple, and keep the markup clean and semantic. The guts of the functionality will be based on calculating heights and animating between those heights on the fly.


The idea behind this repository is to enhance the original code to remove some quirks and improve/add some features.


Usage
-----

### HTML Markup

To be able to use _organicTabs_, your HTML Markup must be adapted to some of its expectations.
Here is an example of a compatible markup:

    <div id="tabbed-area">
        <ul class="nav">
            <li><a href="#featured" class="current">Featured</a></li>
            <li><a href="#core">Core</a></li>
            <li><a href="#classics">Classics</a></li>
        </ul>

        <div class="list-wrap">
            <div id="featured">
                <p>Featured Stuff in here!</p>
            </div>

            <div id="core" class="hidden">
                <p>Core Stuff in here!</p>
            </div>

            <div id="classics" class="hidden">
                <p>Classic Stuff in here!</p>
            </div>
        </div> <!-- END List Wrap -->
    </div> <!-- END Tabbed Area -->


Here are the requirements:

   - _organicTabs_ is applied on a _tabbed area_ which wraps the tabs buttons/links and their corresponding content.

   - Tabs buttons must be listed in an (un)ordered list with the CSS class "nav" set.

   - In this list, each item must contain an anchor tag which will be the clickable element that'll trigger the tab's display.

   - This anchor tags have the following requirements:
     - The currently displayed tab receives the CSS class "current". The default tab must have this class set in the markup.
     - The _href_ attribute of each anchor tag must be "#" followed by the _id_ of the element to display as the tab's content.

   - The tabs' contents elements must be wrapped in a _div_ with the CSS class "list-wrap" set.
  
   - Containers for each tab must have their _id_ set to the corresponding anchor tag's _href_ attribute as explained above.

   - Containers for tabs that are not the default tab must be hidden. The script will fade them in when their corresponding anchor tag is clicked.


### Javascript

Here's how you would call _organicTabs_ for the example above:

    $("#tabbed-area").organicTabs();

You can also customize the animation speed:

    $("#tabbed-area").organicTabs({
        speed: 150
    });


### Options (and default values)

    {
        speed: 300  // Speed of fade and resizing animations
    }


Credits
-------

Thanks of course go to Chris Coyier for a simple yet effective plugin!

License
-------

The [original code](http://css-tricks.com/4530-organic-tabs/) by Chris Coyier has been released under this very permissive (^^) license:

> (...) the idea is that you can take this, hack it to pieces, do whatever you want with it, preferably become rich and famous.


This modified version of organicTabs is released under the MIT license:

> Copyright (c) 2010 Olivier Lance

> Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

> The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.