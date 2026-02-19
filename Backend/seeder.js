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
        description: 'Famous for its 11 monolithic rock-hewn churches, carved out of volcanic tuff in the 12th century.',
        image: 'https://images.unsplash.com/photo-1545620853-93d3b769ea87?auto=format&fit=crop&q=80&w=800',
        unescoStatus: 'Inscribed in 1978',
        history: 'Built during the reign of Saint Gebre Mesqel Lalibela, who sought to recreate Jerusalem in Ethiopia.',
        future2050: {
            preservation: 'AI-monitored climate-resistant nanomaterials will reinforce the volcanic tuff without altering its appearance.',
            impact: 'Real-time structural health monitoring prevents erosion from intensified seasonal rains.',
            tourism: 'Holographic guides and VR overlays allow visitors to see the carving process in real-time.',
        }
    },
    {
        name: 'Axum Obelisks',
        location: 'Tigray Region, Ethiopia',
        description: 'Towering monolithic stelae dating back to the 4th century, marking the tombs of ancient kings.',
        image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800',
        unescoStatus: 'Inscribed in 1980',
        history: 'The center of the Aksumite Empire, one of the four great powers of the ancient world alongside Rome and Persia.',
        future2050: {
            preservation: 'Underground seismic stabilizers and localized atmospheric control units protect the granite from micro-cracking.',
            impact: 'Zero-impact foundation supports ensure stability despite urban expansion.',
            tourism: 'Smart glass walkways provide interactive subsurface archaeological views.',
        }
    },
    {
        name: 'Fasil Ghebbi',
        location: 'Gondar, Ethiopia',
        description: 'The fortress-city of Emperor Fasilides, blending Ethiopian, Hindu, and Arab architectural styles.',
        image: 'https://images.unsplash.com/photo-1545620853-294708703310?auto=format&fit=crop&q=80&w=800',
        unescoStatus: 'Inscribed in 1979',
        history: 'Served as the residence of the Ethiopian emperors during the 17th and 18th centuries.',
        future2050: {
            preservation: 'Automated drone swarms provide 24/7 maintenance and restoration using period-accurate synthetic stone.',
            impact: 'Solar-powered climate management systems regulate humidity within the banquet halls.',
            tourism: 'Neural-linked historical reenactments offer immersive glimpses into court life.',
        }
    },
    {
        name: 'Harar Jugol',
        location: 'Harari Region, Ethiopia',
        description: 'The fortified historic town, considered the fourth holiest city of Islam, with 110 mosques and 102 shrines.',
        image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&q=80&w=800',
        unescoStatus: 'Inscribed in 2006',
        history: 'Founded between the 7th and 11th centuries, it became a major commercial hub and center of Islamic learning.',
        future2050: {
            preservation: 'Bio-regenerative materials will strengthen the historic walls while allowing the structure to "breathe".',
            impact: 'Smart drainage networks prevent water damage from rising groundwater levels.',
            tourism: 'Digital twins of the entire city enable global researchers to study Harari architecture remotely.',
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
    { time: '02:14:55', event: 'Lalibela: Structural Scan Complete', status: 'Verified' },
    { time: '01:45:12', event: 'Axum: Atmospheric Adjust Opt', status: 'Active' },
    { time: '23:12:08', event: 'Fasil: Drone Swarm Replenish', status: 'Maintenance' },
    { time: '22:30:45', event: 'Harar: Ground Moisture Alert', status: 'Warning' },
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
    }
};

// Delete data
const deleteData = async () => {
    try {
        await HeritageSite.deleteMany();
        await Metric.deleteMany();
        await Log.deleteMany();

        console.log('🧹 Data Records Wiped...');
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}
