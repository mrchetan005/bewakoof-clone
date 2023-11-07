
import { Link } from 'react-router-dom';

const ExclusiveGoofCorner = () => {
    return (
        <>
            <div className="py-2 pb-0 md:px-0">
                <Link to={'/tribe'}>
                    <img className="hidden md:block" src="/assets/images/others/Desktop-Strip-1.jpg" alt="Desktop-Strip" />
                    <img className="md:hidden rounded-xl" src="/assets/images/others/tribe-strip-1.gif" alt="mobile-strip" />
                </Link>
            </div>

            <div className="py-2 md:px-0">
                <Link to={'/vote'}>
                    <img className="hidden md:block" src="/assets/images/others/Desktop-Strip-2.jpg" alt="Desktop-Strip" />
                    <img className="md:hidden rounded-xl" src="/assets/images/others/vote-static.webp" alt="mobile-strip" />
                </Link>
            </div>
        </>
    )
}

export default ExclusiveGoofCorner;