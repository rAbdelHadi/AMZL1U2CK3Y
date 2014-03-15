/*!
 * index.js
 * Date: 14 03 2014
 * Author : Rami Abdel Hadi
 * All the needed function for implementing index.html buttons
 */
function init() {
    $('#btnAdd').click(function () {
        addSentence();
    });

    $('#btnLucky').click(function () {
        checkLuckySentence();
    });

    $('#btnClear').click(function () {
        clear();
    });
}

function addSentence() {
    if ($.trim($('#txtSentence').val()) != '') {
        var dvSentence = document.createElement('div');
        dvSentence.innerHTML = $('#txtSentence').val();
        $('#dvData').append(dvSentence);
        $('#txtSentence').val('');
    }
}

function clear() {
    $("#dvData").empty();
}


function checkLuckySentence() {
    var arrSentence = [];
    $("#dvData").children("div").each(function () {
        arrSentence.push(this.innerHTML);
    });
    result = luckySentences.getLuckySentences(arrSentence);
    var alertMessage = 'No lucky sentences';
    for (index = 0; index < result.length; index++) {
        if (index == 0)
            alertMessage = "luckiest sentences";

        alertMessage += "\n" + result[index].sentence;
    }
    alert(alertMessage);
}
