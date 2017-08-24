// Main JS File

var Util = {
    NoteListArray: [],
    // Object View ------------------------------------------------------------------
    View: {
        /**
         * @param {string} element
         */
        disabled: function(element) {
            $(element).css("display", "none");
        },

        /**
         * @param {string} element
         */
        enable: function(element) {
            $(element).css("display", "block");
        },

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
            Util.View.disabled('#buttons_confirm_edit');
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
        },

        makeFormdetails: function() {
            return '<div class="form-details">' +
                'tittle' +
                '<input id="tittle" type="text" placeholder="Tittle">' +
                'Description' +
                '<textarea id="details" cols="30" rows="10"></textarea>' +
                'begin' +
                '<input id="date_begin" type="date">' +
                'end' +
                '<input id="date_end" type="date">' +
                '<div id="buttons_confirm_edit" class="container-button">' +
                    '<div class="center">' +
                        '<div id="btn_accept" class="img-accept"></div>' +
                        '<div id="btn_cancel" class="img-cancel"></div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        }
    },
    // Object Events ------------------------------------------------------------------
    Events: {   
        onClickNewNote: function() {
            $('#btn_new_note').click(function() {
                alert('onClick');
            });
        },

        onClickEditNote: function() {
            $('#btn_edit').click(function() {                
                Util.View.enable('#buttons_confirm_edit');
                Util.Events.onClickCancelEditOption();
            });
        },

        onClickCancelEditOption: function() {
            $('#btn_cancel').click(function() {
                Util.View.disabled('#buttons-options-details');
                Util.View.disabled('.form-details'); 
            })
        },

        onClickCardNote: function() {
            $('.card-note').click(function() {
                //alert('tittle:'+ Util.getNoteById($(this).attr('id'))['tittle']);                
                var note = Util.getNoteById($(this).attr('id'));
                Util.View.updatePanelNoteDetails(note);

                Util.View.enable('#buttons-options-details');
                Util.View.enable('.form-details');
                Util.View.disabled('#buttons_confirm_edit');
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
            Util.View.disabled('#buttons-options-details');
            $('.panel-work-note-details').append(Util.View.makeFormdetails());                  
            Util.View.disabled('.form-details');  
            Util.Events.onClickEditNote();
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