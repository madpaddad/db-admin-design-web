import Footer from '../component/footer'
import Header from '../component/header'
import CategorySection from '../component/CategorySection'
import FarmersSection from '../component/FarmersSection';
import FeaturedProducts from '../component/FeaturedProducts';

export default function ExplorePage() {
    return (
        <div>
            <Header />
            <div style={{ marginTop: '80px' }}> 
                <CategorySection />
                <FarmersSection />
                <FeaturedProducts/>
                <Footer />
            </div>
        </div>
    );
}