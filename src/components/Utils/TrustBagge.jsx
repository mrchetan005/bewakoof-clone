

const TrustBagge = () => {
    return (
        <div className="trustBaggeContainer py-10 flex gap-2 text-center">
            <div className="flex flex-col gap-1 items-center">
                <img className="w-10 h-10 object-cover" src="/assets/icons/cart-badge-trust.svg" alt="" />
                <span className="font-semibold text-xs text-[#8f98a9]">100% SECURE PAYMENTS</span>
            </div>
            <div className="flex flex-col gap-1 items-center">
                <img className="w-10 h-10 object-cover" src="/assets/icons/easy-returns.svg" alt="" />
                <span className="font-semibold text-xs text-[#8f98a9]">EASY RETURNS & QUICK REFUNDS</span>
            </div>
            <div className="flex flex-col gap-1 items-center">
                <img className="w-10 h-10 object-contain" src="/assets/images/productDetails/globe.svg" alt="" />
                <span className="font-semibold text-xs text-[#8f98a9]">SHIPPING GLOBALLY</span>
            </div>
        </div>
    )
}

export default TrustBagge;