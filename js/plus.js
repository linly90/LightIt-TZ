
function plusMinus() {



    document.querySelector('#accordion').addEventListener('click', function(event){
                        var target =  $(event.target).closest('.panel-title > div');



                        if (target.hasClass('collapsed')){

                            target.find('.plus-minus').html(`<i class="fa fa-minus-circle" aria-hidden="true"></i>`);

                            var plusMinusNext = $(event.target).closest('.panel-default').nextAll('div');
                            var plusMinusPrev = $(event.target).closest('.panel-default').prevAll('div');

                            for(var i=0; i< plusMinusNext.length; i++){
                                if(plusMinusNext.eq([i]).find('#collap').hasClass('')){
                                    plusMinusNext.eq([i]).find('.plus-minus').html(`<i class="fa fa-plus-circle" aria-hidden="true"></i>`);


                                }
                            }
                            for(var j=0; j < plusMinusPrev.length; j++){
                                if(plusMinusPrev.eq([j]).find('#collap').hasClass('')){
                                    plusMinusPrev.eq([j]).find('.plus-minus').html(`<i class="fa fa-plus-circle" aria-hidden="true"></i>`);

                                }




                            }
                        }

                        else if(target.hasClass('') ){
                            target.find('.plus-minus').html(`<i class="fa fa-plus-circle" aria-hidden="true"></i>`);
                        }


        })
    }


setTimeout(plusMinus, 1000);











function colorRows(){
    var rows = document.querySelectorAll('.data-min');
    var rowsFull = document.querySelectorAll('.data-full');

             for(let i=0; i<rows.length-1; i++){

                if(i%2 == 0){
                    rows[i].style.backgroundColor = '#f5e5bc';
                    rowsFull[i].style.backgroundColor = '#f5e5bc';

                }


            }





}




setTimeout(colorRows, 600);





function search (){
    var search= $('input').eq(0);
    $('#butn').on('click', function () {

        var value = search.val().toLowerCase()


        if(value !== '') {
            $('.data-min').css({border: 'none', fontWeight:  'normal'});
            $(".user_first p:contains(" + value +")").closest('.data-min').css({border: '5px solid #66976B', fontWeight:  '700'})

        }

    });

    search.on('keyup',function (e) {
        if(e.keyCode ==8){
            $(".user_first p:contains(" + search.val() +")").closest('.data-min').css({border: 'none', fontWeight:  'normal'});
        }

    })
}

setTimeout(search, 500)




