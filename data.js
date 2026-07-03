const storyScenes = [
  {
    id: 1,
    title: "August 2025: A Season of Extremes",
    text: "Since the monsoon season began in June 2025, Pakistan had already received 50% more rainfall than the same period the previous year. Then, on the morning of August 15, the sky over Khyber Pakhtunkhwa opened in a way few had seen before.",
    coordinates: [30.3753, 69.3451],
    zoom: 5,
    marker: null
  },
  {
    id: 2,
    title: "The Cloudburst Begins",
    text: "In Buner district, more than 150mm (6 inches) of rain fell within a single hour — a rare and violent phenomenon called a cloudburst. Officials later said no forecasting system in the world could have predicted its exact time or location.",
    coordinates: [34.5114, 72.4839],
    zoom: 9,
    marker: { lat: 34.5114, lng: 72.4839, label: "Buner — Cloudburst epicenter" }
  },
  {
    id: 3,
    title: "Beshonai Village, Wiped Out",
    text: "In the village of Beshonai — home to more than 80 households — torrents of mud, water, and boulders swept down the mountainside. Survivors described the thunder as so loud, they thought the world was ending.",
    coordinates: [34.50, 72.45],
    zoom: 15,
    useSatellite: true,
    satelliteDate: "2026-06-01",
    marker: { lat: 34.50, lng: 72.45, label: "Beshonai — village destroyed" },
    hospitals: [
      { lat: 34.4968, lng: 72.4630, name: "DHQ Hospital Daggar", city: "Buner" },
      { lat: 34.7717, lng: 72.3609, name: "Saidu Teaching Hospital", city: "Swat" },
      { lat: 34.90, lng: 72.65, name: "DHQ Hospital Alpuri", city: "Shangla" },
      { lat: 34.1986, lng: 72.0404, name: "Mardan Medical Complex", city: "Mardan" }
    ]
  },
  {
    id: 4,
    title: "207 Lives Lost in 48 Hours",
    text: "Buner alone recorded 207 to 208 deaths within two days — the highest toll of any district. Rescue teams worked through collapsed homes, searching for survivors amid the debris.",
    coordinates: [34.5114, 72.4839],
    zoom: 10,
    marker: { lat: 34.5114, lng: 72.4839, label: "Buner — 207+ deaths" }
  },
  {
    id: 5,
    title: "The Disaster Spreads",
    text: "The flooding wasn't contained to Buner. Emergency was declared across eight districts: Bajaur, Swat, Shangla, Mansehra, Torghar, Upper & Lower Dir, and Battagram — each battling their own flash floods and landslides.",
    coordinates: [34.7, 72.3],
    zoom: 7,
    markers: [
      { lat: 34.58, lng: 71.53, label: "Bajaur" },
      { lat: 34.77, lng: 72.36, label: "Swat" },
      { lat: 34.88, lng: 72.75, label: "Shangla" },
      { lat: 34.33, lng: 73.20, label: "Mansehra" },
      { lat: 34.68, lng: 73.02, label: "Battagram" },
      { lat: 34.59, lng: 72.86, label: "Torghar" }
    ]
  },
  {
    id: 6,
    title: "Tragedy During Rescue",
    text: "As relief operations raced across the province, a provincial government helicopter crashed in Mohmand district while responding to the crisis — killing all 5 crew members onboard. The rescue effort itself had become dangerous.",
    coordinates: [34.53, 71.29],
    zoom: 10,
    marker: { lat: 34.53, lng: 71.29, label: "Mohmand — Helicopter crash" }
  },
  {
    id: 7,
    title: "Why Buner? The Terrain Behind the Tragedy",
    text: "Buner's geography made it uniquely vulnerable: steep slopes funneling into narrow valleys, loose erosion-prone soil, and years of deforestation. When the rain came, the mountains had nowhere to send it but down — fast.",
    coordinates: [34.5114, 72.4839],
    zoom: 10,
    marker: { lat: 34.5114, lng: 72.4839, label: "Buner — vulnerable terrain" }
  },
  {
    id: 8,
    title: "The Final Toll",
    text: "By the time the rains eased, at least 337 people had died across northern Pakistan. Eight districts remained under a state of emergency until August 31. It was one of the deadliest cloudburst-triggered disasters in the country's history.",
    coordinates: [34.7, 72.3],
    zoom: 7,
    markers: [
      { lat: 34.5114, lng: 72.4839, label: "Buner — 207+ deaths" },
      { lat: 34.58, lng: 71.53, label: "Bajaur" },
      { lat: 34.77, lng: 72.36, label: "Swat" },
      { lat: 34.88, lng: 72.75, label: "Shangla" },
      { lat: 34.33, lng: 73.20, label: "Mansehra" },
      { lat: 34.68, lng: 73.02, label: "Battagram" },
      { lat: 34.53, lng: 71.29, label: "Mohmand" },
      { lat: 34.59, lng: 72.86, label: "Torghar" }
    ]
  }
];