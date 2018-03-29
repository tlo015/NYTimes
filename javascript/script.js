
    $("#submit").on("click", function () {
        var url = [];
        url.push("https://api.nytimes.com/svc/search/v2/articlesearch.json?apikey=c2117551737444c0993461e828428e15");
        var search = ($("#search_box").val()).toLowerCase().replace(" ", "+");
        var startdate = ($("#startdate_box").val()).toLowerCase().replace(" ", "+");
        var enddate = ($("#enddate_box").val()).toLowerCase().replace(" ", "+");
        //gave input field the id of "numberofResults_box"
        var resultNum = parseInt($("#numberofResults_box").val(), 10);
        if (resultNum > 10) {
            resultNum = 10;
        }
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
        console.log(full_url);
        console.log(resultNum);
        $.ajax({
            url: full_url,
            method: 'GET',
        }).done(function (result) {
            var data_div = [];
            for (let i = 0; i < resultNum; i++) {
                data_div.push("<h4>" + result.response.docs[i].snippet + "</h4>");
                data_div.push("<h5><a href='" + result.response.docs[i].web_url + "'>" + result.response.docs[i].web_url + "</h5></a>");
                data_div.push("<h6>Source: " + result.response.docs[i].source + "</h6>");
                data_div.push("<h6>" + result.response.docs[i].pub_date + "</h6><br>");
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

