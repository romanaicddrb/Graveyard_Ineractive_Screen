$(document).ready(function(){
    var gidValue = '2';
    $('#myDataTable').DataTable().clear().destroy();
    var myDataTable = $('#myDataTable').DataTable({
        language: {
            "emptyTable": "<img src='../resource/image/nodata.png' style='position: fixed; z-index: 0; margin-left: 60%;'>",
            "lengthMenu": "Show _MENU_ entries",
            "info": "Showing _START_ to _END_ of _TOTAL_ entries",
            "infoEmpty": "Showing 0 to 0 of 0 entries",
            "search": "Search:",
            "pageLength": 50,
            "paginate": {

                "first": "First",
                "last": "Last",
                "next": "Next",
                "previous": "Previous"
            }
        },
        "responsive": true,
//        "lengthChange": false,
        "autoWidth": true,
        "paging": true,
        "scrollCollapse": true,
        "scrollX": true,
        "scrollY": 685,
        "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>',

        "fixedHeader": true,
        "select": true,
        "processing": true,
        "destroy": true,
        "orderable": true,
        "dom": 'Bfrtip',

        columns: [
            { data: 'dec_id', visible: false, width: '0%'},
            { data: 'graveyard_id' , visible: false, width: '0%' },
            { data: 'memo_no', width: '100px' },
            { data: 'dod', width: '140px', },
            { data: 'dec_name' },
            { data: 'father', },
            { data: 'bur_date', width: '160px', },

            { data: 'address' , visible: false, width: '0%' },
            { data: null,
                render: function (data, type, row) {
                    if (data && data.dec_id && data.graveyard_id) {
                      return '<div class="mr-3" style="margin-left: -5%; font-size: 5px; display: flex; align-items: center;"><button type="button" class="btn btn-block btn-sm"> বিস্তারিত দেখুন </button></div>';
                    }
                    else {
                      // If data is not available, return an empty string
                      return '';
                    }
                }, width: '140px'
            }
        ],
        "columnDefs": [{
                "targets": [4, 5], // Column indexes (0-based) where transformation should be applied
                "render":
                    function (data, type, row) {
                    // Apply text-transform: uppercase to the rendered content
                        return type === 'display' && data !== null ? data.toUpperCase() : data;
                    }
                },{
                    targets: [3, 6], // Assuming the 'Date' column is at index 0
                    render: function(data, type, row, meta) {
                        // Format the date as 'DD-MM-YYYY' manually
                        if (type === 'display' && data) {
                            var date = new Date(data);
                            var day = date.getDate().toString().padStart(2, '0');
                            var month = (date.getMonth() + 1).toString().padStart(2, '0');
                            var year = date.getFullYear();
                            return day + '-' + month + '-' + year;
                        }
                        return data;
                    }
                }
                //            {
                //            "targets": [3, 6],
                //            "type": "datetime", render: $.fn.dataTable.render.moment( 'DD-MM-YYYY' )
                //            }
        ],
    });

    function loadDetailsPage(dec_id, graveyard_id) {
       window.location.href = '/graveDetails_withPosition?id=' + dec_id + '&gid=' + graveyard_id;
    }

    $('#searchBtn').on('click', function() {
//        myDataTable.clear().draw();
//        setTimeout(function(){
        var memoFilter = $('#MemoFilter').val();
        var deadNameFilter = $('#DeadnameFilter').val();
        var deadDayFilter = $('#DeaddayFilter').val();
        var deadMonthFilter = $('#DeadmonthFilter').val();
        var deadYearFilter = $('#DeadyearFilter').val();
        var buriedDayFilter = $('#BurieddayFilter').val();
        var buriedMonthFilter = $('#BuriedmonthFilter').val();
        var buriedYearFilter = $('#BuriedyearFilter').val();

        if(memoFilter!="" || deadNameFilter!="" || deadDayFilter!="" || deadMonthFilter!="" ||
        deadYearFilter!="" || buriedDayFilter!="" || buriedMonthFilter!="" || buriedYearFilter!=""){
            $('#filterFieldEmpty').text("");
            // Prepare the request data
            var requestData = {
                graveyardId: '2',
                memo: memoFilter,
                name: deadNameFilter,
                dod_day: deadDayFilter,
                dod_month: deadMonthFilter,
                dod_year: deadYearFilter,
                bur_day: buriedDayFilter,
                bur_month: buriedMonthFilter,
                bur_year: buriedYearFilter
            };

            $.ajax({
                url: '/api/search',
                method: 'POST',
                destroy : true,
                contentType: 'application/json',
                data: JSON.stringify(requestData),
                success: function(data) {
                    myDataTable.clear();
                    if (data.data.length > 0) {
                        myDataTable.rows.add(data.data).draw();
                        myDataTable.page.len( 25 ).draw();
                        $('.btn').on('click', function() {
                          var rowData = myDataTable.row($(this).parents('tr')).data();
                          loadDetailsPage(rowData.dec_id,rowData.graveyard_id);
                        });
                    } else {
                        myDataTable.clear().draw();
                        //myDataTable.rows.add( "" ).draw();
                    }
                },
                error: function(error) {
                    console.error('Error performing search:', error);
                }
            });
        } else {
            $('#filterFieldEmpty').text("Please fill at-least one filter field");
        }
//        }, 2000);
    });
});

const monthDropDown = document.getElementById("BuriedmonthFilter");
const monthDropDownDead = document.getElementById("DeadmonthFilter");
const monthData = {
//"জানুয়ারি": "01","ফেব্রুয়ারি": "02","মার্চ": "03", "এপ্রিল": "04", "মে": "05", "জুন": "06",
//"জুলাই": "07", "আগস্ট": "08", "সেপ্টেম্বর": "09", "অক্টোবর": "10", "নভেম্বর": "11", "ডিসেম্বর": "12"
    "January": "01",
    "February": "02",
    "March": "03",
    "April": "04",
    "May": "05",
    "June": "06",
    "July": "07",
    "August": "08",
    "September": "09",
    "October": "10",
    "November": "11",
    "December": "12"
}

for (let key in monthData) {
    let option = document.createElement("option");
    option.setAttribute('value', monthData[key]);
    let optionText = document.createTextNode(key);
    option.appendChild(optionText);
    monthDropDown.appendChild(option);
}

for (let key in monthData) {
    let option = document.createElement("option");
    option.setAttribute('value', monthData[key]);
    let optionText = document.createTextNode(key);
    option.appendChild(optionText);
    monthDropDownDead.appendChild(option);
}

const dayDropDown = document.getElementById("BurieddayFilter");
const dayDropDownDead = document.getElementById("DeaddayFilter");
for (let i=1; i<31; i++) {
    if(i<10){
      i = "0" + i;
    }
    let option = document.createElement("option");
    option.setAttribute('value', i);
    let optionText = document.createTextNode(i);
    option.appendChild(optionText);
    dayDropDown.appendChild(option);
}

for (let i=1; i<31; i++) {
    if(i<10){
      i = "0" + i;
    }
    let option = document.createElement("option");
    option.setAttribute('value', i);
    let optionText = document.createTextNode(i);
    option.appendChild(optionText);
    dayDropDownDead.appendChild(option);
}

const yearDropDown = document.getElementById("BuriedyearFilter");
const yearDropDownDead = document.getElementById("DeadyearFilter");
for (let i=1974; i<2024; i++) {
    let option = document.createElement("option");
    option.setAttribute('value', i);
    let optionText = document.createTextNode(i);
    option.appendChild(optionText);
    yearDropDown.appendChild(option);
}

for (let i=1974; i<2024; i++) {
    let option = document.createElement("option");
    option.setAttribute('value', i);
    let optionText = document.createTextNode(i);
    option.appendChild(optionText);
    yearDropDownDead.appendChild(option);
}