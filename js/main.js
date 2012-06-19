window.HomeView = Backbone.View.extend({

    template:_.template($('#home').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.Page1View = Backbone.View.extend({

    template:_.template($('#page1').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.Page2View = Backbone.View.extend({

    template:_.template($('#page2').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

var AppRouter = Backbone.Router.extend({

    routes:{
        "":"home",
        "page1":"page1",
        "page2":"page2"
    },

    initialize:function () {
        // Handle back button throughout the application
        $('.back').live('click', function(event) {
            window.history.back();
            return false;
        });
        this.firstPage = true;
    },

    home:function () {
        console.log('#home');
        this.changePage(new HomeView());
    },

    page1:function () {
        console.log('#page1');
        this.changePage(new Page1View());
    },

    page2:function () {
        console.log('#page2');
        this.changePage(new Page2View());
    },

    changePage:function (page) {
        var options = {
            changeHash: false,
        };
        
        $(page.el).attr('data-role', 'page');
        page.render();
        $('body').append($(page.el));
        
        // We don't want to slide the first page
        if (this.firstPage) {
            options.transition = 'none';
            this.firstPage = false;
        }
        
        // Find the anchor that triggered this page change and mix-in the relevant data attributes
        else if (this.clickedAnchor) {
            _.extend({
                reverse: (this.clickedAnchor.data().direction === 'reverse'),
    			transition: this.clickedAnchor.data().transition
            }, options);
            
            this.clickedAnchor = null;
        }
        
        $.mobile.changePage($(page.el), options);
    }

});

$(document).ready(function () {
    console.log('document ready');
    app = new AppRouter();
    
    // Bind to click events so we can store the anchor that triggered the page change.
    $(document).bind("click", function(event) {
    	app.clickedAnchor = $(event.target).closest('a');
	});
    
    Backbone.history.start();
});