import Footer from "../component/footer";
import Header from "../component/header";
import FarmersSection from "../component/FarmersSection";

import FeaturedProducts from "../component/FeaturedProducts";

export default function Store() {
    return (
        <div>
            <Header />
            <FeaturedProducts />
            <FarmersSection/>
            <Footer />
        </div>
    );
}