
$('button').click(function () {
    marker.fire('click');
});
const myItems = [
    ['Sapporo', 43.0618, 141.3545],
    ['Hakodate', 41.7687, 140.7291],
    ['Otaru', 43.1902, 140.9942],
    ['Chitose', 42.8213, 141.6510],
    ['Aomori', 40.8222, 140.7474],
    ['Noboribetsu', 42.4128, 141.1066],
    ['Erimo', 42.0163, 143.1486],
    ['Urakawa', 42.1686, 142.7685]
];

let marker;
var map = L.map('mapid').setView([43.0618, 141.3545], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
}).addTo(map);

for (var i = 0; i < myItems.length; i++) {
    const item = myItems[i];
    var pin = i + 1;
    var myIcon = L.icon({
        iconUrl: './images/pin0' + pin + '.png'
    });
    marker = L.marker([item[1], item[2]], { icon: myIcon }).addTo(map).bindPopup(item[0]);

    marker.on('click', onMapClick);

    function onMapClick(e) {

        var currentZoom = map.getZoom();
        map.setView(e.latlng, 8);
        console.log(e.target._leaflet_id)
        console.log(this._leaflet_id)

        getInforMarker(marker)
    }
}
const getInforMarker = (marker) => {
    let information = $(".infor");
    let title = '(関連資産)';
    let template =
        `<dl>
            <dt><small>TITLE</small></dt>
            <dd>
                description
                <a href="#"><span>Read more</span></a>
            </dd>
            <div class="close" > &times;</div>
        </dl>
        `;
    information.html(template)
    information.css('visibility', 'visible')
    $(".close").on('click', function () {
        $(this).closest(".infor").css('visibility', 'hidden')
    });
}