$( document ).ready(function() {

    $('#aggiungi').click(function(){
        $('.lista').empty();
        var inputUtente = $('#user').val();
        aggiungiInput(inputUtente);
        richiama();
    });

    $(document).keydown(function(e) {
       if (e.keycode == 13 || e.which == 13) {
           // $('.lista').empty();
           var inputUtente = $('#user').val();
           aggiungiInput(inputUtente);
           richiama();
       }
   });

   $(document).on('click', '#elimina', function(){
       $('.lista').empty();
       var x = $(this).parent().attr('data-id');
       elimina(x);
       richiama();
   });

   $(document).on('click', '.voce-lista', function(){
       // $('.testo').removeClass('hide');
       // $('.testo').next().addClass('hide');

       var inputModify = $(this).find('.modify');
       var testoVoce = $(this).find('.testo');

       inputModify.removeClass('hide');
       testoVoce.addClass('hide');

   });

    $(document).on('keydown', '#id-input', function(){
        var idNewElement = $(this).parent().attr('data-id');
        if (event.which == 13 || event.keyCode == 13) {
            console.log(idNewElement);
            var newElement = $(this).val();
            modifica(idNewElement, newElement);
        }
    });

});

//******FUNZIONI
function richiama(data) {
    $.ajax(
        {
            url: 'http://157.230.17.132:3032/todos',
            method: 'GET',
            success: function(data) {
                var source = $("#entry-template").html();
                var template = Handlebars.compile(source);

                for (var i = 0; i < data.length; i++) {
                    var context = {
                        text: data[i].text,
                        id: data[i].id
                    }
                    //console.log(context);
                    var html = template(context);
                    $('.lista').append(html);
                }
            },
            error: function() {
                alert('Errore!');
            }
        }
    )
}

function aggiungiInput(val) {
    $.ajax(
        {
            url: 'http://157.230.17.132:3032/todos',
            method:'POST',
            data: {
                text: val
            },
            success: function() {
                $('.lista').html();
            },
            error: function(){
                alert('Errore');
            }
        }
    )
}

function elimina(id) {
    $.ajax(
        {
            url: 'http://157.230.17.132:3032/todos' + '/' + id,
            method:'DELETE',
            success: function(risposta) {
                $('.lista').html(' ');
                richiama();
            },
            error: function(){
                alert('Errore');
            }
        }
    )
}

function modifica(id, elemento) {
    $.ajax(
        {
            url: 'http://157.230.17.132:3032/todos' + '/' + id,
            method: 'PUT',
            data: {
                text: elemento
            },
            success: function(data) {
                    $('.lista').empty();
                    richiama();
                },
            error: function(){
                alert('Errore');
            }
        }
    )
}
