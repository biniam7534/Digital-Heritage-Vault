const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Load models
const Artifact = require('./models/Artifact');

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Sample Data
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
        await Artifact.create(artifacts);
        console.log('🏛️  Heritage Records Imported...');
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

// Delete data
const deleteData = async () => {
    try {
        await Artifact.deleteMany();
        console.log('🧹 Heritage Records Wiped...');
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
