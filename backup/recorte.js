//Overlay grouped layers
var baseLayers = {
  'HOT': defaultBase,
  'OSM': L.tileLayer.provider('OpenStreetMap'),
  'HOT':L.tileLayer.provider('OpenStreetMap.HOT'),
  'USGS TNM': L.tileLayer.provider('USGSTNM'),
  'ESRI Imagery': L.tileLayer.provider('Esri.WorldImagery'),
  'ESRI Ocean Basemap': L.tileLayer.provider('Esri.OceanBasemap'),
  'OSM Topo': L.tileLayer.provider('OpenTopoMap')
};


//Using a relative url to call layer instead of http
var CantonesIndivLayer = L.tileLayer.wms('https://geomapa.tk/geoserver/costarica-geoinn/wms?', {
  layers: 'Cantones_de_Costa_Rica',
  format: 'image/png',
  opacity: 0.5,
  tiled: 'true'
});

var options = {
  transparent: 'true',
  format: 'image/png',
  opacity: 0.5,
  tiled: 'true'
  //info_format: 'text/html'
};

//Using a relative url to call layer instead of http
var source = L.WMS.source('https://geomapa.tk/geoserver/costarica-geoinn/wms?', options);
var CantonesLayer = source.getLayer('costarica-geoinn:Cantones_de_Costa_Rica');
var DistritosLayer = source.getLayer('costarica-geoinn:Distritos_de_Costa_Rica');
var ProvinciasLayer = source.getLayer('costarica-geoinn:Provincias_de_Costa_Rica');
var BelenLayer = source.getLayer('costarica-geoinn:Belen_3D_CRTm05');

var source = L.WMS.source('https://geomapa.tk/geoserver/costarica-mep/wms?', options);
var CEPrivados = source.getLayer('costarica-mep:MEP-CEPrivados');
var CEPublicos = source.getLayer('costarica-mep:MEP-CEPublicos');


var groupOverLays = {
  Divisiones: {
    Provincias: ProvinciasLayer,
    Cantones: CantonesLayer,
    Distritos: DistritosLayer,
    Belen: BelenLayer,
  },
  MEP: {
    "Centros Privados": CEPrivados,
    "Centros Públicos": CEPublicos,
  },
};

//add layer switch control
L.control.groupedLayers(baseLayers, groupOverLays).addTo(map);





var overlaysTree = {
  label: 'Capas informativas',
  children:[
      {label: 'Division Territorial',
      //selectAllCheckbox: 'Un/select all',
      children: [
          {label: 'Provincias', layer: ProvinciasLayer, name:'Costa Rica'},
          {label: 'Cantones', layer: CantonesLayer, name:'Costa Rica'},
          {label: 'Distritos', layer: DistritosLayer, name:'Costa Rica'},
          
      ]},
      {label: 'MEP',
      //selectAllCheckbox: 'Un/select all',
      children: [
          {label: 'CE Privados', layer: CEPrivados, name:'Costa Rica'},
          {label: 'CE Publicos', layer: CEPublicos, name:'Costa Rica'},
                          
      ]},
  ]
}