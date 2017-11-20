export default function YandMap() {
  this.elements = document.querySelectorAll('.js-map');
  if(this.elements.length) {
    this.init();
  }
}
YandMap.prototype ={
  init: function() {
    let self = this;
    Array.from(self.elements).forEach((item) => {
      self.getOptions(item);
    });
  },
  getOptions: function(item) {
    let self = this;
    let itemtype = item.dataset.maptype;
    let imagesrc = item.dataset.pinimg;
    let center = [item.dataset.lat,item.dataset.lon];
    let id = item.getAttribute('id');
    itemtype === 'offices' ? self.initMapMulti(id,imagesrc) : self.initMap(id,center,imagesrc);
  },
  initMap: function(id,center,imagesrc) {
    ymaps.ready(() => {
      let myMap ;
      let myPlacemark ;
      myMap = new ymaps.Map(id, {
        center: center,
        zoom: 12,
        controls: ['zoomControl', 'fullscreenControl'],
      },{

      }),
      myPlacemark = new ymaps.Placemark(myMap.getCenter(),{}, {
        iconLayout: 'default#image',
        iconImageHref: imagesrc,
        iconImageSize: [40, 40],
        iconImageOffset: [-20, -40],
      });
      myMap.geoObjects.add(myPlacemark);
    });

  },
  initMapMulti: function(id,imagesrc) {
    ymaps.ready(() => {
      let myMap ;
      let myPlacemark ;
      let clusterer ;
      let getPointData ;
      let getPointOptions ;
      let points ;
      let geoObjects ;
      let searchControl ;

      myMap = new ymaps.Map(id, {
        center: [55.751574, 37.573856],
        zoom: 10,
        controls: ['zoomControl', 'fullscreenControl'],
      }, {
        searchControlProvider: 'yandex#map',
        checkZoomRange: true,
      }),
      /**
         * Создадим кластеризатор, вызвав функцию-конструктор.
         * Список всех опций доступен в документации.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Clusterer.xml#constructor-summary
         */
      clusterer = new ymaps.Clusterer({
        /**
             * Через кластеризатор можно указать только стили кластеров,
             * стили для меток нужно назначать каждой метке отдельно.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/option.presetStorage.xml
             */
        // clusterIcons: [
        //   {
        //     href: 'images/cat.png',
        //     size: [40, 40],
        //     offset: [-20, -20]
        //   },
        //   {
        //     href: 'images/cat2.png',
        //     size: [60, 60],
        //     offset: [-30, -30]
        //   }],
        preset: 'islands#blackClusterIcons',
        groupByCoordinates: false,
        /**
             * Опции кластеров указываем в кластеризаторе с префиксом "cluster".
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ClusterPlacemark.xml
             */
        clusterHideIconOnBalloonOpen: false,
        geoObjectHideIconOnBalloonOpen: false,
        gridSize:128,
        zoomMargin: 60

      }),
      searchControl = new ymaps.control.SearchControl({
        options:{
          noPlacemark: true,
          kind: 'locality',
          suppressYandexSearch: false,
          placeholderContent: 'Введите город'
        }

      });

      /**
         * Функция возвращает объект, содержащий данные метки.
         * Поле данных clusterCaption будет отображено в списке геообъектов в балуне кластера.
         * Поле balloonContentBody - источник данных для контента балуна.
         * Оба поля поддерживают HTML-разметку.
         * Список полей данных, которые используют стандартные макеты содержимого иконки метки
         * и балуна геообъектов, можно посмотреть в документации.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoObject.xml
         */
      getPointData = function(index) {
        return {
          balloonContentHeader: '<font size=3><b><a target="_blank" href="https://yandex.ru">Здесь может быть ваша ссылка</a></b></font>',
          balloonContentBody: '<p>Ваше имя: <input name="login"></p><p>Телефон в формате 2xxx-xxx:  <input></p><p><input type="submit" value="Отправить"></p>',
          balloonContentFooter: '<font size=1>Информация предоставлена: </font> балуном <strong>метки ' + index + '</strong>',
          clusterCaption: 'метка <strong>' + index + '</strong>'
        };
      },
      /**
         * Функция возвращает объект, содержащий опции метки.
         * Все опции, которые поддерживают геообъекты, можно посмотреть в документации.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoObject.xml
         */
      getPointOptions = function() {
        return {
          iconLayout: 'default#image',
          iconImageHref: imagesrc,
          iconImageSize: [40, 40],
          iconImageOffset: [-20, -40],
        };
      },
      points = [
        [55.831903,37.411961], [55.763338,37.565466], [55.763338,37.565466], [55.744522,37.616378], [55.780898,37.642889], [55.793559,37.435983], [55.800584,37.675638], [55.716733,37.589988], [55.775724,37.560840], [55.822144,37.433781], [55.874170,37.669838], [55.716770,37.482338], [55.780850,37.750210], [55.810906,37.654142], [55.865386,37.713329], [55.847121,37.525797], [55.778655,37.710743], [55.623415,37.717934], [55.863193,37.737000], [55.866770,37.760113], [55.698261,37.730838], [55.633800,37.564769], [55.639996,37.539400], [55.690230,37.405853], [55.775970,37.512900], [55.775777,37.442180], [55.811814,37.440448], [55.751841,37.404853], [55.627303,37.728976], [55.816515,37.597163], [55.664352,37.689397], [55.679195,37.600961], [55.673873,37.658425], [55.681006,37.605126], [55.876327,37.431744], [55.843363,37.778445], [55.875445,37.549348], [55.662903,37.702087], [55.746099,37.434113], [55.838660,37.712326], [55.774838,37.415725], [55.871539,37.630223], [55.657037,37.571271], [55.691046,37.711026], [55.803972,37.659610], [55.616448,37.452759], [55.781329,37.442781], [55.844708,37.748870], [55.723123,37.406067], [55.858585,37.484980]
      ],
      geoObjects = [];

      /**
     * Данные передаются вторым параметром в конструктор метки, опции - третьим.
     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Placemark.xml#constructor-summary
     */
      for(var i = 0, len = points.length; i < len; i++) {
        geoObjects[i] = new ymaps.Placemark(points[i], getPointData(i), getPointOptions());
      }

      /**
     * Можно менять опции кластеризатора после создания.
     */


      /**
     * В кластеризатор можно добавить javascript-массив меток (не геоколлекцию) или одну метку.
     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Clusterer.xml#add
     */
      clusterer.add(geoObjects);
      myMap.geoObjects.add(clusterer);
      myMap.controls.add(searchControl);

      /**
     * Спозиционируем карту так, чтобы на ней были видны все объекты.
     */

      myMap.setBounds(clusterer.getBounds(), {
        checkZoomRange: true
      });

    });
  }
};
