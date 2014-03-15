/*!
 * Lucky Sentences
 * Date: 14 03 2014 
 */
luckySentences =
{
    /*
    arrSortedSentence : sorted sentence array depends on 
    */
    arrSortedSentence: [],
    /* parameter:
    * sentences {array} : array of string
    * Returns:
    * array of the string for 2 "luckiest" sentences
    */
    getLuckySentences: function (sentences) {
        luckySentences.arrSortedSentence = [];
        result = [];
        for (var i = 0; i < sentences.length; i++) {
            var luckyWordsCount = luckySentences.getLuckyWordsCount(sentences[i]);//get the count for lucky words in the sentence
            if (luckyWordsCount > 0) {//No need to add sentences which has 0 lucky words
                var index = luckySentences.getbinaryIndex(luckyWordsCount); //return the correct index to put the new element in it
                luckySentences.arrSortedSentence.splice(index, 0, { sentence: sentences[i], luckyWordsCount: luckyWordsCount });//push the sentence at specfic index in the sorted array.
            }
        }

        if (luckySentences.arrSortedSentence.length - 1 >= 0) {
            result.push(luckySentences.arrSortedSentence[luckySentences.arrSortedSentence.length - 1]);
            if (luckySentences.arrSortedSentence.length - 2 >= 0)
                result.push(luckySentences.arrSortedSentence[luckySentences.arrSortedSentence.length - 2]);
        }

        return result;
    }
    /* parameter:
    * sentence string
    * Returns:
    * count for lucky words in the sentence
    */
    , getLuckyWordsCount: function (sentence) {
        var luckyWordsCount = 0, luckyCharactersCount = 0;
        for (var j = 0; j < sentence.length; j++) {
            var ascii = sentence.charCodeAt(j);
            if (ascii != 32) {//I made an assumption that each words in the sentence splited by space
                if (ascii % 2 && ascii >= 97 && ascii < 122) {
                    luckyCharactersCount++;
                    if (luckyCharactersCount == 4) {
                        luckyWordsCount++;
                        luckyCharactersCount = 0;
                        j = sentence.indexOf(" ", j); //to skip the rest characters in the word because it's considered lucky
                        if (j == -1)
                            break;
                    }
                }
            } else {
                luckyCharactersCount = 0;
            }
        }
        return luckyWordsCount;
    }
    ,
    /* parameter:
    * luckyWordsCount
    * Returns:
    * index where this sentence should be places in  arrSortedSentence array 
    */
    getbinaryIndex: function (luckyWordsCount) {//Binary sort depends on binary search algorithm
        var low = 0, high = luckySentences.arrSortedSentence.length - 1,
        i = 0;
        while (low <= high) {
            i = Math.floor((low + high) / 2);
            if (luckySentences.arrSortedSentence[i].luckyWordsCount < luckyWordsCount) { low = i + 1; continue; };
            if (luckySentences.arrSortedSentence[i].luckyWordsCount > luckyWordsCount) { high = i - 1; continue; };
            return i;
        }
        return low;
    }
}




