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
    },
    {
        name: 'Debre Damo',
        location: 'Tigray Region, Ethiopia',
        description: 'A 6th-century monastery accessible only by climbing a 15-meter rope up a sheer cliff.',
        image: 'https://images.unsplash.com/photo-1545620853-294708703310?auto=format&fit=crop&q=80&w=800', // Update with real URL if needed
        unescoStatus: 'National Heritage',
        history: 'One of the oldest Christian monasteries in Ethiopia, founded by Abuna Aregawi.',
        future2050: {
            preservation: 'Nanofiber ascent cables and localized structural reinforcement safeguard the ancient cliffside dwellings.',
            impact: 'Digital preservation of ancient parchment manuscripts via high-fidelity molecular scanning.',
            tourism: 'Magnetically stabilized visitor platforms allow safe access to the summit.',
        }
    },
    {
        name: 'Erta Ale',
        location: 'Afar Region, Ethiopia',
        description: 'A continuously active basaltic shield volcano in the Danakil Depression, containing a lava lake.',
        image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&q=80&w=800', // Update with real URL if needed
        unescoStatus: 'Geological Wonder',
        history: 'Known as the "Gateway to Hell" by locals, it features one of the few permanent lava lakes in the world.',
        future2050: {
            preservation: 'Thermal energy harvesters dissipate excess heat to protect nearby research outposts.',
            impact: 'Real-time seismic prediction AI monitors tectonic shifts with millimetric precision.',
            tourism: 'Hover-shuttles with thermal shielding provide close-proximity views.',
        }
    },
    {
        name: 'Konso Cultural Landscape',
        location: 'Southern Region, Ethiopia',
        description: 'A 55-square-kilometer arid property featuring stone-walled terraces and fortified settlements.',
        image: 'https://images.unsplash.com/photo-1545620853-93d3b769ea87?auto=format&fit=crop&q=80&w=800', // Update with real URL if needed
        unescoStatus: 'Inscribed in 2011',
        history: 'The Konso people have lived in these fortified highland towns for over 400 years.',
        future2050: {
            preservation: 'Bio-synthetic terrace fillers prevent erosion while maintaining traditional farming aesthetics.',
            impact: 'Smart irrigation networks utilize atmospheric water generators to sustain the landscape.',
            tourism: 'Augmented reality paths show the 400-year evolution of the community.',
        }
    },
    {
        name: 'Yeha Temple',
        location: 'Tigray Region, Ethiopia',
        description: 'The oldest standing structure in Ethiopia, a Great Temple built of massive limestone blocks.',
        image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800',
        unescoStatus: 'National Heritage',
        history: 'Capital of the pre-Aksumite Kingdom of D\'mt, symbolizing deep architectural roots.',
        future2050: {
            preservation: 'Electromagnetic field stabilizers protect blocks from seismic vibration.',
            impact: 'Neural-archaeology reconstructs the lost city from subterranean echoes.',
            tourism: 'Time-dilated VR experiences allow visitors to witness ancient processions.',
        }
    },
    {
        name: 'Simien Mountains',
        location: 'Amhara Region, Ethiopia',
        description: 'Massive erosion over the years has created one of the most spectacular landscapes in the world.',
        image: 'https://images.unsplash.com/photo-1545620853-93d3b769ea87?auto=format&fit=crop&q=80&w=800',
        unescoStatus: 'Inscribed in 1978',
        history: 'Home to the Walia ibex, Gelada baboon, and the Ethiopian wolf.',
        future2050: {
            preservation: 'Climate-controlled biome barriers will protect endangered species.',
            impact: 'Eco-stabilizer clusters prevent soil erosion in high-traffic zones.',
            tourism: 'Anti-gravity observation decks provide 360-degree views.',
        }
    },
    {
        name: 'Tiya',
        location: 'Southern Region, Ethiopia',
        description: 'An archaeological site containing 36 monuments, including 32 carved stelae.',
        image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800',
        unescoStatus: 'Inscribed in 1980',
        history: 'These stelae were erected between the 12th and 14th centuries.',
        future2050: {
            preservation: 'Subsurface molecular bonding will prevent sinking.',
            impact: 'Digital decryption reveals hidden historical records.',
            tourism: 'Holographic reconstruction of the original funerary sites.',
        }
    },
    {
        name: 'Wanchi Crater Lake',
        location: 'Oromia Region, Ethiopia',
        description: 'A beautiful crater lake situated at an altitude of 3,380 meters above sea level.',
        image: 'https://images.unsplash.com/photo-1545620853-294708703310?auto=format&fit=crop&q=80&w=800',
        unescoStatus: 'Natural Heritage',
        history: 'A dormant volcano whose caldera has become a pristine lake sanctuary.',
        future2050: {
            preservation: 'Water purity sensors and automated algae control maintain the ecosystem.',
            impact: 'Smart aquaculture ensures sustainable food sources.',
            tourism: 'Electric submersible vehicles provide eco-friendly exploration.',
        }
    },
    {
        name: 'Sof Omer Cave',
        location: 'Bale, Ethiopia',
        description: 'One of the longest cave systems in Africa, carved by the Weib River.',
        image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&q=80&w=800',
        unescoStatus: 'National Heritage',
        history: 'A sacred site featuring massive limestone pillars and underground passages.',
        future2050: {
            preservation: 'Bioluminescent fungal strains light the passages while maintaining climate.',
            impact: 'Advanced sonar mapping devices monitor structural shifts.',
            tourism: 'Levitating tour platforms allow navigation without touching formations.',
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
