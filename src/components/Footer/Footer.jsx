/* eslint-disable react/no-unescaped-entities */
import { Link, useLocation } from "react-router-dom";
import {
	FaSquareFacebook,
	FaInstagram,
	FaTwitter,
	FaPinterest,
	FaApple,
} from "react-icons/fa6";
import { AiFillAndroid } from "react-icons/ai";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { RxUpdate } from "react-icons/rx";
import { FaSnapchatGhost } from "react-icons/fa";
import {
	MenCategories,
	WomenCategories,
	mobileCoversCategories,
} from "../Nav/navlinks";
import { Fragment, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setIsIntersecting } from "../../store/slices/intersectionSlice";

const Footer = () => {
	const { pathname } = useLocation();
	const footerRef = useRef();
	const dispatch = useDispatch();

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			dispatch(setIsIntersecting(entry.isIntersecting));
		}, {
			rootMargin: '500px'
		});
		footerRef?.current && observer.observe(footerRef?.current);
		return () => {
			observer.disconnect();
		}
	}, [dispatch])

	return (
		<footer ref={footerRef} className="footerDiv text-sm bg-[#181818] text-[#ffffffe6] py-20">
			<div className="container px-4">
				<div className="logo text-2xl font-bold text-[#fdd855] pb-4">
					Bewakoof®
				</div>
				<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
					<div className="font-medium">
						<h3 className="footerTitle text-[#fdd855] text-xs font-medium md:mb-5 mb-2">
							CUSTOMER SERVICE
						</h3>
						<div className="flex flex-wrap text-xs gap-2 md:flex-col">
							<Link className="md:border-none border-r pr-2">Contact Us</Link>
							<Link className="md:border-none border-r pr-2">Track Order</Link>
							<Link className="md:border-none border-r pr-2">Return Order</Link>
							<Link>Cancel Order</Link>
						</div>
					</div>
					<div className="font-medium">
						<h3 className="footerTitle text-[#fdd855] text-xs font-medium md:mb-5 mb-2">
							COMPANY
						</h3>
						<div className="flex flex-wrap text-xs gap-2 md:flex-col">
							<Link className="md:border-none border-r pr-2">About Us</Link>
							<Link className="md:border-none border-r pr-2">We're Hiring</Link>
							<Link className="md:border-none border-r pr-2">
								Terms & Conditions
							</Link>
							<Link className="md:border-none border-r pr-2">
								Privacy Policy
							</Link>
							<Link className="pr-2">Blog</Link>
						</div>
					</div>
					<div className="font-medium">
						<h3 className="footerTitle text-[#fdd855] text-xs font-medium md:mb-5 mb-2">
							CONNECT WITH US
						</h3>
						<div className="flex  flex-wrap text-xs gap-4 md:flex-col">
							<Link className="flex items-center gap-2">
								<FaSquareFacebook className="w-4 h-4" />
								<span className="hidden lg:block">4.7M People Like this</span>
							</Link>
							<Link className="flex items-center gap-2">
								<FaInstagram className="w-4 h-4" />
								<span className="hidden lg:block">1M Followers</span>
							</Link>
							<div className="flex gap-4">
								<Link>
									<FaTwitter className="w-4 h-4" />
								</Link>
								<Link>
									<FaPinterest className="w-4 h-4" />
								</Link>
								<Link>
									<FaSnapchatGhost className="w-4 h-4" />
								</Link>
								<Link>
									<FaApple className="w-4 h-4" />
								</Link>
							</div>
						</div>
					</div>
					<div className="font-medium hidden md:block">
						<h3 className="footerTitle text-[#fdd855] text-xs font-medium md:mb-5 mb-2">
							KEEP UP TO DATE
						</h3>
						<div className="flex border-b border-b-[#fdd855] ">
							<input
								placeholder="Enter Email Id"
								type="text"
								className="bg-transparent text-sm w-full px-3 py-2 placeholder:text-[#555] border-none outline-none"
							/>
							<button className="bg-[#fdd855] p-2 w-7/12  text-black">
								SUBSCRIBE
							</button>
						</div>
					</div>
				</div>
				<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-10">
					<div className="font-medium">
						<div className="flex flex-wrap text-xs gap-4 lg:flex-col">
							<Link className="flex items-center gap-1">
								<RxUpdate className="w-4 h-4" /> 15 Days return policy*
							</Link>
							<Link className="flex items-center gap-1">
								<HiOutlineCurrencyRupee className="w-4 h-4" /> Cash on delivery*
							</Link>
						</div>
					</div>
					<div>
						<h3 className="footerTitle text-[#fdd855] text-xs font-medium md:mb-5 mb-2">
							DOWNLOAD THE APP
						</h3>
						<div className="flex h-8 gap-2">
							<a href="#" target="_blank">
								<img
									className="hidden md:block"
									src="/assets/images/app_android_v1.webp"
									alt=""
								/>
								<AiFillAndroid className="w-4 h-4 md:hidden" />
							</a>
							<a href="#" target="_blank">
								<img
									className="hidden md:block"
									src="/assets/images/app_ios_v1.webp"
									alt=""
								/>
								<FaApple className="w-4 h-4 md:hidden" />
							</a>
						</div>
					</div>
					<div>
						<h3 className="footerTitle text-[#fdd855] text-xs font-medium md:mb-5 mb-2">
							100% SECURE PAYMENT
						</h3>
						<img src="/assets/images/secure-payments-image.webp" alt="" />
					</div>
				</div>

				<div className="divider h-0 border border-gray-400 my-8"></div>

				<div className="grid gap-4 grid-cols-1 md:grid-cols-4">
					<div className="">
						<h3 className="md:text-lg font-semibold text-[#fdd855] md:text-white mb-2">
							MEN'S CLOTHING
						</h3>
						<ul className="flex flex-wrap md:flex-col gap-x-2 gap-1 text-xs font-medium">
							{MenCategories.slice(0, 3)?.map(({ id, heading, items }) => (
								<Fragment key={id}>
									<Link
										key={id}
										className="font-semibold border-r-2 md:border-none pr-2 lg:pt-2 text-[10px] md:text-sm"
									>
										{heading?.name}
									</Link>
									{items.map(({ id, name }) => (
										<Link
											key={id}
											className="font-semibold border-r md:border-none pr-2 text-[10px] md:text-xs last:border-none"
										>
											{name}
										</Link>
									))}
								</Fragment>
							))}
						</ul>
					</div>
					<div className="">
						<h3 className="md:text-lg font-semibold text-[#fdd855] md:text-white mb-2">
							WOMEN'S CLOTHING
						</h3>
						<ul className="flex flex-wrap md:flex-col gap-x-2 gap-1 text-xs font-medium">
							{WomenCategories?.slice(0, 2)?.map(({ id, heading, items }) => (
								<Fragment key={id}>
									<Link
										key={id}
										className="font-semibold border-r-2 md:border-none pr-2 lg:pt-2 text-[10px] md:text-sm"
									>
										{heading?.name}
									</Link>
									{items.map(({ id, name }) => (
										<Link
											key={id}
											className="font-semibold border-r md:border-none pr-2 text-[10px] md:text-xs last:border-none"
										>
											{name}
										</Link>
									))}
								</Fragment>
							))}
						</ul>
					</div>
					<div className="">
						<h3 className="md:text-lg font-semibold text-[#fdd855] md:text-white mb-2">
							MOBILE COVERS
						</h3>
						<ul className="flex flex-wrap lg:pt-2 md:flex-col gap-x-2 gap-1 font-medium">
							{mobileCoversCategories?.map(({ id, heading }) => (
								<Fragment key={id}>
									<Link
										key={id}
										className="font-semibold border-r md:border-none pr-2 text-[10px] md:text-sm"
									>
										{heading?.name}
									</Link>
								</Fragment>
							))}
						</ul>
					</div>
					<div className="">
						<ul className="flex flex-col text-lg font-bold text-[#51cccc]">
							<Link className="">FANBOOK</Link>
							<Link className="">OFFERS</Link>
							<Link className="">SITEMAP</Link>
						</ul>
					</div>
				</div>
				{pathname === '/' &&
					<div className="footerAboutUs py-4">
						<h1 className="font-semibold text-lg my-5">
							BEWAKOOF® THE NEW AGE ONLINE SHOPPING EXPERIENCE.
						</h1>
						<p className="text-lg">
							Founded in 2012, Bewakoof® is a lifestyle fashion brand that makes
							creative, distinctive fashion for the trendy, contemporary Indian.
							Bewakoof® was created on the principle of creating impact through
							innovation, honesty and thoughtfulness.
						</p>
						<p className="text-lg my-4">
							With a team of 400 members, and 2mn products sold till date. We like
							to experiment freely, which allows us to balance creativity and
							relatability, and our innovative designs. Our range of products is
							always fresh and up-to-date, and we clock sales of over 1 lakh
							products a month. Our innovation focus extends to our operations as
							well. We are vertically integrated, manufacture our own products,
							and cut out the middleman wherever possible. This direct-to-consumer
							model allows us to create high-quality fashion at affordable prices.
							A thoughtful brand, we actively attempt to minimize our
							environmental footprint and maximize our social impact. These
							efforts are integrated right into our day-to-day operations, from
							rainwater harvesting to paper packaging to employee benefits. To
							create an accessible, affordable and thoughtful experience of online
							shopping in India.
						</p>
						<h2 className="font-semibold text-lg my-5">
							ONLINE SHOPPING AT BEWAKOOF® IS HASSLE-FREE, CONVENIENT AND
							SUPER-EXCITING!
						</h2>
						<p className="text-lg">
							Online Shopping has always been a fun and exciting task for most and
							more so when the shopping mall is none other than your own house. We
							have all had days when we have planned trips to the clothing store
							in advance, dreaming about what we would buy once we get there. Now
							we wouldnt think twice before indulging in some online shopping.
							Well, cut to todays time and age, you can do all this from the
							comfort of your home while enjoying many online shopping offers,
							right from amazing deals and discounts to one of the most robust
							user interface amongst most online shopping sites in India, with
							many shopping filters to make your shopping experience truly hassle
							free. This in our own words is what we call Bewakoof.com.
						</p>
						<p className="text-lg my-4">
							Bewakoof®, THE place to be when it comes to the coolest in online
							fashion, offers you fine, high-quality merchandise go ahead and
							indulge in a bit of online shopping for men and womens fashion. So
							browse through the exciting categories we have on offer from mens
							fashion to basic mens clothing as well as wide variety in womenswear
							and womens clothes to the amazing range of accessories, fill up your
							carts and get fast home delivery for all orders. All of this topped
							with our exclusive online shopping offers makes for an exciting,
							irresistible and uber cool combo! You can even gift some to your
							near and dear ones while being absolutely certain that it will put a
							smile on their faces.
						</p>
						<h2 className="font-semibold text-lg my-5">
							BEWAKOOF.COM: THE QUIRKIEST ONLINE SHOPPING SITES OF ALL!
						</h2>

						<p className="text-lg">
							Online fashion is definitely more accessible with Bewakoof.com.
							Explore the latest collections in Marvel t-shirts including avengers
							t-shirts and captain America t-shirts in{" "}
							<Link className="text-[#51cccc] hover:underline">
								official merchandise.
							</Link>{" "}
							Apart from these, quirkiest of T-shirts that you wont find on any
							online shopping sites in India are showcased at Bewakoof.com. If
							your wardrobe has been longing for a cool overhaul then bewakoof.com
							will certainly be your best bet amongst all online shopping sites.
							Also, take a tour of our bewakoof® blog to stay abreast with the
							latest runway trends and be a trendsetter among your immediate
							circles. What we wear speaks volumes of us they say. But what if
							what you wore actually spoke what your mood was! Havent we all
							wondered where we could get those quirky t-shirts and sport them
							with confidence? Sure otherwise getting them made or even buying
							them from otherwise expensive online shopping sites for clothes may
							cost you substantially but with Bewakoof.com, you will understand
							that you do not have to spend a fortune on online fashion to look
							great. Sliders, joggers, sweatshirts, bag and bag packs and so much
							more are just some of the other items you can grab hold of here.
						</p>
						<h2 className="font-semibold text-lg my-5">
							AVAIL OF ONLINE SHOPPING BENEFITS AT BEWAKOOF.COM AND YOULL SHOP
							NOWHERE ELSE!
						</h2>
						<p className="text-lg">
							Choose your product, get it ordered online, and we ensure that its
							delivery happens right at your doorstep anywhere in India. You just
							need to take care of the payment for the product from the comfort of
							your home, while we ensure free shipping all the time on almost
							everything with no strings attached. For any second thoughts after
							purchase, we have in place a return policy as well. One of the best
							you will find on any online shopping sites in India. For your online
							shopping experience to be safe and risk-free, we offer Cash On
							Delivery (COD) facility too. So you dont have to worry anymore about
							your hard earned money being stuck when you buy clothes online at
							bewakoof.com. Avail exciting online shopping offers like designs of
							the day and colour of the month when you shop with us. Make sure to
							use our easy 15-day returns policy, card or cash on delivery option
							and other customer-friendly features. A comprehensive sizing guide
							and detailed product descriptions coupled with high-resolution
							product shots will give you all the information to make the right
							buying decision. Give your wardrobe the much-needed upgrade with
							uber cool clothing head to Bewakoof.com for a great online shopping
							india experience now! Could you have asked for more?
						</p>
						<h2 className="font-semibold text-lg my-5">
							DONT MISS OUT ON ACCESSORIES AVAILABLE ON OUR MULTI-FACETED ONLINE
							STORE!
						</h2>
						<p className="text-lg">
							We dont just offer you exciting options in online fashion but also
							give you amazing accessories with really cool bags and bag packs to
							choose from. Our bags and backpacks are compact, hassle-free and
							easy to stuff things in. And all of this with the swag that you get
							to carry along with it. Cool designs are what form a major part of
							our online fashion and we also ensure our accessories section doesnt
							feel left out!
						</p>
						<p className="text-lg py-4">
							As for our accessories collection, they are also manufactured with
							impeccable quality materials. Our mobile covers are made from hard
							and durable polycarbonate, with a matte finish that will make for a
							great protection for your phone with the rough use that we put them
							through nowadays.
						</p>
						<h2 className="font-semibold text-lg my-5">
							DESIGN OF THE DAY- THE COOLEST FEATURE EVER!
						</h2>
						<p className="text-lg">
							Who said good and cool t-shirts have to expensive? We bring newer,
							cooler and more youth oriented designs everyday. Yes! Everyday you
							get a new design to explore and buy. Although all our t-shirts are
							at an extremely affordable price, we decided to slash them down even
							further. But there is a catch. It is only for those designs and
							these exclusive prices are only valid for for a duration of 24
							hours! Designs refresh every day at 3pm and are valid only for 24
							hours. So you need to hurry and grab one fast before it ends.
							Because we believe everyone needs to have a fair chance at all of
							our fresh designs of the day.
						</p>
						<h2 className="font-semibold text-lg my-5">
							BEWAKOOF.COM: THE UBER COOL ONLINE FASHION STORE FOR THE YOUTH
						</h2>
						<p className="text-lg">
							We, at Bewakoof.com, have all that you need to glam up your cool
							quotient. From an extensive range of plus size clothing,{" "}
							<Link className="text-[#51cccc] hover:underline">
								casual shirts for men
							</Link>{" "}
							and accessories for everyone, we purvey diversity of choices in
							online shopping india platform has to offer under one umbrella. The
							range of apparels like{" "}
							<Link className="text-[#51cccc] hover:underline">men t-shirts</Link>
							, joggers, sliders, Henley shirts, Polo t-shirts, Oxford pants and
							more provide an array of options for the online customer to create a
							ravishing ensemble from. We try to target all kinds of customers and
							cater to their needs and preferences. Communication is the key to
							our functioning. Your Bewakoof® Online fashion Shop has arrived! Do
							not miss the attractive online shopping offers everyday. Work your
							fashion with the wide range of apparels available only one click
							away! Make a statement with our best t-shirts online! Get more, pay
							less!
						</p>
						<h2 className="font-semibold text-lg my-5">OUR PHILOSOPHY</h2>
						<p className="text-lg">
							We believe in creating the kind of fashion, that makes you stand out
							as they are in line with the latest local and global trends of the
							industry, but also at the same time offer value for money
							functionality, with quality materials and comfortable and flattering
							prints. We try to look into the psyche of our customers, and try to
							get inspired by the conversations and experiences around us while
							creating our graphics, to ensure that they are relatable. We believe
							in constant and consistent innovation to ensure that our fans get
							nothing short of the bets at affordable rates! While most people do
							not know, we do not outsource the manufacturing of our products,
							everything from the conception of the designs to the manufacture and
							the styling that you see on the photographs of the banners and
							product pages of our website all happen in house! We go from yarn to
							product and since we 're vertically integrated and bring fashion
							from us directly to your doorstep without any middlemen that also
							further ensures reliability because for us it is not just about the
							money but about building the trust and credibility in our fans about
							our brand. We also make sure to decrease the impact on environment
							and are building initiatives that will help us with the same, for
							now by optimizing our processes to use only as much as we need from
							nature, rain water harvesting and recycling the water from our RO
							water facility, because we believe that the spirit of Bewakoof® is
							about creating an impact by breaking conventions and having a
							different perspective!
						</p>
					</div>
				}
			</div>
		</footer>
	);
};

export default Footer;
