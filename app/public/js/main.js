// Main JS File

var Util = {
    NoteListArray: [],
    // Object View ------------------------------------------------------------------
    View: {
        /**
         * @param {string} element
         */
        disabled: function(element) {
            return $(element).css("display", "none");            
        },

        /**
         * @param {string} element
         */
        enable: function(element) {
            return $(element).css("display", "block");            
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
            '<p class="date">'+Util.getDateLocalFormat(note['date_begin'])+'</p>' +
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
                '<input type="hidden" id="id" value="">' +
                Util.View.makeForm() +
                
                '<div id="buttons_confirm_edit" class="container-button">' +
                    '<div class="center">' +
                        '<div id="btn_accept_update_note" class="img-accept"></div>' +
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
                    '<div id="btn_accept_new_note" class="img-accept"></div>' +                    
                '</div>' +
            '</div>' +
            '</div>';
        },

        makeModalBox: function() {
            return '<div id="myModal" class="modal">' +            
              '<!-- Modal content -->' +
              '<div class="modal-content">' +
                '<div class="modal-tittle">' +
                    '<h2></h2>' +
                    '<span class="close">&times;</span>' +
                '</div>' +
                '<div class="modal-body"></div>' +                                                  
              '</div>' +            
            '</div>';
        },
        /**
         * @param {string} tittle 
         */
        setModalTitle: function(tittle) {
            tittle = (tittle == undefined) ? '' : tittle;
            $('.modal-tittle h2').text(tittle);
        },
        /**
         * @param {string} content
         */
        setModalContent: function(content) {
            content = (content == undefined) ? '' : content;
            $('.modal-body').empty().append(content);
        },

        /**
         * @param {string} text
         * @param {string} classNameAlert
         */
        boxAlert: function(text, classNameAlert) {
            var alertNode = '#alert';
            var textNodeId = '#alert-text';

            // Remove current classes and add new class
            Util.View.enable(alertNode).removeClass(function() {               
                return $(this).attr('class');
            }).addClass(classNameAlert) 
            .find(textNodeId).text(text);
            $(alertNode).find('.closebtn').click(function() {
                Util.View.disabled(alertNode).removeClass(classNameAlert);
            });            
        },

        /**
         * @param {string} parentNode
         * @returns {object} return id: values from all input and textarea inside a node
         */
        getInputValues: function(parentNode) {
            var valuesById = {};
            // get all input
            $(parentNode).find('input').each(function() {                                
                valuesById[$(this).attr('id')] = $(this).val();
                
            });

            // get all textarea
            $(parentNode).find('textarea').each(function() {                
                valuesById[$(this).attr('id')] = $(this).val();
            });

            return valuesById;
        }
    },
    // Object Events ------------------------------------------------------------------
    Events: {   
        onClickNewNote: function() {
            $('#btn_new_note').click(function() {
                Util.View.setModalTitle('New work note'); // Set tittle
                Util.View.setModalContent(Util.View.makeFormNewNote()); 
                $('.form-new-note').find('#date_begin').val(Util.getDate());  // Set current date 
                Util.Events.onClickSaveNewNote();           
                Util.Events.displayModal();                
            });
        },

        onClickDeleteNote: function() {
            return $('#btn_delete_note').off().click(function() {
                // Display a confirmation box, and saved in 'answer' what the user clicked
                var answer = confirm('Are you sure to delete it?');

                if(answer){
                    var id = $('.form-details').find('#id').val();
                    Util.AjaxOject.request({deleteById: id}, 'json')
                    .done(function(data, textStatus, jqXHR) {
                        Util.update(data);
                        Util.View.boxAlert('Delete note!', 'alert-success');
                    })
                    .fail(function(jqXHR, textStatus, errorThrow) {
                        // TODO
                    });
                    
                } else {
                    Util.View.boxAlert('Caceled!', 'alert-info');
                }
                
            });
        },

        onClickDeleteAllDone: function() {
            $('#btn_delete_all_done').click(function() {
                var answer = confirm('Are you sure you want to clean the list?');

                if(answer) {
                    Util.AjaxOject.request('deleteAllDone', 'json')
                    .done(function(data, textStatus, jqXHR) {
                        Util.update(data);
                        Util.View.boxAlert('Clean notes done!', 'alert-success');
                    })
                    .fail(function(jqXHR, textStatus, errorThrow) {
                        // TODO
                    });

                } else {
                    Util.View.boxAlert('Caceled!', 'alert-info');
                }
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
                // To test alert
                Util.View.boxAlert('Edit canceled!', 'alert-info');
            });
        },

        onClickCardNote: function() {
            $('.card-note .content').click(function() {
                //alert('tittle:'+ Util.getNoteById($(this).attr('id'))['tittle']);                
                var note = Util.getNoteById($(this).closest('.card-note').attr('id'));
                Util.View.updatePanelNoteDetails(note);
                Util.Events.onClickDeleteNote();

                Util.View.enable('#buttons-options-details');
                Util.View.enable('.form-details');
                Util.View.disabled('#buttons_confirm_edit');
            }); 
        },

        onClickCheckIsDone: function() {
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

        onClickSaveNewNote: function() {
            $('#btn_accept_new_note').click(function() {                
                
                Util.AjaxOject.request(
                    {'saveNewNote' : Util.View.getInputValues('.form-new-note')}, 'json'
                ).done(function(data, textStatus, jqXHR) {                     
                    $(this).off('click');                   
                    Util.update(data);                   

                    // alert success
                    Util.View.boxAlert('saved successful!', 'alert-success');
                })
                .fail(function(jqXHR, textStatus, errorThrow) {
                    console.log("ERROR: "+ errorThrow);
                    Util.View.boxAlert('Error! '+errorThrow, 'alert-danger');
                });
                
                Util.View.disabled('#myModal');
            });
        },

        displayModal: function() {
            Util.View.enable('#myModal') // Set display block
            .find('.close').click(function() { // When onClick close button
                Util.View.disabled('#myModal');
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
        Util.Events.onClickDeleteAllDone();
        $('body').append(Util.View.makeModalBox());
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

    getDate: function(date) { // TO DO
        var d = (date instanceof Date) ? date : new Date();    
        var day = (d.getDate().toString().length == 1) ? "0" + d.getDate() : d.getDate();
        var month = ((d.getMonth()+1).toString.length == 1) ? "0" + (d.getMonth()+1) : (d.getMonth()+1);  
        return d.getFullYear() + '-' + month + '-' + day;
    },

    getDateLocalFormat: function(date) { // TO DO
        var d = new Date(date);
        return d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear();
    }
}