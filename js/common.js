var countOfUsers = 16;
var createUsers = function (genderMen,genderWomen ) {


    $.ajax({
        type: 'GET',
        url: 'https://randomuser.me/api/?results=16&inc=name,gender,dob,location,registered,email,cell,picture,phone,login&nat=br&noinfo',

        success: function(dat){

            var data = dat.results;

            genderMen=[];
            genderWomen=[];



                    var content = document.querySelector('#accordion')

                    for (var i = 0 ; i< countOfUsers ; i++){

                        var newUser = document.createElement('div');
                        newUser.setAttribute('class', "panel panel-default");




                        var gender = data[i].gender;
                        var imgGender;




                            if ( gender == 'female'){
                                imgGender = `<i class="fa fa-female" aria-hidden="true"></i>`;
                                genderWomen.push(gender)
                            }
                            else {
                                imgGender = `<i class="fa fa-male" aria-hidden="true"></i>`;
                                genderMen.push(gender)
                            }


                        newUser.innerHTML = ` <div class="panel-heading">
            <div class="panel-title" >
                <div data-toggle="collapse" data-parent="#accordion" href="#collapse${i}" class='collapsed' id='collap'>
                    <div class="data-min">

                        
                            <div class="row">
                                <div class="col-md-1 col-sm-2 col-xs-2">
                                    <div class="user_img">
                                        <img src="${data[i].picture.medium}" alt="">
                                    </div>
                                </div>
                                <div class="col-md-2 col-sm-4 col-xs-4">
                                    <div class="user_first">
                                        <p>${data[i].name.first}</p>
                                    </div>
                                </div>

                                <div class="col-md-2 hidden-sm hidden-xs">
                                    <div class="user_last">
                                        <p>${data[i].name.last}</p>
                                    </div>
                                </div>

                                <div class="col-md-2 col-sm-4 col-xs-4">
                                    <div class="user_username">
                                        <p>${data[i].login.username}</p>
                                    </div>
                                </div>

                                <div class="col-md-2 hidden-sm hidden-xs">
                                    <div class="user_phone">
                                        <p>${data[i].phone}</p>
                                    </div>
                                </div>

                                <div class="col-md-2 hidden-sm hidden-xs">
                                    <div class="user_location">
                                        <p>${data[i].location.state}</p>
                                    </div>
                                </div>
                                <div class="col-md-1 col-sm-2 col-xs-2">
                                    <div class="plus-minus"><i class="fa fa-plus-circle" aria-hidden="true"></i></div>
                                </div>
                            </div>
                       
                    </div>

                </div>
            </div>
        </div>
        <div id="collapse${i}" class="panel-collapse collapse">

            <div class="panel-body">
                <div class="data-full">
                   
                        <div class="row">

                            <div class="col-sm-9 col-xs-8">
                                <div class="data_item">
                                   <h3>${data[i].name.first} <span>${imgGender}</span></h3>
                                    <div class="data_item_column">
                                            <div>
                                                <p>Username: <span>${data[i].login.username}</span></p>
                                                <p>Registered: <span>${data[i].registered.slice(0, 11)}</span></p>
                                                <p>Email: <span>${data[i].email}</span></p>
                                            </div>

                                            <div>
                                                <p>Address: <span>${data[i].location.street}</span></p>
                                                <p>City: <span>${data[i].location.city}</span></p>
                                                <p>Zip Code: <span>${data[i].location.postcode}</span></p>
                                            </div>

                                            <div>
                                                <p>Birthday: <span>${data[i].dob.slice(0, 11)}</span></p>
                                                <p>Phone: <span>${data[i].phone}</span></p>
                                                <p>Cell: <span>${data[i].cell}</span></p>
                                            </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3 col-xs-4">
                                <div class="data_item_img">
                                    <img src="${data[i].picture.large}" alt="">
                                </div>
                            </div>
                        
                    </div>
               
            </div>
        </div>`;
                        content.appendChild(newUser);

                    }












            function dashboard(id, fData){

                function segColor(c){ return {men:"#f5e5bc", women:"#ceb4a1"}[c]; }




                function histoGram(fD){
                    var hG={},    hGDim = {t: 60, r: 0, b: 30, l: 0};
                    hGDim.w = 500 - hGDim.l - hGDim.r,
                        hGDim.h = 300 - hGDim.t - hGDim.b;

                }

                // function to handle pieChart.
                function pieChart(pD){
                    var pC ={},    pieDim ={w:250, h: 250};
                    pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;

                    // create svg for pie chart.
                    var piesvg = d3.select(id).append("svg")
                        .attr("width", pieDim.w).attr("height", pieDim.h).append("g")
                        .attr("transform", "translate("+pieDim.w/2+","+pieDim.h/2+")");

                    // create function to draw the arcs of the pie slices.
                    var arc = d3.svg.arc().outerRadius(pieDim.r - 10).innerRadius(0);

                    // create a function to compute the pie slice angles.
                    var pie = d3.layout.pie().sort(null).value(function(d) { return d.freq; });

                    // Draw the pie slices.
                    piesvg.selectAll("path").data(pie(pD)).enter().append("path").attr("d", arc)
                        .each(function(d) { this._current = d; })
                        .style("fill", function(d) { return segColor(d.data.type); })


                    // create function to update pie-chart. This will be used by histogram.
                    pC.update = function(nD){
                        piesvg.selectAll("path").data(pie(nD)).transition().duration(500)
                            .attrTween("d", arcTween);
                    }




                }

                // function to handle legend.
                function legend(lD){
                    var leg = {};


                    var legend = d3.select(id).append("table").attr('class','legend');


                    var tr = legend.append("tbody").selectAll("tr").data(lD).enter().append("tr");


                    tr.append("td").append("svg").attr("width", '16').attr("height", '16').append("rect")
                        .attr("width", '16').attr("height", '16')
                        .attr("fill",function(d){ return segColor(d.type); });


                    tr.append("td").text(function(d){ return d.type;});

                    // create the third column for each segment.
                    tr.append("td").attr("class",'legendFreq')
                        .text(function(d){ return d3.format(",")(d.freq);});

                    // create the fourth column for each segment.
                    tr.append("td").attr("class",'legendPerc')
                        .text(function(d){ return getLegend(d,lD);});

                    // Utility function to be used to update the legend.
                    leg.update = function(nD){
                        // update the data attached to the row elements.
                        var l = legend.select("tbody").selectAll("tr").data(nD);

                        // update the frequencies.
                        l.select(".legendFreq").text(function(d){ return d3.format(",")(d.freq);});

                        // update the percentage column.
                        l.select(".legendPerc").text(function(d){ return getLegend(d,nD);});
                    }

                    function getLegend(d,aD){ // Utility function to compute percentage.
                        return d3.format("%")(d.freq/d3.sum(aD.map(function(v){ return v.freq; })));
                    }

                    return leg;
                }

                // calculate total frequency by segment for all state.
                var tF = ['men','women'].map(function(d){
                    return {type:d, freq: d3.sum(fData.map(function(t){ return t.freq[d];}))};
                });

                // calculate total frequency by state for all segment.
                var sF = fData.map(function(d){return [d.State,d.total];});

                var hG = histoGram(sF), // create the histogram.
                    pC = pieChart(tF), // create the pie-chart.
                    leg= legend(tF);  // create the legend.
            }
            var freqData=[
                {freq:{men:genderMen.length, women:genderWomen.length}}

            ];

            dashboard('#dashboard',freqData);



        }
    });

}

createUsers()























