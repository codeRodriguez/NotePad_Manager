// Main JS File

var Util = {
    View: {
        test: function() {
            console.log("Views Object is Work");
        }
    },

    Events: {   
        onClickNewNote: function() {
            $('#btn_new_note').click(function() {
                alert('onClick');
            });
        }
    },

    AjaxOject: {
        test: function() {
            console.log("Ajax Object is Work");
        }
    },

    // Object Util's functions
    start: function() {        
        this.Events.onClickNewNote();
    }
}