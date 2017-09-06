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
                Util.Events.onClickCheckIsDone();
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
            var isDoneClass = 'is-done-'+note['is_done'];
            var checked = note['is_done'] ? 'checked' : '';                     
            
            return '<div id="'+note['id']+'" class="card-note">' +
            '<div class="'+isDoneClass+'"><input type="checkbox" '+checked+'></div>' +
            '<div class="content">' +
            '<h3 class="tittle">'+note['tittle']+'</h3>' +
            '<p class="detail">'+note['details']+'</p>' +
            '<p class="date">'+Util.getDateFormat(note['date_begin'])+'</p>' +
            '</div>' +
            '</div>';
        },

        makeForm: function() {
            return 'Tittle' +
            '<input id="tittle" type="text" placeholder="Tittle">' +
            'Description' +
            '<textarea id="details" cols="30" rows="10"></textarea>' +
            '<div class="date-container">' +
            'begin' +
            '<input id="date_begin" type="date">' +
            'end' +
            '<input id="date_end" type="date">' +
            '</div>';
        },

        makeFormdetails: function() {
            return '<div class="form-details">' +
                Util.View.makeForm() +
                
                '<div id="buttons_confirm_edit" class="container-button">' +
                    '<div class="center">' +
                        '<div id="btn_accept" class="img-accept"></div>' +
                        '<div id="btn_cancel" class="img-cancel"></div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        },

        makeFormNewNote: function() {
            return '<div class="form-new-note">' +
            Util.View.makeForm() +
            '<div id="buttons_confirm_edit" class="container-button">' +
                '<div class="center">' +
                    '<div id="btn_accept" class="img-accept"></div>' +                    
                '</div>' +
            '</div>' +
            '</div>';
        },

        makeModalBox: function(tittle, body) {
            return '<div id="myModal" class="modal">' +            
              '<!-- Modal content -->' +
              '<div class="modal-content">' +
                '<div class="modal-tittle">' +
                    '<h2>' + tittle + '</h2>' +
                    '<span class="close">&times;</span>' +
                '</div>' +
                '<div class="modal-body">' + body + '</div>' +                                                  
              '</div>' +            
            '</div>';
        },
    },
    // Object Events ------------------------------------------------------------------
    Events: {   
        onClickNewNote: function() {
            $('#btn_new_note').click(function() {
                Util.Events.displayModal();                
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
            $('.card-note .content').click(function() {
                //alert('tittle:'+ Util.getNoteById($(this).attr('id'))['tittle']);                
                var note = Util.getNoteById($(this).closest('.card-note').attr('id'));
                Util.View.updatePanelNoteDetails(note);

                Util.View.enable('#buttons-options-details');
                Util.View.enable('.form-details');
                Util.View.disabled('#buttons_confirm_edit');
            }); 
        },

        onClickCheckIsDone: function() { // .......................... TO DO
            $('.card-note').find('input').click(function() {
                // get element ID from class '.card-note'
                var cardNoteID = $(this).closest('.card-note').attr('id');                
                //console.log($(this).closest("div").attr("class"));
                var parentClassName = $(this).closest("div"); // get parent node
                // Remove current class and add [is-done-true | is-done-false]
                parentClassName.removeClass('is-done-'+!this.checked).addClass('is-done-'+this.checked);
                
                Util.AjaxOject.request({update_is_done: {id: cardNoteID, isDone: this.checked}}, 'json')
                .done(function(data, textStatus, jqXHR) {
                    //alert('Tarea actualizada a '+data);
                    Util.update(data);
                })
                .fail(function(jqXHR, textStatus, errorThrow) {
                    console.log("ERROR: "+ errorThrow);                              
                });
            });
        },

        displayModal: function() {
            $('#myModal').css('display', 'block') // Set display block
            .find('.close').click(function() { // When onClick close button
                $('#myModal').css('display', 'none');
                $(this).off("click"); // Remove onClick event 
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
        $('body').append(Util.View.makeModalBox(
            'Titulo modal',
            Util.View.makeFormNewNote()            
        ));
        //testing ................
        //this.AjaxOject.request({test: 'msg enviado desde el cliente'}, 'json');         
        Util.AjaxOject.request({updateList: 'msg enviado desde el cliente'}, 'json')
        .done(function(data, textStatus, jqXHR){
            Util.update(data);
        })
        .fail(function(jqXHR, textStatus, errorThrow) {
            console.log("ERROR: "+ errorThrow + ' - ' +textStatus);                              
        });         
    },

    /**
     * Update NoteListArray, Event and Views
     * @param {Oject} data
     */
    update: function(data) {        
        $(".panel-work-list-note").empty(); //Remove all child nodes
        Util.NoteListArray = data; // Save data in NoteListArray[]
        Util.View.updatePanelNoteList(Util.NoteListArray);
        Util.Events.onClickCardNote();
        Util.View.disabled('#buttons-options-details');
        $('.form-details').remove(); // Remove child element
        $('.panel-work-note-details').append(Util.View.makeFormdetails());                  
        Util.View.disabled('.form-details');  
        Util.Events.onClickEditNote();
        $('#info-notes').text(Util.getInfoNotes());
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

    getInfoNotes: function() {
        var arrayAux = Util.NoteListArray;
        var countDone = 0; // counter done notes
        for (var key in arrayAux) {
            if(arrayAux[key]['is_done']) { countDone++;}
        }

        return 'Done notes '+ countDone + '/' + Util.NoteListArray.length;
    },

    getDateFormat: function(date) {
        var d = new Date(date);
        return d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear();
    }
}