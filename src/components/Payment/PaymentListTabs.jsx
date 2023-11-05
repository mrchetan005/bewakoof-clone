/* eslint-disable react/prop-types */

const paymentListTabs = [
    { icon: '/assets/icons/bank-card-fill.svg', title: 'Debit & Credit Card' },
    { icon: '/assets/icons/wallet.webp', title: 'Wallet' },
    { icon: '/assets/icons/upi-icon.webp', title: 'UPI' },
    { icon: '/assets/icons/netbanking-icon.webp', title: 'Net Banking' },
    { icon: '/assets/icons/cod-icon.webp', title: 'Cash On Delivery' },
];

export const PaymentListTabs = ({ activeTab, setActiveTab }) => {
    return (
        <div className="paymentTabList flex-1 bg-[#f7f7f7] min-w-[120px]">
            {
                paymentListTabs?.map(({ title, icon }, i) => (
                    <div onClick={() => setActiveTab(i)} key={title} className={`cursor-pointer relative p-6 font-bold text-xs md:text-sm text-[#333] border-b last:border-b-0 flex items-center gap-3 transition-all ${activeTab === i ? 'bg-white' : ''}`}>
                        <img className="w-6 h-6 object-cover" src={icon} alt="" />
                        <span className="">{title}</span>
                        <div className={`absolute left-0 top-0 h-full w-1 bg-[#51cccc] transition-all ${activeTab === i ? 'opacity-100' : 'opacity-0'}`}></div>
                    </div>
                ))
            }
        </div>
    )
}
