$(function () {
    let myItems = [
        {
            id: "site-196",
            description: "des",
            lat: 40.198055555556,
            lng: 141.30583333333,
            title: "北黄金貝塚",
            url: "https://jomon-japan.unifiedx.dev/learn/jomon-sites/kitakogane",
            site_locality: "伊達市",
            site_class: "core",
            alt: "北黄金貝塚"
        },
        {
            id: "site-10018",
            description: "　ds",
            lat: 42.402222222222,
            lng: 140.91166666667,
            title: "北黄金貝塚",
            url: "https://jomon-japan.unifiedx.dev/learn/jomon-sites/kitakogane",
            site_locality: "伊達市",
            site_class: "core",
            alt: "北黄金貝塚",
    
        },
        {
            id: "site-192",
            description: "aa",
            lat: 41.957687010888,
            lng: 140.92544496059,
            title: "大船遺跡",
            url: "https://jomon-japan.unifiedx.dev/learn/jomon-sites/ofune",
            site_locality: "函館市",
            site_class: "core",
            alt: "大船遺跡"
        },
        {
            id: "site-10038",
            description: "　123。",
            lat: 42.542777777778,
            lng: 140.77527777778,
            title: "入江貝塚",
            url: "https://jomon-japan.unifiedx.dev/learn/jomon-sites/irie",
            site_locality: "洞爺湖町",
            site_class: "core",
            alt: "入江貝塚"
        }
    ];
    let playList = $(".list_markers");
    let markers = [];
    
    let marker;
    var map = L.map('mapid').setView([41.957687010888, 140.92544496059], 7);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    }).addTo(map);
    let template = '<ul>';

    for (var i = 0; i < myItems.length; i++) {
        const item = myItems[i];
        var pin = i + 1;
        var myIcon = L.icon({iconUrl: './images/pin0' + pin + '.png'});
        var myImg = './images/pin0' + pin + '.png';
        template += 
        '<li class="col-12 col-sm-6">' +
            '<a class="gmap-marker" data-id="'  + item.id + '"' +
                'data-description="'            + item.description + '"' +
                'data-lat="'                    + item.lat  + '"' + 
                'data-lng="'                    + item.lng + '"' + 
                'data-title="'                  + item.title + '"' +
                'data-url="'                    + item.url + '"' + 
                'data-site-locality="'          + item.site_locality + '"' +
                'data-site-class="'             + item.site_class  + '"' + 
                'href="#"><img alt="'           + item.alt  + '"' + 
                'height="32" src="'             + myImg + '"' +
                'width="32">'                   + item.alt + '"'  +
            '</a>' +
        '</li>';
        
        marker = L.marker([item.lat, item.lng], { icon: myIcon }).addTo(map).bindPopup(item.description);
        markers.push(marker)
        marker.on('click', onMapClick);
    }
    
    template += '</ul>';
    

    playList.html(template);
    function onMapClick(e) {
        map.setView(this._latlng, 8);
        getInforMarker(marker)
    }

    $('a.gmap-marker').each(function () {
        $(this).on('click', function (ev) {
            ev.preventDefault();
            var id = parseInt($(this).data('id').split("-")[1])    
            marker.fire('click', function(e){
                console.log(e)
            });
        })
    })
});



function getInforMarker(marker) {
    let information = $(".infor");
    let title = '(関連資産)';
    let template =
        '<dl>' +
                '<dt><small>${title}</small></dt>' +
                '<dd>' +
                'description' +
                '<a href="#"><span>Read more</span></a>' +
                '</dd>' +
                '<div class="close" > &times;</div>' +
        '</dl>';
    information.html(template)
    information.css('visibility', 'visible')
    $(".close").on('click', function () {
        $(this).closest(".infor").css('visibility', 'hidden')
    });
}
