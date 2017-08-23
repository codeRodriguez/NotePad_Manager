// Main JS File

var Util = {
    NoteListArray: [],
    // Object View ------------------------------------------------------------------
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
         * @param {array} note
         */
        updatePanelNoteDetails: function(note) {
            var keys = Object.keys(note);
            var parent = $('.panel-work-note-details');
            for (var i = 0; i < keys.length; i++) {
                parent.find('#'+keys[i]).val(note[keys[i]]);
            }
            /*
            var parent = $('.panel-work-note-details');
            parent.find('#tittle').val(note['tittle']);
            parent.find('#date_begin').val(note['date_begin']);
            */
            
        },

        /**
         * Returns content html <div class="card-note"></div>
         * @param {array} note
         * @returns {string} 
         */
        makeCard: function(note) {            
            return '<div id="'+note['id']+'" class="card-note">' +
            '<h3 class="tittle">'+note['tittle']+'</h3>' +
            '<p class="detail">'+note['details']+'</p>' +
            '<p class="date">'+Util.getDateFormat(note['date_begin'])+'</p>' +
            '</div>';
        }
    },
    // Object Events ------------------------------------------------------------------
    Events: {   
        onClickNewNote: function() {
            $('#btn_new_note').click(function() {
                alert('onClick');
            });
        },

        onClickCardNote: function() {
            $('.card-note').click(function() {
                //alert('tittle:'+ Util.getNoteById($(this).attr('id'))['tittle']);
                var note = Util.getNoteById($(this).attr('id'));
                Util.View.updatePanelNoteDetails(note);
            }); 
        }
    },
    // Object AjaxOject ---------------------------------------------------------------
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

    // Object Util's functions ------------------------------------------------------
    start: function() {        
        Util.Events.onClickNewNote();
        //testing ................
        //this.AjaxOject.request({test: 'msg enviado desde el cliente'}, 'json');         
        Util.AjaxOject.request({test: 'msg enviado desde el cliente'}, 'json')
        .done(function(data, textStatus, jqXHR){
            Util.NoteListArray = data;
            Util.View.updatePanelNoteList(Util.NoteListArray);
            Util.Events.onClickCardNote();
        });                   
    },

    /**
     * Returns false if not found else return json object
     * @param {number} note_id
     * @returns {boolean | object}
     */
    getNoteById: function(note_id) {
        var arrayAux = Util.NoteListArray;
        for (var key in arrayAux) {
            if(arrayAux[key]['id'] == note_id) { return arrayAux[key]}
        }
        
        return false
    },

    getDateFormat: function(date) {
        var d = new Date(date);
        return d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear();
    }
}