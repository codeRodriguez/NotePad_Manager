// Main JS File

var Util = {
    View: {
        /**
         * @param {array} note_list
         */
        updatePanelNoteList: function(note_list) {
            if(Array.isArray(note_list)) { //check note_list
                var appendCards = '';
                note_list.forEach(function(value, index) {                    
                    appendCards += Util.View.makeCard(value);
                });
                // Insert content at the end
                $('.panel-work-list-note').append(appendCards);
            } else {console.log('ERROR: parameter not is array');}            
        },

        /**
         * Returns content html <div class="card-note"></div>
         * @param {array} note
         * @returns {string} 
         */
        makeCard: function(note) {            
            return '<div class="card-note">' +
            '<h3 class="tittle">'+note['tittle']+'</h3>' +
            '<p class="detail">'+note['details']+'</p>' +
            '<p class="date">'+note['date_begin']+'</p>' +
            '</div>';
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
        /**
         * Returns a Object ajax
         * @param {array} parameters - key/value
         * @param {string} data_type - can be json | text | html ...
         * @returns {object} 
         */ 
        request: function(parameters, data_type) {    
                  
            return $.ajax({
                data: parameters,
                type: 'POST',
                dataType: data_type,
                url: '../server/main.php',
            });
            /*
            .done(function(data, textStatus, jqXHR) {
                
            })
            .fail(function(jqXHR, textStatus, errorThrow) {
                console.log("ERROR: "+ errorThrow);                              
            });
            */
        }
    },

    // Object Util's functions
    start: function() {        
        this.Events.onClickNewNote();
        //testing ................
        //this.AjaxOject.request({test: 'msg enviado desde el cliente'}, 'json');         
        Util.AjaxOject.request({test: 'msg enviado desde el cliente'}, 'json')
        .done(function(data, textStatus, jqXHR){
            Util.View.updatePanelNoteList(data);
        });           
    }
}