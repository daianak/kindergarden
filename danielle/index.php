<!DOCTYPE html>
<?php
session_start();

?>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>DoggieFriend</title>

	
	    <!-- jQuery -->

<link href="http://code.jquery.com/ui/1.10.4/themes/ui-lightness/jquery-ui.css" rel="stylesheet">
      <script src="http://code.jquery.com/jquery-1.10.2.js"></script>
      <script src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>

	  
	       <!-- External Javascript -->
		<script type="text/javascript" src="js/profile.js"></script>
	   <script type="text/javascript" src="js/match.js"></script>
	   	   <script type="text/javascript" src="js/map.js"></script>

	   
	   <!--Google Maps API-->
	       <script language="javascript" src=  "https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true"></script>

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/stylish-portfolio.css" rel="stylesheet"/>
<link href="/lib/jquery.bxslider.css" rel="stylesheet" />

    <!-- Bootstrap Core CSS -->
<link href="css/style.css" rel="stylesheet" />


    <!-- Custom Fonts -->
    <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,300italic,400italic,700italic" rel="stylesheet" type="text/css">



	

	  <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>
	   <script src="js/bootstrap.js"></script>
	   <!-- bxSlider Javascript file -->
<script src="js/jquery.bxslider.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
	

	   
	   <script>
	   	
 // signup slider Javascript
  
         $(function() {
            $( "#slider" ).slider({
               range:true,
               min: 6,
               max: 23,
               values: [ 18, 20.5 ],
               slide: function( event, ui ) {
                  $( "#time" ).val( ui.values[ 0 ] + ":00 - " + ui.values[ 1 ]+ ":00" );
				  
               }
           });
         $( "#time" ).val(  $( "#slider" ).slider( "values", 0 ) +
            ":00 - " + $( "#slider" ).slider( "values", 1 )+":00" );

         });
		 
 $(document).ready(function(){
$('.bxslider').bxSlider({
  auto: true,
  pager:false,
  controls: false
});
});
   
	   </script>

</head>

<body>


    <!-- Navigation -->
    <a id="menu-toggle" href="#" class="btn btn-dark btn-lg toggle"><i class="fa fa-bars"></i></a>
    <nav id="sidebar-wrapper">
        <ul class="sidebar-nav">
            <a id="menu-close" href="#" class="btn btn-light btn-lg pull-right toggle"><i class="fa fa-times"></i></a>
            <li class="sidebar-brand">
                <a href="#top">DoggieFriend</a>
            </li>
            <li>
                <a href="#top">Home</a>
            </li>
            <li>
                <a href="#login">Log in</a>
            </li>
            <li>
                <a href="#services">Services</a>
            </li>
			<li>
                <a href="#profile">Profile</a>
            </li>
			    <li>
                <a href="#match">Find Match</a>
            </li>
            <li>
                <a href="#portfolio">Portfolio</a>
            </li>
			
			<li>
                <a href="#signup">Sign up</a>
            </li>
            <li>
                <a href="#map-canvas">Dog Parks Near Me</a>
            </li>
        </ul>
    </nav>

    <!-- Header -->
    <header id="top" class="header">
        <div class="text-vertical-center">
            <h1>DoggieFriend</h1>
            <h3>Lets make some friends</h3>
            <br>
<p>
	
<?php
if($_SESSION["myusername"]) {
 echo "Welcome,&nbsp; ";
echo $_SESSION["myusername"];
echo  "&nbsp; <a href=logout.php>Logout</a> ";
}
?>
</p>
            <a href="#login" class="btn btn-dark btn-lg">Log in</a>
        </div>
    </header>
	
	<section id="login"class="login">
<div class="container">
            <div class="row text-center">
    <!-- Login -->

      <form class="form-signin" id="signIn" method="post" >
        <h2 class="form-signin-heading">Please sign in</h2>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" id="inputEmail" name="inputEmail" class="form-control" placeholder="Email address" required autofocus />
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" name="inputPassword" class="form-control" placeholder="Password" required>
    
        <button a href="#top" class="btn btn-dark btn-lg" type="submit"  name= "signIn">Sign in</button>
		 <a href="#signup" class="btn btn-dark btn-lg" name= "gotosignup" id="gotosignup">Sign up</a>
      </form>
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
		
				  <script>
	  $('form[id=signIn]').submit(function (event) {

    if (request) {
        request.abort();
    }
    // setup some local variables
    var $form = $(this);

    // let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");


    // serialize the data in the form
    var serializedData = $form.serialize();


    // fire off the request to specific url

    var request = $.ajax({
        url : "signIn.php",
        type: "post",
        data: serializedData
    });
    // callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
		
window.location.reload();
    });

    // callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){

    });

    // callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // reenable the inputs

    });

    // prevent default posting of form
    event.preventDefault();
});

</script>
		</section>

    <!-- Services -->
    <section id="services" class="services bg-primary">
        <div class="container">
            <div class="row text-center">
                <div class="col-lg-10 col-lg-offset-1">
                    <h2>What do you want to do today?</h2>
                    <hr class="small">
                    <div class="row">
                        <div class="col-md-4 col-sm-6">
                            <div class="service-item">
                                <span class="fa-stack fa-4x">
                                <i class="fa fa-circle fa-stack-2x"></i>
                            </span>
                                <h4>
                                    <strong>Manage preferences</strong>
                                </h4>
                                <p>Let us know what your dog loves</p>
                                <a href="#profile" class="btn btn-light">Personal Profile</a>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-6">
                            <div class="service-item">
                                <span class="fa-stack fa-4x">
                                <i class="fa fa-circle fa-stack-2x"></i>
                            </span>
                                <h4>
                                    <strong>Find Match</strong>
                                </h4>
                                <p>Look for the perfect playmate</p>
                                <a href="#match" class="btn btn-light">Find a friend</a>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-6">
                            <div class="service-item">
                                <span class="fa-stack fa-4x">
                                <i class="fa fa-circle fa-stack-2x"></i>
                            </span>
                                <h4>
                                    <strong>See Parks</strong>
                                </h4>
                                <p>See parks located near you</p>
                                <a href="#map-canvas" class="btn btn-light">Walk me</a>
                            </div>
                        </div>

                    </div>
                    <!-- /.row (nested) -->
                </div>
                <!-- /.col-lg-10 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
    </section>

		 <!-- Profile -->
		<section id="profile" class="profile" >
		<div class="container">
            <div class="row text-center" >
		
			<h2>My dog is awesome</h2>
			<p>
			   <ul class="profileList">
			</ul>
			<p>

            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
		</section>
		
				 <!-- Find Match -->
		<section id="match" class="match" >
		<div class="container">
            <div class="row text-center" >
		
			<h2>These dogs can't wait to meet you</h2>
			<p>
			 <ul class="matchList">
			</ul>
			<p>

            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
		</section>
	
    <!-- Portfolio -->
    <section id="portfolio" >
          <ul class="bxslider">
  <li><img src="img/01.jpg" /></li>
  <li><img src="img/02.jpg" /></li>
  <li><img src="img/03.jpg" /></li>
  <li><img src="img/04.jpg" /></li>

</ul>
        <!-- /.container -->
    </section>



    <!-- Map -->
    <section id="map-canvas" class="map">

    <div id="output"></div>

    </section>

	
		 <!-- Signup -->
		<section id="signup"class="signup">
		<div class="container">
            <div class="row text-center">
   
 	
			 <form class="form-signup" id="signupForm" role="form"	  method="post" >
			 <h2>Sign up</h2>

<fieldset>
	 <legend>Lets be friends</legend>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" id="inputEmail" name="inputEmail" class="form-control" placeholder="Email Address" required autofocus />
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" name="inputPassword" class="form-control" placeholder="Password" required>
	
   <p>
             <select name="park" class="form-control" id="park">
			   <option value = "" disabled selected>Favorite Dog Park</option>
               <option value = "Hatzofim Garden">Hatzofim Garden</option>
               <option value = "Yehuda Garden">Yehuda Garden</option>
               <option value = "National Park">National Park</option>
             </select>
          </p>

		  
		  
		   <p>
		   
		   <h4 id="timeRange">Play Time &nbsp;</h4>
         <input type="text" id="time" name="time"
      </p>
      <div id="slider"></div>

	</fieldset>
		<fieldset>
		<br>
		
		 <legend>Lets get to know your dog better</legend>
	
       <p> <input type="text" id="dogName" name="dogName" class="form-control" placeholder="Dog's Name" required ></p>
	   
	    
		<h4> Dog&rsquo;s Size</h4>
		<label >Small &nbsp;<input type="Radio" id="dogSize" name="dogSize" value="Small" class="form-control"></label>
		 <label >Medium&nbsp; <input type="Radio" id="dogSize" name="dogSize" value="Medium" class="form-control"></label>
		<label >Large <input type="Radio" id="dogSize" name="dogSize" value="Large" class="form-control"></label>
	
		     <h4>Dog&rsquo;s Sex</h4>
			   
			 <label>Male &nbsp; <input type="Radio" id="dogSex" name="dogSex" value="Male" class="form-control"> </label>
			<label>Female <input type="Radio" id="dogSex" name="dogSex" value="Female" checked class="form-control"></label>
		
		
			 <h4> Activity Level</h4>
       		<p><label> <input type="range" id="activityLevel" name="activityLevel" value="3" min="0" max="5"  class="form-control"></label></p><br>
			 
			 		<h4>Favorite Activities </h4>

				<div class="checkbox">
  <label><input type="checkbox" name="run" value="running">Run &amp; Chase </label>

  <label><input type="checkbox" name="toys" value="toys">Play with toys </label>

  <label><input type="checkbox" name= "contact" value="sports" >Contact Sports</label>
</div>

	</fieldset>
        <button class="btn btn-dark btn-lg"  type="submit" name= "signin" id="signup" >Sign me up</button>
	
      </form>
            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
		</section>
<script>

	  $('form[id=signupForm]').submit(function (event) {

    if (request) {
        request.abort();
    }
    // setup some local variables
    var $form = $(this);

    // let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");


    // serialize the data in the form
    var serializedData = $form.serialize();


    // fire off the request to specific url

    var request = $.ajax({
        url : "signup.php",
        type: "post",
        data: serializedData
    });
    // callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
		console.log(response);
 window.location.reload();
 

    });

    // callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){

    });

    // callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // reenable the inputs

    });

    // prevent default posting of form
    event.preventDefault();
});
	


</script>
    <!-- Footer -->
    <footer class="footer bg-primary">
        <div class="container ">
            <div class="row">
                <div class="col-lg-10 col-lg-offset-1 text-center">
                    <h4><strong>DoggieFriend</strong>
                    </h4>
                    <p>Cities Currently Supported<br>Ramat Gan</p>
                    <ul class="list-unstyled">
                        <li><i class="fa fa-phone fa-fw"></i> 0502904779</li>
                        <li><i class="fa fa-envelope-o fa-fw"></i>  <a href="mailto:danielle.filin@gmail.com">danielle.filin@gmail.com</a>
                        </li>
                    </ul>
                    <br>

                    <hr class="small">
                    <p>Copyright &copy; DoggieFriend 2015</p>
                </div>
            </div>
        </div>
    </footer>



    <!-- Custom Theme JavaScript -->
	


    <script>
	
	//loading external scripts
      	$( "profile" ).ready(loadProfile);
		$( "match" ).ready(loadMatch);
	    $( "output" ).ready(getLocation);

  
    // Closes the sidebar menu
    $("#menu-close").click(function(e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
    });

    // Opens the sidebar menu
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
    });

    // Scrolls to the selected menu item on the page
    $(function() {
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });
    </script>

</body>

</html>
