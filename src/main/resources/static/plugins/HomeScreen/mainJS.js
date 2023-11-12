jQuery(document).ready(function(){
    jQuery("#visit").load("VisitModal.html");
});
    
    // Get the modal
    var modal = document.getElementById("visit");
    
    // Get the button that opens the modal
    var btn = document.getElementById("visit_modal");
    
    // Get the <span> element that closes the modal
    // var span = document.getElementsByClassName("close")[0];
    
    // When the user clicks the button, open the modal 
    btn.onclick = function() {
    modal.style.display = "block";
    }
    
    // When the user clicks on <span> (x), close the modal
    // span.onclick = function() {
    //   modal.style.display = "none";
    // }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }
   





// jQuery(document).ready(function(){
//     jQuery("#basicInfo").load("SubLayers/basic_info.html");
//     jQuery("#navbar").load("../navigation_panel.html");
//     jQuery(".owner").load("SubLayers/owner.html");
//     jQuery(".administrative").load("SubLayers/administrative_info.html");
//     jQuery(".infrastructure").load("SubLayers/Infrastructure_Information.html");
//     jQuery(".service_delivery").load("SubLayers/ServiceDelivery.html");
//     jQuery(".staff_info").load("SubLayers/Staff_Information.html");
//     jQuery("#ownerModal").load("Modal/ownerModal.html");
//     jQuery("#Specialist_Doctor_Modal").load("Modal/Specialist.html");
//     jQuery("#ReportSender_Modal").load("Modal/reportSenderModal.html");
//     jQuery("#Medical_Technician_Modal").load("Modal/Medical_tech_Modal.html");
//     jQuery("#summary").load("SubLayers/summary.html");
//     jQuery("#payment").load("SubLayers/payment.html");
//     jQuery("#Duty_Doctor_Modal").load("Modal/DutyDoctorModal.html");
//     jQuery("#Blood_Circulation_Technician_Modal").load("Modal/Blood_Circulation_Technician_Modal.html");
//     jQuery("#Nurse_Modal").load("Modal/Nurse_Modal.html");
//     jQuery("#Lab_Att_Modal").load("Modal/Lab_Att_Modal.html");
//     jQuery("#Others_Modal").load("Modal/Other_Modal.html");

    
//     // jQuery("#owner").load("SubLayers/owner.html");
// });