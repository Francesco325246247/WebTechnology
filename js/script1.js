/**
 * Created by Gebruiker on 24/01/2017.
 */
$(document).ready(function () {
    var url1;
    $.getJSON('https://openws.herokuapp.com/my_test_collection?apiKey=c8b5090ff27272833ba5c709566f80ef',
        function (json) {

            console.log(json);

            var tr;


            for (var i = json.length - 1; i > 0; i--) {
                tr = $('<tr/>');
                tr.append("<div class='weekNumb'><h1>Week number: " + json[i].weekNumb + "</h1></div>");
                tr.append("<div class='questionNumb'><h2>Question number: " + json[i].questionNumb + "</h2></div>");
                tr.append("<div class='text'><p>" + json[i].text + "</p></div>");

                if (json[i].picture != "") {
                    tr.append("<div class='picture'><img src=" + json[i].picture + "></div>");
                }
                tr.append("<div><pre>ID Post: " + json[i]._id + "</pre></div>");
                tr.append("<hr>");
                $('#table').append(tr);


            }
            console.log(url1);


        });


    $('form').submit(function (event) {

        event.preventDefault();
        var idPost = $('#deleteThisPost').val();
        var postToDelete = "https://openws.herokuapp.com/my_test_collection/" + idPost + "?apiKey=c8b5090ff27272833ba5c709566f80ef";

        var data = {
            "questionNumb": $('#questionNumb').val(),
            "text": $('#text').val(),
            "weekNumb": $('#weekNumb').val(),
            "picture": $('#picture').val()

        };


        if ($('#questionNumb').val() != '' && $('#text').val() != '' && $('#idNumb').val() != '' && $('#weekNumb').val() != '') {
            $.post("https://openws.herokuapp.com/my_test_collection?apiKey=c8b5090ff27272833ba5c709566f80ef", data)
                .done(function (data) {
                    console.log(data);
                    window.alert("Posted Successfully");
                    window.location.reload(1);

                });
        } else {
            // window.alert('field empty');

            console.log(idPost);
            console.log(postToDelete);

            $.ajax({
                url: postToDelete,
                type: 'DELETE',
                success: function () {
                    window.alert("Deleted Successfully");
                     window.location.reload(1);
                }
            });
        }


    });
    tinymce.init({
        selector: '#text'
    });
});

