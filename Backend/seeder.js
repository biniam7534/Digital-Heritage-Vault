const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Load models
const HeritageSite = require('./models/HeritageSite');
const Metric = require('./models/Metric');
const Log = require('./models/Log');

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

const sites = [
    {
        name: 'Lalibela',
        location: 'Amhara Region, Ethiopia',
        description: 'Famous for its 11 monolithic rock-hewn churches, carved out of volcanic tuff. A spiritual center for Ethiopian Christianity.',
        image: 'https://images.unsplash.com/photo-1545620853-93d3b769ea87?auto=format&fit=crop&q=80&w=800',
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
        image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800',
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
        image: 'https://images.unsplash.com/photo-1545620853-294708703310?auto=format&fit=crop&q=80&w=800',
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
        image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&q=80&w=800',
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
];

const logs = [
    { time: '02:14:55', event: 'Lalibela: Nano-Reinforcement Scan Complete', status: 'Verified' },
    { time: '01:45:12', event: 'Axum: Subsurface Seismic Sensor Active', status: 'Stable' },
    { time: '23:12:08', event: 'Simien: Drone Population Count (Walia Ibex)', status: 'Success' },
    { time: '22:30:45', event: 'Harar: Urban Encroachment Alert (West Edge)', status: 'Warning' },
    { time: '21:15:20', event: 'Konso: Climate Adaptation Drain Check', status: 'Operational' },
];

// Import into DB
const importData = async () => {
    try {
        await HeritageSite.deleteMany();
        await Metric.deleteMany();
        await Log.deleteMany();

        await HeritageSite.create(sites);
        await Metric.create(metrics);
        await Log.create(logs);

        console.log('🏛️ Ethiopia Heritage Data Imported...');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

if (process.argv[2] === '-i') {
    importData();
}
