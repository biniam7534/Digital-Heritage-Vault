const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Load models
const Artifact = require('./models/Artifact');
const Metric = require('./models/Metric');
const Prediction = require('./models/Prediction');

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Sample Future Metrics
const metrics = [
    // Smart City Data
    { type: 'city_stat', name: 'population', value: 8.2, year: 2025, category: 'Growth' },
    { type: 'city_stat', name: 'population', value: 8.5, year: 2028, category: 'Growth' },
    { type: 'city_stat', name: 'population', value: 8.9, year: 2031, category: 'Growth' },
    { type: 'city_stat', name: 'population', value: 9.3, year: 2034, category: 'Growth' },
    { type: 'city_stat', name: 'population', value: 9.7, year: 2037, category: 'Growth' },
    { type: 'city_stat', name: 'population', value: 10.1, year: 2040, category: 'Growth' },

    { type: 'city_stat', name: 'energy', value: 35, year: 2025, category: 'Renewable' },
    { type: 'city_stat', name: 'energy', value: 42, year: 2028, category: 'Renewable' },
    { type: 'city_stat', name: 'energy', value: 55, year: 2031, category: 'Renewable' },
    { type: 'city_stat', name: 'energy', value: 70, year: 2034, category: 'Renewable' },
    { type: 'city_stat', name: 'energy', value: 85, year: 2037, category: 'Renewable' },
    { type: 'city_stat', name: 'energy', value: 100, year: 2040, category: 'Renewable' },

    { type: 'city_stat', name: 'automation', value: 15, year: 2025, category: 'AI' },
    { type: 'city_stat', name: 'automation', value: 25, year: 2028, category: 'AI' },
    { type: 'city_stat', name: 'automation', value: 40, year: 2031, category: 'AI' },
    { type: 'city_stat', name: 'automation', value: 60, year: 2034, category: 'AI' },
    { type: 'city_stat', name: 'automation', value: 80, year: 2037, category: 'AI' },
    { type: 'city_stat', name: 'automation', value: 95, year: 2040, category: 'AI' },

    // Global Trends Data
    { type: 'global_trend', name: 'AI Adoption', value: 94, year: 2040, category: '#8884d8' },
    { type: 'global_trend', name: 'Remote Work', value: 78, year: 2040, category: '#82ca9d' },
    { type: 'global_trend', name: 'Climate Index', value: 62, year: 2040, category: '#ffc658' },
    { type: 'global_trend', name: 'Digital Economy', value: 89, year: 2040, category: '#ff8042' },
];

const artifacts = [
    {
        title: 'Egyptian Sarcophagus',
        type: 'Artifact',
        image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&q=80&w=600',
        date: 'New Kingdom (1550–1070 BC)',
        origin: 'Thebes, Egypt',
        description: 'A finely decorated limestone sarcophagus belonging to a high-ranking official, featuring intricate hieroglyphics.',
        status: 'Verified'
    },
    {
        title: 'Medieval Sword',
        type: 'Artifact',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
        date: '14th Century',
        origin: 'Northern Europe',
        description: 'A well-preserved longsword with a wheel pommel and tapered blade, typical of chivalric warfare in the late Middle Ages.',
        status: 'Verified'
    },
    {
        title: 'Historical Document',
        type: 'Document',
        image: 'https://images.unsplash.com/photo-1627916640411-96530664e1f7?auto=format&fit=crop&q=80&w=600',
        date: '12th Century',
        origin: 'Byzantine Empire',
        description: 'A vellum manuscript containing illuminated prayers and administrative records of the imperial court.',
        status: 'Verified'
    },
    {
        title: 'Native Pottery',
        type: 'Artifact',
        image: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&q=80&w=600',
        date: 'Pre-Columbian Era',
        origin: 'South America (Inca)',
        description: 'Polychrome ceramic jar featuring geometric patterns and stylized animal motifs.',
        status: 'Verified'
    }
];

// Import into DB
const importData = async () => {
    try {
        await Artifact.deleteMany();
        await Metric.deleteMany();
        await Prediction.deleteMany();

        await Artifact.create(artifacts);
        await Metric.create(metrics);

        console.log('🏛️ Data Records Imported...');
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

// Delete data
const deleteData = async () => {
    try {
        await Artifact.deleteMany();
        await Metric.deleteMany();
        await Prediction.deleteMany();

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
