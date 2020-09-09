$( document ).ready(function() {
    $('#aggiungi').click(function(){
        $('.lista').empty();
        var inputUtente = $('input').val();
        aggiungiInput(inputUtente);
        richiama();
    });

    $(document).keydown(function(e) {
       if (e.keycode == 13 || e.which == 13) {
           $('.lista').empty();
           var inputUtente = $('input').val();
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
                console.log();
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
            url: 'http://157.230.17.132:3032/todos' + id,
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
