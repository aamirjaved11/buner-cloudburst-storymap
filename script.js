// ---- 1. Create the map ----
const map = L.map('map', {
  zoomControl: false,
  scrollWheelZoom: false,
  dragging: true
}).setView(storyScenes[0].coordinates, storyScenes[0].zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

function createSatelliteLayer(dateStr) {
  return L.tileLayer(
    `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/${dateStr}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`,
    {
      attribution: 'Imagery &copy; NASA EOSDIS GIBS',
      maxZoom: 9,
      tileSize: 256
    }
  );
}

let satelliteLayer = null;
let markerLayer = L.layerGroup().addTo(map);

const textPanel = document.getElementById('text-panel');

storyScenes.forEach((scene, index) => {
  const sceneDiv = document.createElement('div');
  sceneDiv.className = 'scene';
  sceneDiv.id = `scene-${scene.id}`;

  sceneDiv.innerHTML = `
    <div class="scene-content">
      <span class="scene-number">${index + 1} / ${storyScenes.length}</span>
      <h3>${scene.title}</h3>
      <p>${scene.text}</p>
    </div>
  `;

  textPanel.appendChild(sceneDiv);
});

function addMarker(markerData) {
  L.circleMarker([markerData.lat, markerData.lng], {
    radius: 8,
    color: '#fff',
    weight: 2,
    fillColor: '#d73027',
    fillOpacity: 0.9
  })
  .bindPopup(`<b>${markerData.label}</b>`)
  .addTo(markerLayer);
}

function activateScene(scene) {
  map.flyTo(scene.coordinates, scene.zoom, { duration: 1.5 });

  markerLayer.clearLayers();

  if (scene.useSatellite) {
    if (satelliteLayer) map.removeLayer(satelliteLayer);
    satelliteLayer = createSatelliteLayer(scene.satelliteDate);
    satelliteLayer.addTo(map);
  } else {
    if (satelliteLayer) {
      map.removeLayer(satelliteLayer);
      satelliteLayer = null;
    }
  }

  if (scene.marker) addMarker(scene.marker);
  if (scene.markers) scene.markers.forEach(m => addMarker(m));

  document.querySelectorAll('.scene-content').forEach(el => {
    el.classList.remove('active');
  });
  const activeEl = document.querySelector(`#scene-${scene.id} .scene-content`);
  if (activeEl) activeEl.classList.add('active');
}

let hospitalLayer = L.layerGroup().addTo(map);

function showHospitals(originLat, originLng, hospitals) {
  hospitalLayer.clearLayers();

  const sidebar = document.getElementById('hospital-sidebar');
  const list = document.getElementById('hospital-list');
  list.innerHTML = '';

  if (!hospitals || hospitals.length === 0) {
    sidebar.style.display = 'none';
    return;
  }

  sidebar.style.display = 'block';

  const origin = L.latLng(originLat, originLng);

  const hospitalsWithDistance = hospitals.map(h => {
    const hospitalPoint = L.latLng(h.lat, h.lng);
    const distanceKm = origin.distanceTo(hospitalPoint) / 1000;
    const timeMinutes = (distanceKm / 35) * 60;
    return { ...h, distanceKm, timeMinutes };
  });

  hospitalsWithDistance.sort((a, b) => a.distanceKm - b.distanceKm);
  const lastIndex = hospitalsWithDistance.length - 1;

  hospitalsWithDistance.forEach((h, index) => {
    const isNearest = index === 0;
    const isFarthest = index === lastIndex;

    let lineColor = '#3388ff';
    if (isNearest) lineColor = '#2ca02c';
    if (isFarthest) lineColor = '#d73027';

    L.polyline([[originLat, originLng], [h.lat, h.lng]], {
      color: lineColor,
      weight: isNearest ? 3 : 2
    }).addTo(hospitalLayer);

    L.circleMarker([h.lat, h.lng], {
      radius: 7,
      color: '#fff',
      weight: 2,
      fillColor: lineColor,
      fillOpacity: 0.9
    })
    .bindPopup(`<b>${h.name}</b><br>${h.city}<br>${h.distanceKm.toFixed(1)} km (~${Math.round(h.timeMinutes)} min)`)
    .addTo(hospitalLayer);

    const li = document.createElement('li');
    if (isNearest) li.className = 'nearest';
    li.innerHTML = `
      <span class="h-name">${isNearest ? '🟢 ' : isFarthest ? '🔴 ' : '🔵 '}${h.name} (${h.city})</span>
      <span class="h-dist">${h.distanceKm.toFixed(1)} km — approx ${Math.round(h.timeMinutes)} min drive</span>
    `;
    list.appendChild(li);
  });
}

const sceneElements = document.querySelectorAll('.scene');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const sceneId = parseInt(entry.target.id.replace('scene-', ''));
      const scene = storyScenes.find(s => s.id === sceneId);
      if (scene) activateScene(scene);
    }
  });
}, { threshold: 0.5 });

sceneElements.forEach(el => observer.observe(el));

const beshonaiScene = storyScenes.find(s => s.id === 3);
if (beshonaiScene && beshonaiScene.hospitals && beshonaiScene.marker) {
  showHospitals(beshonaiScene.marker.lat, beshonaiScene.marker.lng, beshonaiScene.hospitals);
}

activateScene(storyScenes[0]);

const introMap = L.map('intro-map', {
  zoomControl: false,
  dragging: false,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  touchZoom: false,
  boxZoom: false,
  keyboard: false,
  attributionControl: false
}).setView([30.3753, 69.3451], 5);

createSatelliteLayer('2026-06-01').addTo(introMap);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.getElementById('progress-bar').style.width = `${progress}%`;
});

window.addEventListener('load', () => {
  setTimeout(() => {
    map.invalidateSize();
    introMap.invalidateSize();
  }, 300);
});