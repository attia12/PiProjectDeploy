(function ($) {
    "use strict";
    var markerIcon = {
        anchor: new google.maps.Point(22, 16),
        url: 'assets/img/marker.png',
    }

    function mainMap() {
        function locationData(locationURL, candidateImg, candidateName, candidateDesignation, candidateLocation, candidateExp) {
            return ('<div class="map-popup-wrap"><div class="map-popup"><div class="infoBox-close"><i class="fa fa-times"></i></div><div class="map-cardcand position-relative"><div class="position-absolute start-0 top-0 mt-3 z-1"><span class="badge badge-success badge-xs rounded-pill rounded-start-0">' + candidateDesignation + '</a></div><a href="' + locationURL + '" class="card px-3 py-5 rounded-4 shadow-sm"><div class="d-flex align-items-start justify-content-center flex-column gap-3"><div class="canThumb mx-auto mb-3"><img src="' + candidateImg + '" class="img-fluid circle avatar-xxxl" alt=""></div><div class="canCaption w-100 text-center"><div class="candExpe mb-1"><span class="badge badge-xs badge-primary rounded-pill">' + candidateExp + '</span></div><div class="candTitles"><h5 class="fw-semibold mb-0">' + candidateName + '</h5></div><div class="candLocation"><span class="text-muted text-md"><i class="fa-solid fa-location-dot me-2"></i>' + candidateLocation + '</span></div>										</div></div></a></div></div></div>')
        }
        var locations = [
            [locationData('candidate-detail.html', 'assets/img/team-1.jpg', 'John J. Winston', 'Web Designer', '4844 Ridenour Street, Canada', '2y Expe.'), 40.72956781, -73.99726866, 0, markerIcon],
            [locationData('candidate-detail.html', 'assets/img/team-2.jpg', 'Anthony S. Thompson', 'UI/UX Designer', '4844 Ridenour Street, Canada', '3y Expe.'), 40.76221766, -73.96511769, 1, markerIcon],
            [locationData('candidate-detail.html', 'assets/img/team-3.jpg', 'Ronald V. White', 'PHP Developer', '4844 Ridenour Street, Canada', '5y Expe.'), 40.88496706, -73.88191222, 2, markerIcon],
            [locationData('candidate-detail.html', 'assets/img/team-4.jpg', 'Robbie A. Ferris', 'WordPress Developer', '4844 Ridenour Street, Canada', '3y Expe.'), 40.72228267, -73.99246214, 3, markerIcon],
            [locationData('candidate-detail.html', 'assets/img/team-5.jpg', 'James F. Stout', 'Shopify Developer', '4844 Ridenour Street, Canada', '7y Expe.'), 40.94982541, -73.84357452, 4, markerIcon],
            [locationData('candidate-detail.html', 'assets/img/team-6.jpg', 'Laura P. Barnard', 'Figma Designer', '4844 Ridenour Street, Canada', '4y Expe.'), 40.90261483, -74.15737152, 5, markerIcon],
            [locationData('candidate-detail.html', 'assets/img/team-7.jpg', 'Connie J. Cooksey', 'Team Manager', '4844 Ridenour Street, Canada', '3y Expe.'), 40.79145927, -74.08252716, 6, markerIcon],
            [locationData('candidate-detail.html', 'assets/img/team-8.jpg', 'Jonathan L. Hall', 'Magento Developer', '4844 Ridenour Street, Canada', 'Fresher'), 40.58423508, -73.96099091, 7, markerIcon],
            [locationData('candidate-detail.html', 'assets/img/team-9.jpg', 'Rudolph N. Thomas', 'Laravel Developer', '4844 Ridenour Street, Canada', '2y Expe.'), 40.58110616, -73.97678375, 8, markerIcon],
            [locationData('candidate-detail.html', 'assets/img/team-11.jpg', 'Roger C. Costello', 'Content Writer', '4844 Ridenour Street, Canada', '5y Expe.'), 40.73112881, -74.07897948, 9, markerIcon],
            [locationData('candidate-detail.html', 'assets/img/team-10.jpg', 'Francis N. Riffle', 'Product Designer', '4844 Ridenour Street, Canada', '3y Expe.'), 40.67386831, -74.10438536, 10, markerIcon],
        ];

        var map = new google.maps.Map(document.getElementById('map-main'), {
            zoom: 9,
            scrollwheel: false,
            center: new google.maps.LatLng(40.7, -73.87),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            panControl: false,
            fullscreenControl: true,
            navigationControl: false,
            streetViewControl: false,
            animation: google.maps.Animation.BOUNCE,
            gestureHandling: 'cooperative',
            styles: [{
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#444444"
                }]
            }]
        });


        var boxText = document.createElement("div");
        boxText.className = 'map-box'
        var currentInfobox;
        var boxOptions = {
            content: boxText,
            disableAutoPan: true,
            alignBottom: true,
            maxWidth: 0,
            pixelOffset: new google.maps.Size(-145, -45),
            zIndex: null,
            boxStyle: {
                width: "260px"
            },
            closeBoxMargin: "0",
            closeBoxURL: "",
            infoBoxClearance: new google.maps.Size(1, 1),
            isHidden: false,
            pane: "floatPane",
            enableEventPropagation: false,
        };
        var markerCluster, marker, i;
        var allMarkers = [];
        var clusterStyles = [{
            textColor: 'white',
            url: '',
            height: 50,
            width: 50
        }];


        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                icon: locations[i][4],
                id: i
            });
            allMarkers.push(marker);
            var ib = new InfoBox();
            
            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    ib.setOptions(boxOptions);
                    boxText.innerHTML = locations[i][0];
                    ib.close();
                    ib.open(map, marker);
                    currentInfobox = marker.id;
                    var latLng = new google.maps.LatLng(locations[i][1], locations[i][2]);
                    map.panTo(latLng);
                    map.panBy(0, -180);
                    google.maps.event.addListener(ib, 'domready', function () {
                        $('.infoBox-close').click(function (e) {
                            e.preventDefault();
                            ib.close();
                        });
                    });
                }
            })(marker, i));
        }
        var options = {
            imagePath: 'img/',
            styles: clusterStyles,
            minClusterSize: 2
        };
        markerCluster = new MarkerClusterer(map, allMarkers, options);
        google.maps.event.addDomListener(window, "resize", function () {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });

        $('.nextmap-nav').click(function (e) {
            e.preventDefault();
            map.setZoom(15);
            var index = currentInfobox;
            if (index + 1 < allMarkers.length) {
                google.maps.event.trigger(allMarkers[index + 1], 'click');
            } else {
                google.maps.event.trigger(allMarkers[0], 'click');
            }
        });
        $('.prevmap-nav').click(function (e) {
            e.preventDefault();
            map.setZoom(15);
            if (typeof (currentInfobox) == "undefined") {
                google.maps.event.trigger(allMarkers[allMarkers.length - 1], 'click');
            } else {
                var index = currentInfobox;
                if (index - 1 < 0) {
                    google.maps.event.trigger(allMarkers[allMarkers.length - 1], 'click');
                } else {
                    google.maps.event.trigger(allMarkers[index - 1], 'click');
                }
            }
        });
        $('.map-item').click(function (e) {
            e.preventDefault();
     		map.setZoom(15);
            var index = currentInfobox;
            var marker_index = parseInt($(this).attr('href').split('#')[1], 10);
            google.maps.event.trigger(allMarkers[marker_index], "click");
			if ($(this).hasClass("scroll-top-map")){
			  $('html, body').animate({
				scrollTop: $(".map-container").offset().top+ "-80px"
			  }, 500)
			}
			else if ($(window).width()<1064){
			  $('html, body').animate({
				scrollTop: $(".map-container").offset().top+ "-80px"
			  }, 500)
			}
        });
        var zoomControlDiv = document.createElement('div');
        var zoomControl = new ZoomControl(zoomControlDiv, map);

        function ZoomControl(controlDiv, map) {
            zoomControlDiv.index = 1;
            map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(zoomControlDiv);
            controlDiv.style.padding = '5px';
            var controlWrapper = document.createElement('div');
            controlDiv.appendChild(controlWrapper);
            var zoomInButton = document.createElement('div');
            zoomInButton.className = "mapzoom-in";
            controlWrapper.appendChild(zoomInButton);
            var zoomOutButton = document.createElement('div');
            zoomOutButton.className = "mapzoom-out";
            controlWrapper.appendChild(zoomOutButton);
            google.maps.event.addDomListener(zoomInButton, 'click', function () {
                map.setZoom(map.getZoom() + 1);
            });
            google.maps.event.addDomListener(zoomOutButton, 'click', function () {
                map.setZoom(map.getZoom() - 1);
            });
        }


    }
    var map = document.getElementById('map-main');
    if (typeof (map) != 'undefined' && map != null) {
        google.maps.event.addDomListener(window, 'load', mainMap);
    }

})(this.jQuery);