const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Load models
const HeritageSite = require('./models/HeritageSite');
const Metric = require('./models/Metric');
const Log = require('./models/Log');
const Prediction = require('./models/Prediction');
const Artifact = require('./models/Artifact');

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

const artifacts = [
    {
        title: 'Ge\'ez Manuscript Fragment',
        type: 'Document',
        image: '/images/manuscript.jpg',
        date: '14th Century',
        origin: 'Askumite / Zagwe Era',
        description: 'A well-preserved parchment fragment containing religious hymns written in ancient Ge\'ez.',
        status: 'Verified',
        archivist: 'Digital Sentinel Alpha'
    },
    {
        title: 'Aksumite Gold Coin',
        type: 'Artifact',
        image: '/images/aksum-coin.jpg',
        date: '3rd Century AD',
        origin: 'Kingdom of Aksum',
        description: 'A rare gold coin featuring the profile of King Endubis, the first Aksumite ruler to mint coins.',
        status: 'Verified',
        archivist: 'Main Curator'
    },
    {
        title: 'Traditional Masinqo Audio Record',
        type: 'Audio',
        image: '/images/masinqo.jpg',
        date: '19th Century Style',
        origin: 'Highlands Heritage',
        description: 'A high-fidelity recording of traditional Masinqo patterns used in royal ceremonies.',
        status: 'Archived',
        archivist: 'Acoustic Archivist'
    },
    {
        title: 'Stone Statue of a seated female',
        type: 'Artifact',
        image: '/images/yeha-statue.jpg',
        date: '500 BC',
        origin: 'D\'mt Kingdom',
        description: 'A limestone statue found near the Temple of Yeha, representing the sophisticated pre-Aksumite craftsmanship.',
        status: 'Verified',
        archivist: 'Main Curator'
    },
    {
        title: 'Imperial Decree of Menelik II',
        type: 'Document',
        image: '/images/decree.jpg',
        date: '1896',
        origin: 'Modern Ethiopia',
        description: 'The official mobilization order issued before the Battle of Adwa, preserved on traditional parchment.',
        status: 'Verified',
        archivist: 'National Archivist'
    }
];

const sites = [
    {
        name: 'Lalibela',
        location: 'Amhara Region, Ethiopia',
        description: 'Famous for its 11 monolithic rock-hewn churches, carved out of volcanic tuff. A spiritual center for Ethiopian Christianity.',
        image: '/images/lalibela.jpg',
        unescoStatus: 'World Heritage since 1978',
        history: 'Built during the Zagwe dynasty by King Lalibela to create a "New Jerusalem" in Africa.',
        historicalData: [
            { year: 1978, integrity: 94, threatLevel: 'Low' },
            { year: 2008, integrity: 82, threatLevel: 'Medium' }, // Impact of temporary shelters
            { year: 2021, integrity: 72, threatLevel: 'High' },   // Regional conflict impact
            { year: 2024, integrity: 78, threatLevel: 'Medium' } // Restoration progress
        ],
        riskFactors: [
            { factor: 'Erosion of Volcanic Tuff', severity: 'High' },
            { factor: 'Unregulated Urban Construction', severity: 'Medium' },
            { factor: 'Visual Integrity (Shelters)', severity: 'High' }
        ],
        future2050: {
            preservation: 'AI-monitored climate-resistant nanomaterials will reinforce the volcanic tuff without altering its appearance.',
            impact: 'Real-time structural health monitoring prevents erosion from intensified seasonal rains.',
            tourism: 'Holographic guides and VR overlays allow visitors to see the carving process in real-time.',
        }
    },
    {
        name: 'Axum Obelisks',
        location: 'Tigray Region, Ethiopia',
        description: 'Monumental monolithic stelae marking the center of the ancient Aksumite Empire.',
        image: '/images/aksum-obelisk.jpg',
        unescoStatus: 'World Heritage since 1980',
        history: 'Center of one of the four greatest powers of the ancient world alongside Rome and Persia.',
        historicalData: [
            { year: 1980, integrity: 92, threatLevel: 'Low' },
            { year: 2005, integrity: 88, threatLevel: 'Medium' }, // Return of the Aksum Obelisk
            { year: 2020, integrity: 75, threatLevel: 'High' },   // Conflict-related disruption
            { year: 2024, integrity: 78, threatLevel: 'Medium' } // Resumed conservation
        ],
        riskFactors: [
            { factor: 'Seismic Vulnerability', severity: 'High' },
            { factor: 'Conflict-Related Access', severity: 'High' },
            { factor: 'Foundation Instability', severity: 'Medium' }
        ],
        future2050: {
            preservation: 'Underground seismic stabilizers and localized atmospheric control units protect the granite from micro-cracking.',
            impact: 'Zero-impact foundation supports ensure stability despite urban expansion.',
            tourism: 'Smart glass walkways provide interactive subsurface archaeological views.',
        }
    },
    {
        name: 'Simien Mountains',
        location: 'Amhara Region, Ethiopia',
        description: 'Spectacular landscape with high peaks and deep precipices, home to the Walia ibex and Gelada baboon.',
        image: '/images/simien-mountains.jpg',
        unescoStatus: 'World Heritage since 1978',
        history: 'Removed from the "In Danger" list in 2017 after significant conservation progress.',
        historicalData: [
            { year: 1996, integrity: 65, threatLevel: 'Critical' }, // Added to In-Danger list
            { year: 2017, integrity: 85, threatLevel: 'Low' },      // Removal from In-Danger list
            { year: 2024, integrity: 88, threatLevel: 'Low' }       // Population increases in endemic species
        ],
        riskFactors: [
            { factor: 'Livestock Grazing', severity: 'High' },
            { factor: 'Agricultural Encroachment', severity: 'Medium' },
            { factor: 'Invasive Infrastructure', severity: 'Low' }
        ],
        future2050: {
            preservation: 'Climate-controlled biome barriers will protect endangered species from high-altitude temperature shifts.',
            impact: 'Eco-stabilizer clusters prevent soil erosion in high-traffic climbing zones.',
            tourism: 'Anti-gravity observation decks provide 360-degree views without touching the delicate terrain.',
        }
    },
    {
        name: 'Harar Jugol',
        location: 'Harari Region, Ethiopia',
        description: 'The fortified historic town, considered the "fourth holiest city of Islam."',
        image: '/images/harar.jpg',
        unescoStatus: 'World Heritage since 2006',
        history: 'A center of Islamic learning and a hub for trade in the Horn of Africa for centuries.',
        historicalData: [
            { year: 2006, integrity: 90, threatLevel: 'Low' },
            { year: 2016, integrity: 82, threatLevel: 'Medium' }, // Urban fabric degradation
            { year: 2024, integrity: 76, threatLevel: 'High' }    // Encroachment from new construction
        ],
        riskFactors: [
            { factor: 'Urban Encroachment', severity: 'High' },
            { factor: 'Waste Management', severity: 'Medium' },
            { factor: 'Modern Building Materials', severity: 'Medium' }
        ],
        future2050: {
            preservation: 'Bio-regenerative materials will strengthen the historic walls while allowing the structure to "breathe".',
            impact: 'Smart drainage networks prevent water damage from rising groundwater levels.',
            tourism: 'Digital twins enabled Global researchers to study Harari architecture remotely.',
        }
    },
    {
        name: 'Fasil Ghebbi',
        location: 'Gondar, Amhara Region',
        description: 'The fortress-city known as the "Camelot of Africa," featuring castles and palaces of the 16th and 17th centuries.',
        image: '/images/fasil-ghebbi.webp',
        unescoStatus: 'World Heritage since 1979',
        history: 'Founded by Emperor Fasilides, it served as the residence of Ethiopian emperors for over 200 years.',
        historicalData: [
            { year: 1979, integrity: 95, threatLevel: 'Low' },
            { year: 2010, integrity: 88, threatLevel: 'Medium' },
            { year: 2024, integrity: 82, threatLevel: 'Medium' }
        ],
        riskFactors: [
            { factor: 'Structural Decay', severity: 'Medium' },
            { factor: 'Vegetation Growth', severity: 'Medium' },
            { factor: 'Urban Pressure', severity: 'Low' }
        ],
        future2050: {
            preservation: 'Nano-structural stabilization will reinforce the stone masonry without altering the historical aesthetics.',
            impact: 'Passive cooling systems and moisture controls protect the internal wall paintings from decay.',
            tourism: 'Augmented reality "Ghost Windows" show the daily life of the royal court in the 17th century.',
        }
    },
    {
        name: 'Tiya Stelae',
        location: 'Central Ethiopia',
        description: 'An archaeological site containing 36 monuments, including 32 carved stelae with mysterious symbols.',
        image: '/images/tiya.jpg',
        unescoStatus: 'World Heritage since 1980',
        history: 'The stelae mark a prehistoric burial complex, representing an ancient Ethiopian culture whose origin is still debated.',
        historicalData: [
            { year: 1980, integrity: 98, threatLevel: 'Low' },
            { year: 2024, integrity: 92, threatLevel: 'Low' }
        ],
        riskFactors: [
            { factor: 'Weathering', severity: 'Medium' },
            { factor: 'Lichen Growth', severity: 'Low' }
        ],
        future2050: {
            preservation: 'Molecular bonding agents prevent further weathering of the soft stone engravings.',
            impact: 'Deep-ground stabilization protects the stelae from soil shifting during extreme rainy seasons.',
            tourism: 'LiDAR-assisted 3D projections reveal the hidden engravings that have faded over millennia.',
        }
    },
    {
        name: 'Konso Landscape',
        location: 'Southern Ethiopia',
        description: 'A spectacular cultural landscape featuring massive stone-walled terraces and fortified settlements.',
        image: '/images/konso.jpg',
        unescoStatus: 'World Heritage since 2011',
        history: 'A living tradition representing the Konso people\'s adaptation to a dry, hostile environment over 400 years.',
        historicalData: [
            { year: 2011, integrity: 94, threatLevel: 'Low' },
            { year: 2024, integrity: 88, threatLevel: 'Medium' }
        ],
        riskFactors: [
            { factor: 'Soil Erosion', severity: 'High' },
            { factor: 'Social Change', severity: 'Medium' }
        ],
        future2050: {
            preservation: 'AI-driven irrigation management maintains the terrace integrity through precise water distribution.',
            impact: 'Biodegradable geo-textiles prevent soil erosion while supporting the traditional stone walls.',
            tourism: 'Virtual eco-trails allow visitors to experience Konso agricultural traditions without disrupting the community.',
        }
    },
    {
        name: 'Debre Damo',
        location: 'Tigray Region, Ethiopia',
        description: 'A 6th-century monastery built on a flat-top mountain, accessible only by climbing a 15-meter rope.',
        image: '/images/debre-damo.jpg',
        unescoStatus: 'Historical Cultural Site',
        history: 'One of the oldest monasteries in Ethiopia, featuring a unique Aksumite architectural style.',
        historicalData: [
            { year: 1990, integrity: 98, threatLevel: 'Low' },
            { year: 2024, integrity: 90, threatLevel: 'Medium' }
        ],
        riskFactors: [
            { factor: 'Accessibility Damage', severity: 'Low' },
            { factor: 'Erosion', severity: 'Medium' }
        ],
        future2050: {
            preservation: 'Micro-climate control inside the stone church preserves ancient parchment manuscripts.',
            impact: 'Invisible solar-powered rope lifts provide safer access for conservation teams.',
            tourism: 'Remote drone-captured VR tours allow those unable to climb to experience the summit architecture.',
        }
    },
    {
        name: 'Erta Ale',
        location: 'Afar Region, Ethiopia',
        description: 'A continuously active shield volcano in the Danakil Depression, featuring a persistent lava lake.',
        image: '/images/erta-ale.jpg',
        unescoStatus: 'Natural Heritage Site',
        history: 'Known as the "Smoking Mountain" by the Afar people, it is one of the most unique geological sites on Earth.',
        historicalData: [
            { year: 2000, integrity: 100, threatLevel: 'Low' },
            { year: 2024, integrity: 95, threatLevel: 'Low' }
        ],
        riskFactors: [
            { factor: 'Lava Overflow', severity: 'High' },
            { factor: 'Toxic Gas Release', severity: 'Medium' }
        ],
        future2050: {
            preservation: 'Thermal energía harvesting from the volcano powers local geothermal conservation hubs.',
            impact: 'Real-time seismic and volcanic flow sensors provide 100% accurate prediction of activity.',
            tourism: 'Anti-heat shielding allows eco-tourists to view the lava lake from safe, air-conditioned pods.',
        }
    },
    {
        name: 'Temple of Yeha',
        location: 'Tigray Region, Ethiopia',
        description: 'The oldest standing structure in Ethiopia, dating back to at least the 7th century BC.',
        image: '/images/yeha-temple.jpg',
        unescoStatus: 'Archaeological Heritage',
        history: 'A grand temple of the D\'mt kingdom, predating the Aksumite Empire by several centuries.',
        historicalData: [
            { year: 1900, integrity: 85, threatLevel: 'Medium' },
            { year: 2024, integrity: 92, threatLevel: 'Low' } // Successful restoration
        ],
        riskFactors: [
            { factor: 'Oxidation', severity: 'Medium' },
            { factor: 'Structural Vibrations', severity: 'Low' }
        ],
        future2050: {
            preservation: 'Chemical vapor deposition creates an invisible shield against acid rain and oxidation.',
            impact: 'Precision laser-reconstruction fills in structural gaps with material indistinguishable from the original stone.',
            tourism: 'Interactive sand-projections recreate the ancient city of Yeha during its peak.',
        }
    },
    {
        name: 'Wanchi Crater Lake',
        location: 'Oromia Region, Ethiopia',
        description: 'A breathtaking crater lake at 3,380m altitude, with an island monastery and lush greenery.',
        image: '/images/wanchi.jpg',
        unescoStatus: 'Natural & Cultural Site',
        history: 'An extinct volcanic crater that has become a center of nature and spirituality for centuries.',
        historicalData: [
            { year: 1950, integrity: 98, threatLevel: 'Low' },
            { year: 2024, integrity: 96, threatLevel: 'Low' }
        ],
        riskFactors: [
            { factor: 'Water Pollution', severity: 'Medium' },
            { factor: 'Deforestation', severity: 'Medium' }
        ],
        future2050: {
            preservation: 'Smart-water sensors maintain the pH balance of the lake to protect endemic aquatic life.',
            impact: 'Carbon-negative transport systems and zip-lines replace traditional high-impact trails.',
            tourism: 'Underwater glass tunnels provide a view into the volcanic origins of the lake.',
        }
    },
    {
        name: 'Sof Omer Caves',
        location: 'Bale, Oromia Region',
        description: 'One of the longest and most spectacular cave systems in Africa, carved by the Web River.',
        image: '/images/sof-omer.jpg',
        unescoStatus: 'Natural Heritage',
        history: 'A sacred site for both nature lovers and religious pilgrims, formed over millions of years.',
        historicalData: [
            { year: 2000, integrity: 94, threatLevel: 'Low' },
            { year: 2024, integrity: 88, threatLevel: 'Medium' }
        ],
        riskFactors: [
            { factor: 'Siltation', severity: 'High' },
            { factor: 'Unregulated Tourism', severity: 'Medium' }
        ],
        future2050: {
            preservation: 'Bio-luminescent fungi are used for low-impact, natural lighting along tourist paths.',
            impact: 'Flood-diversion AI protects the limestone formations from excessive river surges.',
            tourism: 'Sonic-mapping guides provide a surround-sound historical narration of the cave\'s formation.',
        }
    }
];

const metrics = [
    { type: 'climate_risk', label: 'Climate Risk Level', value: 68 },
    { type: 'urbanization_impact', label: 'Urbanization Impact', value: 42 },
    { type: 'tourism_pressure', label: 'Tourism Pressure', value: 89 },
    { type: 'preservation_progress', label: '2018', value: 35, year: 2018 },
    { type: 'preservation_progress', label: '2019', value: 48, year: 2019 },
    { type: 'preservation_progress', label: '2020', value: 62, year: 2020 },
    { type: 'preservation_progress', label: '2021', value: 58, year: 2021 },
    { type: 'preservation_progress', label: '2022', value: 75, year: 2022 },
    { type: 'preservation_progress', label: '2023', value: 82, year: 2023 },
    { type: 'preservation_progress', label: '2024', value: 94, year: 2024 },
    // Future City Stats for Simulation
    { type: 'city_stat', name: 'population', value: 1.2, year: 2025 },
    { type: 'city_stat', name: 'energy', value: 45, year: 2025 },
    { type: 'city_stat', name: 'automation', value: 30, year: 2025 },
    { type: 'city_stat', name: 'population', value: 1.5, year: 2028 },
    { type: 'city_stat', name: 'energy', value: 55, year: 2028 },
    { type: 'city_stat', name: 'automation', value: 45, year: 2028 },
    { type: 'city_stat', name: 'population', value: 1.9, year: 2031 },
    { type: 'city_stat', name: 'energy', value: 68, year: 2031 },
    { type: 'city_stat', name: 'automation', value: 60, year: 2031 },
    { type: 'city_stat', name: 'population', value: 2.4, year: 2034 },
    { type: 'city_stat', name: 'energy', value: 82, year: 2034 },
    { type: 'city_stat', name: 'automation', value: 75, year: 2034 },
    { type: 'city_stat', name: 'population', value: 3.1, year: 2037 },
    { type: 'city_stat', name: 'energy', value: 94, year: 2037 },
    { type: 'city_stat', name: 'automation', value: 88, year: 2037 },
    { type: 'city_stat', name: 'population', value: 4.0, year: 2040 },
    { type: 'city_stat', name: 'energy', value: 100, year: 2040 },
    { type: 'city_stat', name: 'automation', value: 98, year: 2040 },
];

const logs = [
    { time: '02:14:55', event: 'Lalibela: Nano-Reinforcement Scan Complete', status: 'Verified' },
    { time: '01:45:12', event: 'Axum: Subsurface Seismic Sensor Active', status: 'Stable' },
    { time: '23:12:08', event: 'Simien: Drone Population Count (Walia Ibex)', status: 'Success' },
    { time: '22:30:45', event: 'Harar: Urban Encroachment Alert (West Edge)', status: 'Warning' },
    { time: '21:15:20', event: 'Konso: Climate Adaptation Drain Check', status: 'Operational' },
    { time: '20:44:33', event: 'Fasil Ghebbi: Wall Moisture Level — Within Threshold', status: 'Stable' },
    { time: '19:58:17', event: 'Tiya Stelae: Lichen Growth Detected on Stelae #14', status: 'Warning' },
    { time: '18:30:02', event: 'Debre Damo: Manuscript Climate Chamber — Optimal', status: 'Verified' },
    { time: '17:22:49', event: 'Erta Ale: Seismic Activity Spike Detected (2.1 Mag)', status: 'Alert' },
    { time: '16:05:11', event: 'Temple of Yeha: UV Oxidation Shield Integrity Check', status: 'Operational' },
    { time: '14:48:38', event: 'Wanchi Crater Lake: pH Sensor Reading — 7.2 (Normal)', status: 'Success' },
    { time: '13:31:55', event: 'Sof Omer Caves: Flood-Diversion AI Calibration Run', status: 'Operational' },
];

// Import into DB
const importData = async () => {
    try {
        await HeritageSite.deleteMany();
        await Metric.deleteMany();
        await Log.deleteMany();
        await Prediction.deleteMany();
        await Artifact.deleteMany();

        const createdSites = await HeritageSite.create(sites);
        await Metric.create(metrics);
        await Log.create(logs);
        await Artifact.create(artifacts);

        // Create dynamic predictions for ALL sites
        const allPredictions = createdSites.map(site => {
            const currentIntegrity = site.historicalData[site.historicalData.length - 1].integrity;
            return {
                siteId: site._id,
                siteName: site.name,
                projection: [
                    { year: 2025, integrity: currentIntegrity },
                    { year: 2030, integrity: Math.max(0, currentIntegrity - Math.floor(Math.random() * 5)) },
                    { year: 2040, integrity: Math.max(0, currentIntegrity - Math.floor(Math.random() * 10)) },
                    { year: 2050, integrity: Math.max(0, currentIntegrity - Math.floor(Math.random() * 15)) }
                ],
                riskFactors: site.riskFactors
            };
        });

        await Prediction.create(allPredictions);

        console.log('🏛️ Ethiopia Heritage Data & Predictions Imported...');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

if (process.argv[2] === '-i') {
    importData();
}
