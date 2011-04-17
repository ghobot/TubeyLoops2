(function( $ ) {
  $.noConflict();

  $(function() {

  	$(document).bind("keydown", function( event ) {
  		Emit.last = ({
				81: 0,
				87: 1,
				69: 2,
				82: 3
  		})[ event.which ];
  	});

    $("#divRightCol").css({
      marginLeft: "0px",
      marginTop: "0px"
    });
	var $videoIn = $(".timeIn").val();
	var $videoOut = $(".timeOut").val();
	console.log("$videoIn has been called")
	
    var $videoStack = $("#video-stack"),
    		$video = $("<video/>"),
    		times = [
    			{
    				in: 8,
    				out: 9
    			},
    			{
    				in: 17.5,
    				out: 17.7
    			},
    			{
    				in: 21,
    				out: 21.2
    			},
    			{
    				in: 23,
    				out: 23.2
    			}
    		],
    		controllers = {
          "playing" : "play",
          "paused"  : "pause"
        },
        KICK = 0,
        SNARE = 1,
        pops = [];


		$videoStack.css({
			width: $(window).width(),
			height: $(window).height()
		});

    for ( var idx = 0; idx < 4; idx++ ) {

		var $video_input = $("#video_source").value();
		
    	var $clone = $video.clone();
		var videourl = $("#videoUrl1").val();
		
    	$clone.css({
    		"zIndex" : idx,
    		"width": $videoStack.width(),
    		"height": $videoStack.height(),
    		"position": "absolute"
    	}).attr("src", videourl);
    	
    	$videoStack.append( $clone );

			pops.push( Popcorn( "#" + $clone[0].id ) );
    }

    Emit.sender = $(document);

    Emit.sender.bind("sketchUpdate", function( event, step ) {

			var idx = Emit.last;//+step.channel,
					$pop = pops[ idx ],
					inOut = times[ idx ]; // in/out

			if ( !$pop || !$pop.media ) {
				return;
			}


			$("video").css({
				"zIndex": 995
			}).eq( idx ).css({
				"zIndex": 999
			});

			//if ( $pop.media.paused ) {
				$pop.currentTime( inOut.in ).play();
			//}

		  $pop.exec( inOut.out , function() {
		    this.currentTime( inOut.in ).pause();
		  });

    });
  });


//    Emit.sender.bind("sketchControl", function( event, step ) {
//      // PLAY/PAUSE Controllers
//      //$pop[ controllers[ step ] ]();
//    });


	setTimeout(function() {
		jQuery(".stepWidgetChannelTxt:even").hide();

		//jQuery("#divVolume input").val("0");
	}, 1000);
})( jQuery );

