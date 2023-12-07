$(document).ready(function(){
      if (data && data.length > 0) {
          $('#myDataTable').DataTable().clear().destroy();
          var tableData = [];
          data.forEach(obj => {
              tableData.push({
                  "dec_id": obj.dec_id,
                  "graveyard_id": obj.graveyard_id,
                  "memo_no": memo_no,
                  "dod'": obj.dod,
                  "dec_name": obj.dec_name,
                  "father": obj.father,
                  "bur_date": obj.bur_date,
                  "address": obj.address,
                  "actionBtn": addRowButton(obj)
              });
          });

          $('#myDataTable').dataTable({
            language: {
                "emptyTable": "No data available in table",
                "lengthMenu": "Show _MENU_ entries",
                "info": "Showing _START_-1 to _END_ of _TOTAL_ entries",
                "infoEmpty": "Showing 0 to 0 of 0 entries",
                "search": "Search:",
                "paginate": {
                    "first": "First",
                    "last": "Last",
                    "next": "Next",
                    "previous": "Previous"
                }
               },

            "responsive": true,
            "lengthChange": false,
            "autoWidth": true,
            "paging": true,
            "scrollCollapse": true,
            "scrollX": true,
            "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>',

            "fixedHeader": true,
            "select": true,
            "processing": false,
            "destroy": true,
            "orderable": true,

            columns: [
              { data: 'dec_id', visible: false, width: '0%'},
              { data: 'graveyard_id' , visible: false, width: '0%' },
              { data: 'memo_no', width: '100px' },
              { data: 'dod', width: '140px', },
              { data: 'dec_name' },
              { data: 'father', },
              { data: 'bur_date', width: '160px', },

              { data: 'address' , visible: false, width: '0%' },
              {
                data: null,
                render: function (data, type, row) {
                    if (data && data.dec_id && data.graveyard_id) {
                      return '<div class="mr-3" style="margin-left: -5%; font-size: 5px;"><button type="button" class="btn btn-block btn-sm"> বিস্তারিত দেখুন </button></div>';
                    }
                    else {
                        // If data is not available, return an empty string
                        return '';
                    }
                }, width: '140px'
              }
            ],

            "columnDefs": [
                {
                  "targets": [4, 5], // Column indexes (0-based) where transformation should be applied
                  "render": function (data, type, row) {
                      // Apply text-transform: uppercase to the rendered content
                      return type === 'display' && data !== null ? data.toUpperCase() : data;
                  }
                },

                {
                  "targets": [3, 6],
                  "type": "datetime", render: $.fn.dataTable.render.moment( 'DD-MM-YYYY' )
                }
            ],

            order: [[0, 'desc']]
          });
      }
});













//   $(document).ready(function(){
////            if (data && data.length > 0) {
////                $('#myDataTable').DataTable().clear().destroy();
////                var tableData = [];
////                data.forEach(obj => {
////                  tableData.push({
//              var gidValue = '2';
//              var myDataTable = $('#myDataTable').DataTable({
//                      language: {
//                                  "emptyTable": "No data available in table",
//                                  "lengthMenu": "Show _MENU_ entries",
//                                  "info": "Showing _START_-1 to _END_ of _TOTAL_ entries",
//                                  "infoEmpty": "Showing 0 to 0 of 0 entries",
//                                  "search": "Search:",
//                                  "paginate": {
//                                      "first": "First",
//                                      "last": "Last",
//                                      "next": "Next",
//                                      "previous": "Previous"
//                                  }
//                                 },
//
//                      "responsive": true,
//                      "lengthChange": false,
//                      "autoWidth": true,
//                      "paging": true,
//                      "scrollCollapse": true,
//                      "scrollX": true,
//                      "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>',
//
//                      "fixedHeader": true,
//                      "select": true,
//                      "processing": false,
//                      "destroy": true,
//                      "orderable": true,
//
//                      columns: [
//                        { data: 'dec_id', visible: false, width: '0%'},
//                        { data: 'graveyard_id' , visible: false, width: '0%' },
//                        { data: 'memo_no', width: '100px' },
//                        { data: 'dod', width: '140px', },
//                        { data: 'dec_name' },
//                        { data: 'father', },
//                        { data: 'bur_date', width: '160px', },
//
//                        { data: 'address' , visible: false, width: '0%' },
//                        {
//                              data: null,
//                              render: function (data, type, row) {
//                                  if (data && data.dec_id && data.graveyard_id) {
//                                    return '<div class="mr-3" style="margin-left: -5%; font-size: 5px;"><button type="button" class="btn btn-block btn-sm"> বিস্তারিত দেখুন </button></div>';
//                                  }
//                                  else {
//                                      // If data is not available, return an empty string
//                                      return '';
//                                  }
//                              }, width: '140px'
//                          }
//                      ],
//                      "columnDefs": [
//                          {
//                            "targets": [4, 5], // Column indexes (0-based) where transformation should be applied
//                            "render": function (data, type, row) {
//                                // Apply text-transform: uppercase to the rendered content
//                                return type === 'display' && data !== null ? data.toUpperCase() : data;
//                            }
//                          },
//
//                          {
//                            "targets": [3, 6],
//                            "type": "datetime", render: $.fn.dataTable.render.moment( 'DD-MM-YYYY' ) },
//
//                      ],
//                    });
//                    function loadDetailsPage(dec_id, graveyard_id) {
//                       window.location.href = '/graveDetails_withPosition?id=' + dec_id + '&gid=' + graveyard_id;
//                    }
//
//            $('#searchBtn').on('click', function() {
//                 var memoFilter = $('#MemoFilter').val();
//                 var deadNameFilter = $('#DeadnameFilter').val();
//                 var deadDayFilter = $('#DeaddayFilter').val();
//                 var deadMonthFilter = $('#DeadmonthFilter').val();
//                 var deadYearFilter = $('#DeadyearFilter').val();
//                 var buriedDayFilter = $('#BurieddayFilter').val();
//                 var buriedMonthFilter = $('#BuriedmonthFilter').val();
//                 var buriedYearFilter = $('#BuriedyearFilter').val();
//
//                 // Prepare the request data
//                 var requestData = {
//                    graveyardId: '2',
//                    memo: memoFilter,
//                    name: deadNameFilter,
//                    dod_day: '',
//                    dod_month: deadMonthFilter,
//                    dod_year: deadYearFilter,
//                    bur_day: '',
//                    bur_month: buriedMonthFilter,
//                    bur_year: buriedYearFilter
//                 };
//
//                  $.ajax({
//                    url: '/api/search',
//                    method: 'POST',
//                    contentType: 'application/json',
//                    data: JSON.stringify(requestData),
//                    success: function(data) {
//                    console.log(data)
//                      myDataTable.clear();
//                          if (data.data.length > 0) {
//                            myDataTable.rows.add(data.data).draw();
//                            $('.btn').on('click', function() {
//                                var rowData = myDataTable.row($(this).parents('tr')).data();
//                                loadDetailsPage(rowData.dec_id,rowData.graveyard_id);
//                            });
//                        }
//                    },
//                    error: function(error) {
//                      console.error('Error performing search:', error);
//                    }
//                  });
//           });
//   });
//
//
//
//  const monthDropDown = document.getElementById("BuriedmonthFilter");
//  const monthDropDownDead = document.getElementById("DeadmonthFilter");
//  const monthData = {
//    "January": "01",
//    "February": "02",
//    "March": "03",
//    "April": "04",
//    "May": "05",
//    "June": "06",
//    "July": "07",
//    "August": "08",
//    "September": "09",
//    "October": "10",
//    "November": "11",
//    "December": "12"
//  }
//
//  for (let key in monthData) {
//    let option = document.createElement("option");
//    option.setAttribute('value', monthData[key]);
//    let optionText = document.createTextNode(key);
//    option.appendChild(optionText);
//    monthDropDown.appendChild(option);
//  }
//
//  for (let key in monthData) {
//    let option = document.createElement("option");
//    option.setAttribute('value', monthData[key]);
//    let optionText = document.createTextNode(key);
//    option.appendChild(optionText);
//    monthDropDownDead.appendChild(option);
//  }
//
//  const dayDropDown = document.getElementById("BurieddayFilter");
//  const dayDropDownDead = document.getElementById("DeaddayFilter");
//  for (let i=1; i<31; i++) {
//    if(i<10){
//      i = "0" + i;
//    }
//    let option = document.createElement("option");
//    option.setAttribute('value', i);
//    let optionText = document.createTextNode(i);
//    option.appendChild(optionText);
//    dayDropDown.appendChild(option);
//  }
//
//  for (let i=1; i<31; i++) {
//    if(i<10){
//      i = "0" + i;
//    }
//    let option = document.createElement("option");
//    option.setAttribute('value', i);
//    let optionText = document.createTextNode(i);
//    option.appendChild(optionText);
//    dayDropDownDead.appendChild(option);
//  }
//
//  const yearDropDown = document.getElementById("BuriedyearFilter");
//  const yearDropDownDead = document.getElementById("DeadyearFilter");
//  for (let i=1974; i<2024; i++) {
//    let option = document.createElement("option");
//    option.setAttribute('value', i);
//    let optionText = document.createTextNode(i);
//    option.appendChild(optionText);
//    yearDropDown.appendChild(option);
//  }
//
//  for (let i=1974; i<2024; i++) {
//    let option = document.createElement("option");
//    option.setAttribute('value', i);
//    let optionText = document.createTextNode(i);
//    option.appendChild(optionText);
//    yearDropDownDead.appendChild(option);
//  }






//
//const module = {};
//
//$(document).ready( function () {
//    getLicenseList();
//
//} );
//
//
//function getLicenseList(){
//    $('#username').val(appUserDto.username);
//
//    fetch(module.api.licenseListURL + appUserDto.username)
//    .then(response => {
//        if (!response.ok) {
//            return response.json().then(json => { throw json; });
//        }
//        return response.json();
//    })
//    .then(data => {
//        setListData(data);
//    })
//    .catch(error => {
//        console.error('Error: ', error.message)
//    });
//}
//
//function setListData(data){
//
//    if (data && data.length > 0) {
//        $('#licenseList').DataTable().clear().destroy();
//        var tableData = [];
//        data.forEach(obj => {
//            tableData.push({
//                "applicationId": obj.applicationId,
//                "categoryName": obj.categoryName,
//                "orgName": obj.orgName,
//                "appYear": obj.appYear,
//                "statusName": '<span class="badge badge-pill bg-danger-light">'+ obj.statusName +'</span>',
//                "address": obj.address,
//                "comments": obj.comments,
//                "assignedTo": obj.assignedTo,
//                "actionBtn": addRowButton(obj)
//            });
//        });
//
//        $('#licenseList').dataTable({
//            data: tableData,
//            columns: [
//                { data: "applicationId"},
//                { data: "categoryName" },
//                { data: "orgName" },
//                { data: "appYear" },
//                { data: "statusName" },
//                { data: "address" },
//                { data: "comments" },
//                { data: "actionBtn", wrap: true, orderable: false}
//            ],
//            order: [[0, 'desc']]
//        });
//    }
//}
//
//function addRowButton(object){
//
//    var printBtn = "<a class='btn btn-sm bg-primary-light mr-1' onclick='printBtnClick(" +
//                    JSON.stringify(object) + ")'> <i class='fas fa-print  mr-1'></i> Print </a>"
//
//    var editBtn = "<a class='btn btn-sm bg-success-light mr-1' onclick='editBtnClick(" +
//                    JSON.stringify(object) + ")'> <i class='far fa-edit  mr-1'></i> Edit </a>"
//
//    var delBtn = "<a class='btn btn-sm bg-danger-light mr-1' onclick='deleteBtnClick(" +
//                    JSON.stringify(object) + ")'> <i class='fas fa-trash'></i> Delete </a>"
//
//    var renewBtn = "<a class='btn btn-sm bg-success-light mr-1' onclick='renewBtnClick(" +
//                    JSON.stringify(object) + ")'> <i class='fas fa-edit  mr-1'></i> Renew </a>"
//
//    var btnDiv = "<div>" + printBtn;
//
//    switch(object.statusId){
//        case 1: // Incomplete
//            btnDiv = btnDiv + editBtn + delBtn;
//            break;
//
//        case 5: // Info Mismatch (required correction)
//            btnDiv = btnDiv + editBtn;
//            break;
//
//        case 10: // Expire
//            btnDiv = btnDiv + renewBtn;
//            break;
//
//        default:
//            break;
//    }
//    btnDiv = btnDiv + "</div>";
//    return btnDiv;
//}
//
//function printBtnClick(object){
//    console.log("print click for application " + object.applicationId);
//}
//
//function editBtnClick(object){ goForEdit(object); }
//
//function deleteBtnClick(object){
//    $("#confirmButtonYes").click(
//        function() {
//            closeConfirmBox();
//            goForDelete(object);
//        });
//    showConfirmBox();
//}
//
//function renewBtnClick(object){
//    $("#confirmButtonYes").click(
//        function() {
//            closeConfirmBox();
//            goForRenew(object);
//        });
//    showConfirmBox();
//}
//
//function goForEdit(object){
//
//    var form = $("#editForm");
//
//    $("<input />").attr("type", "hidden")
//    .attr("name", "username")
//    .attr("value", appUserDto.username)
//    .appendTo(form);
//
//    $("<input />").attr("type", "hidden")
//    .attr("name", "licenseCategoryName")
//    .attr("value", object.categoryName)
//    .appendTo(form);
//
//    $("<input />").attr("type", "hidden")
//    .attr("name", "licenseCategoryId")
//    .attr("value", object.categoryId)
//    .appendTo(form);
//
//    $("<input />").attr("type", "hidden")
//    .attr("name", "forEdit")
//    .attr("value", true)
//    .appendTo(form);
//
//    $("<input />").attr("type", "hidden")
//    .attr("name", "applicationId")
//    .attr("value", object.applicationId)
//    .appendTo(form);
//
//    form.submit();
//}
//
//function goForRenew(object){
//
//    var form = $("#editForm");
//
//    $("<input />").attr("type", "hidden")
//    .attr("name", "username")
//    .attr("value", appUserDto.username)
//    .appendTo(form);
//
//    $("<input />").attr("type", "hidden")
//    .attr("name", "licenseCategoryName")
//    .attr("value", object.categoryName)
//    .appendTo(form);
//
//    $("<input />").attr("type", "hidden")
//    .attr("name", "licenseCategoryId")
//    .attr("value", object.categoryId)
//    .appendTo(form);
//
//    $("<input />").attr("type", "hidden")
//    .attr("name", "forEdit")
//    .attr("value", true)
//    .appendTo(form);
//
//    $("<input />").attr("type", "hidden")
//    .attr("name", "isRenew")
//    .attr("value", true)
//    .appendTo(form);
//
//    $("<input />").attr("type", "hidden")
//    .attr("name", "applicationId")
//    .attr("value", object.applicationId)
//    .appendTo(form);
//
//    form.submit();
//}
//
//function goForDelete(object){
//    fetch(module.api.licenseListURL + object.applicationId, {method: 'DELETE'})
//    .then(response => {
//        if (!response.ok) {
//            return response.json().then(json => { throw json; });
//        }
//        return response.text();
//    })
//    .then(data => {
//        getLicenseList();
//        alert (data);
//    })
//    .catch(error => {
//        console.error('Error: ', error.message)
//        alert ('Error: '+ error.message);
//    });
//}
//
//function showConfirmBox() { $("#confirmBoxOverlay").show(); }
//
//function closeConfirmBox() { $("#confirmBoxOverlay").hide(); }
//
