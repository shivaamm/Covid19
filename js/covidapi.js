$(document).ready(function () {


    $.getJSON("https://api.covid19india.org/data.json", function (data) {


        let total_active = data.statewise[0].active;
        let total_confirmed = data.statewise[0].confirmed;
        let total_recovered = data.statewise[0].recovered;
        let total_deaths = data.statewise[0].deaths;
        let last_update = data.statewise[0].lastupdatedtime;

        console.log(data.statewise[0].lastupdatedtime);
        $("#confirmed").append(total_confirmed);
        $("#active").append(total_active);
        $("#recovered").append(total_recovered);
        $("#deaths").append(total_deaths);
        $("#lastupdate").append(last_update);
        // For state wise data


        let state = [];
        let active = [];
        let confirmed = [];
        let recovered = [];
        let deaths = [];


        $.each(data.statewise, function (id, obj) {
            state.push(obj.state)
            active.push(obj.active)
            confirmed.push(obj.confirmed)
            recovered.push(obj.recovered)
            deaths.push(obj.deaths)
        })


        // to remove total casese in an array

        state.shift()
        active.shift()
        confirmed.shift()
        recovered.shift()
        deaths.shift()

        // console.log(state)

        var barchart = document.getElementById("barchart").getContext('2d');

        var chartview = new Chart(barchart, {
            type: 'bar',
            data: {
                labels: state,
                datasets: [{
                        label: "Confirmed Case",
                        data: confirmed,
                        backgroundColor: "orange",
                        // minBarLength: 100,
                    },
                    {
                        label: "Active Case",
                        data: active,
                        backgroundColor: "steelblue",
                        // minBarLength: 100,
                    },
                    {
                        label: "Recovered Case",
                        data: recovered,
                        backgroundColor: "#yellowgreen",
                        // minBarLength: 100,
                    },
                    {
                        label: "Death Case",
                        data: deaths,
                        backgroundColor: "orangered",
                        // minBarLength: 100,
                    }

                ]
            },
            options: {}
        });

        var linechart = document.getElementById("linechart").getContext('2d');

        var chartview2 = new Chart(linechart, {
            type: 'line',
            data: {
                labels: state,
                datasets: [{
                        label: "Confirmed Case",
                        data: confirmed,
                        backgroundColor: "orange",
                    },
                    {
                        label: "Active Case",
                        data: active,
                        backgroundColor: "steelblue",
                    },
                    {
                        label: "Recovered Case",
                        data: recovered,
                        backgroundColor: "#yellowgreen",
                    },
                    {
                        label: "Death Case",
                        data: deaths,
                        backgroundColor: "orangered",
                    }

                ]
            },
            options: {}
        });


    });


    // Cvoid 19 Summery world

    $.getJSON("https://api.covid19api.com/summary", function (data) {

        // console.table(data.Countries);
        // console.log(data.Countries.Country)

        let g_total_confirmed = data.Global.TotalConfirmed;
        let g_total_recovered = data.Global.TotalRecovered;
        let g_total_deaths = data.Global.TotalDeaths;


        $("#g-confirmed").append(g_total_confirmed);
        $("#g-recovered").append(g_total_recovered);
        $("#g-deaths").append(g_total_deaths);

        let tblv = document.getElementById('tblv');

        for (let i = 1; i < (data['Countries'].length); i++) {
            let a = tblv.insertRow();
            a.insertCell(0);
            tblv.rows[i].cells[0].innerHTML = data['Countries'][i - 1]['Country'];
            tblv.rows[i].cells[0].style.fontWeight = "700";

            a.insertCell(1);
            tblv.rows[i].cells[1].innerHTML = data['Countries'][i - 1]['TotalConfirmed'];
            tblv.rows[i].cells[1].style.fontWeight = "700";
            tblv.rows[i].cells[1].style.color = "steelblue";


            a.insertCell(2);
            tblv.rows[i].cells[2].innerHTML = data['Countries'][i - 1]['TotalRecovered'];
            tblv.rows[i].cells[2].style.fontWeight = "700";
            tblv.rows[i].cells[2].style.color = "yellowgreen";

            a.insertCell(3);
            tblv.rows[i].cells[3].innerHTML = data['Countries'][i - 1]['TotalDeaths'];
            tblv.rows[i].cells[3].style.fontWeight = "700";
            tblv.rows[i].cells[3].style.color = "orangered";


        }

    });


});