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
        request: function(parameters, data_type) {
            $.ajax({
                data: parameters,
                type: 'POST',
                dataType: data_type,
                url: '../server/main.php',
            })
            .done(function(data, textStatus, jqXHR) {
                console.log("res: "+ data);
            })
            .fail(function(jqXHR, textStatus, errorThrow) {
                console.log("ERROR: "+ errorThrow);
            });
        }
    },

    // Object Util's functions
    start: function() {        
        this.Events.onClickNewNote();
        //testing ................
        this.AjaxOject.request({test: 'msg enviado desde el cliente'}, 'text');
    }
}