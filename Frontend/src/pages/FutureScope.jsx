import Hero from '../components/Hero';
import SmartCity from '../components/SmartCity';
import Predictor from '../components/Predictor';
import Trends from '../components/Trends';
import Footer from '../components/Footer';

const FutureScope = () => {
    return (
        <div className="bg-futuristic-bg text-white selection:bg-futuristic-accent selection:text-black">
            <Hero />
            <SmartCity />
            <Predictor />
            <Trends />
            <Footer />
        </div>
    );
};

export default FutureScope;
