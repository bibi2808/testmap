$(function () {
    let mymap = L.map('mapid').setView([41.957687010888, 140.92544496059], 7);
    let playList = $(".list_markers");
    let template, m;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    }).addTo(mymap);

    let markers = [
        {
            id: 2,
            description: "2",
            lat: 42.402222222222,
            lng: 140.91166666667,
            title: "北黄金貝塚",
            url: "https://jomon-japan.unifiedx.dev/learn/jomon-sites/kitakogane",
            site_locality: "伊達市",
            site_class: "core",
            alt: "北黄金貝塚",

        },
        {
            id: 3,
            description: "3",
            lat: 41.957687010888,
            lng: 140.92544496059,
            title: "大船遺跡",
            url: "https://jomon-japan.unifiedx.dev/learn/jomon-sites/ofune",
            site_locality: "函館市",
            site_class: "core",
            alt: "大船遺跡"
        },
        {
            id: 4,
            description: "4",
            lat: 42.542777777778,
            lng: 140.77527777778,
            title: "入江貝塚",
            url: "https://jomon-japan.unifiedx.dev/learn/jomon-sites/irie",
            site_locality: "洞爺湖町",
            site_class: "core",
            alt: "入江貝塚"
        },
        {
            id: 5,
            description: "5",
            lat: 42.885547618541,
            lng: 141.71614408493,
            title: "chitosei",
            url: "https://jomon-japan.unifiedx.dev/learn/jomon-sites/irie",
            site_locality: "千歳市",
            site_class: "core",
            alt: "chitosei"
        },
        {
            id: 6,
            description: "6",
            lat: 42.113333333333,
            lng: 140.53,
            title: "キウス周堤墓群",
            url: "https://jomon-japan.unifiedx.dev/learn/jomon-sites/irie",
            site_locality: "千歳市",
            site_class: "core",
            alt: "キウス周堤墓群"
        },
        {
            id: 7,
            description: "hakodate",
            lat: 41.77583,
            lng: 140.73667,
            title: "hakodate",
            url: "https://jomon-japan.unifiedx.dev/learn/jomon-sites/irie",
            site_locality: "千歳市",
            site_class: "core",
            alt: "hakodate"
        },
        {
            id: 8,
            description: "aomori",
            lat: 40.757984,
            lng: 140.432846,
            title: "aomori",
            url: "https://jomon-japan.unifiedx.dev/learn/jomon-sites/irie",
            site_locality: "千歳市",
            site_class: "core",
            alt: "aomori"
        }

    ];

    let fg = L.featureGroup().addTo(mymap);

    template = '<ul>';
    for (let i = 0; i < markers.length; ++i) {
        const item = markers[i];
        let pin = i + 1;

        let myIcon = L.icon(
            {
                iconUrl: './images/pin0' + pin + '.png',
                iconSize: [30, 30],
                iconAnchor: [5, 5]
            });
        let myImg = './images/pin0' + pin + '.png';
        m = L.marker([item.lat, item.lng], { icon: myIcon, id: item.id });
        fg.addLayer(m);
        template +=
            '<li class="col-12 col-sm-6">' +
            '<a class="gmap-marker" data-id="' + item.id + '"' +
            'data-description="' + item.description + '"' +
            'data-lat="' + item.lat + '"' +
            'data-lng="' + item.lng + '"' +
            'data-title="' + item.title + '"' +
            'data-url="' + item.url + '"' +
            'data-site-locality="' + item.site_locality + '"' +
            'data-site-class="' + item.site_class + '"' +
            'href="#"><img alt="' + item.alt + '"' +
            'height="32" src="' + myImg + '"' +
            'width="32">' + item.alt +
            '</a>' +
            '</li>';
        m.on('click', function () {
            if (newMarker !== "") {
                // existing 
                oldMarker = newMarker;
                newMarker = this;
                setIcon(newMarker, [50, 50], true)
                setIcon(oldMarker, [25, 25], false);
            } else {
                // start
                newMarker = this;
                setIcon(newMarker, [50, 50], true)
            }
            getInforMarker(item);
        });
    }
    template += '</ul>';
    playList.html(template);

    let oldMarker = "", newMarker = "";

    //Link on the same marker
    $(".gmap-marker").each(function () {
        $(this).on('click', function (ev) {
            ev.preventDefault();
            let data = {
                id: this.getAttribute("data-id"),
                description: this.getAttribute("data-description"),
                lat: this.getAttribute("data-lat"),
                lng: this.getAttribute("data-lng"),
                title: this.getAttribute("data-title"),
                url: this.getAttribute("data-url"),
                site_locality: this.getAttribute("data-site-locality")
            }
            fg.eachLayer(function (layer) {
                if (layer.options.id && layer.options.id == data.id) {
                    newMarker = layer;
                    setIcon(layer, [50, 50], true);
                    getInforMarker(data);
                } else {
                    setIcon(layer, [25, 25], false);
                }
            });
        })
    })

    // SET ICON
    function setIcon(element, sizeIcon, option = null) {
        if (option) {
            mymap.setView(element._latlng, 8, {
                "animate": true,
                "pan": {
                    "duration": 0.5
                }
            });
        }
        var customIcon = L.icon({
            iconUrl: element.options.icon.options.iconUrl,
            iconSize: sizeIcon
        });
        element.setIcon(customIcon);
    }

    // CREATE FORM CONTENT FOR MARKER
    function getInforMarker(item) {
        console.log(item);
        let information = $(".infor");
        let title = ('assoc' === item.site_class) ? `${item.title} (関連資産)` : `${item.title}`;
        let template =
            `<dl>
                    <dt>${title} <small>${item.site_locality}</small></dt>
                    <dd>
                        ${item.description}
                        <a href="${item.url}"><span>Read more</span></a>
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
})