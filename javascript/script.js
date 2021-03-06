
    $("#submit").on("click", function () {

        var url = [];
        url.push("https://api.nytimes.com/svc/search/v2/articlesearch.json?apikey=c2117551737444c0993461e828428e15");
        var search = ($("#search_box").val()).toLowerCase().replace(" ", "+");
        var startdate = ($("#startdate_box").val()).toLowerCase().replace(" ", "+");
        var enddate = ($("#enddate_box").val()).toLowerCase().replace(" ", "+");
        var resultNum = parseInt($("#sel1").val());

        if (startdate) {
            url.push(("&start_date=" + startdate));
        }
        if (enddate) {
            url.push(("&end_date=" + enddate));
        }
        if (search) {
            url.push(("&q=" + search));
        };

        full_url = url.join('')
        $.ajax({
            url: full_url,
            method: 'GET',
        }).done(function (result) {
            var data_div = [];
            for (var i = 0; i < resultNum; i++) {
                data_div.push("<h4>" + result.response.docs[i].snippet + "</h4>");
                data_div.push("<h5><a href='" + result.response.docs[i].web_url + "'>" + result.response.docs[i].web_url + "</h5></a>");
                if (result.response.docs[i].byline) {
                    data_div.push("<h6>" + result.response.docs[i].byline.original + "</h6>");
                };
                if (result.response.docs[i].pub_date) {
                    data_div.push("<h6>" + (result.response.docs[i].pub_date).substring(0,10) + "</h6>");
                };
                data_div.push("<br>")
                
                
            };
            $("#display_results").html(data_div.join(''));
        });
    });

    $("#clear_results").on("click", function () {
        $("#search_box").val('');
        $("#numberofResults_box").val('');
        $("#startdate_box").val('');
        $("#endtdate_box").val('');
        $("#enddate_box").val('');
        $("#display_results").empty();

    });
