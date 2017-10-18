
$(function() {
  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      var name = $("input#name").val();
      var email = $("input#email").val();
      var subject = $("input#subject").val();      
      var phone = $("input#phone").val();
      var message = $("textarea#message").val();
      var firstName = name; // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }
      $this = $("#sendMessageButton");
      $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
      $.ajax({
        url: "././mail/contact_me.php",
        type: "POST",
        data: {
          name: name,
          phone: phone,
          email: email,
          subject:subject,
          message: message
        },
        cache: false,
        success: function() {
          // Success message
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-success')
            .append("<strong>Your message has been sent. </strong>");
          $('#success > .alert-success')
            .append('</div>');
          //clear all fields
          $('#contactForm').trigger("reset");
        },
        error: function() {
          // Fail message
          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
          $('#success > .alert-danger').append('</div>');
          //clear all fields
          $('#contactForm').trigger("reset");
        },
        complete: function() {
          setTimeout(function() {
            $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
          }, 1000);
        }
      });
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
  $('#success').html('');
});

// $(window).load(function(){
  $('#images_carousel').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        itemWidth: 150,
        itemMargin: 0,
        asNavFor: '#slider'
      });

      $('#slider').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        sync: "#images_carousel"
      });
// });

function resize(){
  var top_offset = $(window).scrollTop();
  var windowWidth = $(window).width();
    if (top_offset >= 100){
      $('.about_wrap').addClass('slideInLeft');
      $('.mission_wrap').addClass('slideInRight');
      // $('.about_wrap').addClass('left-1 slideInLeft');
      // $('.mission_wrap').addClass('right-1 slideInRight');
    }
    else{
      $('.about_wrap').removeClass('slideInLeft');
      $('.mission_wrap').removeClass('slideInRight');
      // $('.about_wrap').removeClass('left-1 left-14 slideInLeft');
      // $('.mission_wrap').removeClass('right-1 right-14 slideInRight');
    }

    if(top_offset >1020){
      $('.portfolio-item').removeClass('hidden');
      $('.portfolio-item').addClass('fadeIn');
    }else{
      $('.portfolio-item').addClass('hidden');
      $('.portfolio-item').removeClass('fadeIn');
    }

    if (top_offset >= 4300){
      $('.left_box').addClass('left-1 slideInLeft');
      $('.right_box').addClass('right-1 slideInRight');
    }
    else{
      $('.left_box').removeClass('left-1 slideInLeft');
      $('.right_box').removeClass('right-1 slideInRight');
    }

    if (top_offset >= 1950){
      $('.room_type_box').addClass('full_opacity');
      // $('.large_room, .small_room').addClass('full_opacity');
    }
    else{
      $('.room_type_box').removeClass('full_opacity');
      // $('.large_room, .small_room').removeClass('full_opacity');
    }
}

$(window).scroll(function(){
  resize();
});

$("#l_show_more").on("click", function(e){
  e.preventDefault();
  console.log('aks');
  if($('#l_detail').hasClass('hide')){
    $('#l_detail').removeClass('hide').addClass('fadeIn');
    $(this).text("Less");
  }else{
    $('#l_detail').addClass('hide').removeClass('fadeIn');
    $(this).text("Learn More");
  }
});

$("#s_show_more").on("click", function(e){
  e.preventDefault();
  if($('#s_detail').hasClass('hide')){
    $('#s_detail').removeClass('hide').addClass('fadeIn');
    $(this).text("Less");
  }else{
    $('#s_detail').addClass('hide').removeClass('fadeIn');
    $(this).text("Learn More");
  }
});

$('.request_booking_btn').on("click", function(e){
  e.preventDefault();
  $('html, body').animate({
      scrollTop: $(".contact-form-row").offset().top
  }, 2000);
  $('#subject').val("Room booking")
  $('#message').val("I'd like to talk about booking a stay!");
});

$('#videoPlayerBtn').on('click', function(e){
  e.preventDefault();
  $('#videoModal').modal('show');
  var video = document.getElementById("video_player");
  $('source',  video).attr('src', 'http://privecare.com/video/Prive-Luxury-Recovery-720p.mp4');
  video.load();
  video.play();
});

$('#close_btn').on('click', function(){
  $('#videoModal').modal('hide');
  var video = document.getElementById("video_player");
  $('source',  video).attr('src', '');
  video.pause();
});

$('#sendMessageButton').on('click', function(){
  Tawk_API.toggle();
});

$('#roomTypeCarousal').on('slide.bs.carousel', function () {
  $('#l_show_more').text("Learn More");
  $('#s_show_more').text("Learn More");
  $('#s_detail, #l_detail').addClass('hide')
});

// $(document).ready(function(){
//     /* Get iframe src attribute value i.e. YouTube video url
//     and store it in a variable */
//     var url = $("#cartoonVideo").attr('src');

//     /* Assign empty url value to the iframe src attribute when
//     modal hide, which stop the video playing */
//     $("#videoModal").on('hide.bs.modal', function(){
//         $("#cartoonVideo").attr('src', '');
//     });

//     /* Assign the initially stored url back to the iframe src
//     attribute when modal is displayed again */
//     $("#videoModal").on('show.bs.modal', function(){
//         $("#cartoonVideo").attr('src', url);
//     });
// });

// function init_map(){var myOptions = {zoom:16,center:new google.maps.LatLng(34.0731665,-118.3745462),mapTypeId: google.maps.MapTypeId.ROADMAP};map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);marker = new google.maps.Marker({map: map,position: new google.maps.LatLng(34.0731665,-118.3745462)});infowindow = new google.maps.InfoWindow({content:'<strong>Prive Aftercare</strong><br>8438 West 3rd Street, Los Angeles, CA<br>'});google.maps.event.addListener(marker, 'click', function(){infowindow.open(map,marker);});infowindow.open(map,marker);}google.maps.event.addDomListener(window, 'load', init_map);
