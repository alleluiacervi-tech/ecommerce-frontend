import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Truck, Shield, Award, Star, Heart, Zap } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import useStore from '../store/useStore';

const Home = () => {
  const { products, fetchProducts } = useStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [productCarouselIndex, setProductCarouselIndex] = useState(0);
  const [featuresImageIndex, setFeaturesImageIndex] = useState(0);

  // Hero and showcase image arrays
  const imageUrls = [
    "https://i.pinimg.com/736x/69/35/2e/69352e36b46fcffe5a033b0881460872.jpg",
    "https://media.istockphoto.com/id/1428709516/photo/shopping-online-woman-hand-online-shopping-on-laptop-computer-with-virtual-graphic-icon.jpg?s=1024x1024&w=is&k=20&c=N5Fw7BZfKcYJMH9camA7rQ3q--7Ev7pKlQYEB_gPfo8=",
    "https://i.pinimg.com/1200x/df/d6/7c/dfd67c53823c56cef3954336039d346c.jpg",
    "https://i.pinimg.com/736x/dc/73/2a/dc732ae5b28015fe0790ce89085a8b3b.jpg",
    "https://i.pinimg.com/736x/13/a9/9c/13a99cc7ae16f759b9a9ec6ffad1591a.jpg",
  ];

  // Product showcase images for the dynamic section
  const productShowcaseImages = [
    "https://i.pinimg.com/736x/fc/0f/da/fc0fda43f76d77b1e2d1566e62e5b31c.jpg",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
    "https://i.pinimg.com/1200x/e2/84/ea/e284eab29d3f3308e25d9d4823be6606.jpg",
    "https://i.pinimg.com/1200x/fa/a4/76/faa476b16aa7acfa6c3297a77c8afdbf.jpg",
    "https://i.pinimg.com/736x/38/65/94/386594135756b1c8572b20991e9dd963.jpg",
    "https://i.pinimg.com/1200x/7b/9a/98/7b9a981747c8d3bb8dceb5aa946cd046.jpg",
    "https://i.pinimg.com/1200x/37/af/07/37af0765eeb3d0dde512ea8fd49807d1.jpg",
    "https://i.pinimg.com/736x/4e/a1/90/4ea1903732c676930013b06d260f86f2.jpg"
  ];

  // Different product images for features section
  const featureProductImages = [
    "https://i.pinimg.com/1200x/ef/2d/c4/ef2dc4bc71dc9f0fc7ef8164b0b7f713.jpg",
    "https://i.pinimg.com/736x/b8/24/9b/b8249bf0063174297648d3c9d01ac234.jpg",
    "https://i.pinimg.com/736x/dd/6e/48/dd6e4805d28c2661e1dc286dfbca1c9d.jpg",
    "https://i.pinimg.com/1200x/e7/ac/5d/e7ac5d871d5a938c45a186c285d254a3.jpg",
    "https://i.pinimg.com/736x/d3/df/88/d3df888df80b1d56958fd21f2bffe1fd.jpg",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop"
  ];

  useEffect(() => {
    fetchProducts();

    // Hero section image carousel
    const imageChangeInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 2000);

    // Product showcase carousel
    const productInterval = setInterval(() => {
      setProductCarouselIndex((prevIndex) => (prevIndex + 1) % productShowcaseImages.length);
    }, 1800);

    // Features section product images
    const featuresInterval = setInterval(() => {
      setFeaturesImageIndex((prevIndex) => (prevIndex + 1) % featureProductImages.length);
    }, 1500);

    return () => {
      clearInterval(imageChangeInterval);
      clearInterval(productInterval);
      clearInterval(featuresInterval);
    };
  }, [
    fetchProducts,
    imageUrls.length,
    productShowcaseImages.length,
    featureProductImages.length
  ]);

  const featuredProducts = Array.isArray(products) ? products.slice(0, 8) : [];

  return (
    <div className="min-h-screen">
      <style jsx>{`
        @keyframes move-left {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }
        
        @keyframes move-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
        
        @keyframes move-left-slow {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }
        
        .animate-move-left {
          animation: move-left 25s linear infinite;
        }
        
        .animate-move-right {
          animation: move-right 30s linear infinite;
        }
        
        .animate-move-left-slow {
          animation: move-left-slow 35s linear infinite;
        }
      `}</style>

      {/* Kapee-like Main Row: Categories + Hero + Promo tiles */}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Categories Sidebar */}
            <aside className="lg:col-span-3 hidden lg:block">
              <div className="border rounded-lg overflow-hidden">
                <div className="px-4 py-3 bg-yellow-500 text-black font-extrabold">SHOP BY CATEGORIES</div>
                <ul className="divide-y">
                  {[
                    'Men\'s Clothing',
                    'Women\'s Clothing',
                    'Accessories',
                    'Shoes',
                    'Jewelry',
                    'Bags & Backpacks',
                    'Watches',
                    'Electronics',
                  ].map((c) => (
                    <li key={c}>
                      <Link to={`/shop?category=${encodeURIComponent(c)}`} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50">
                        <span className="text-sm font-medium text-gray-800">{c}</span>
                        <span className="text-gray-400">›</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Hero Slider */}
            <div className="lg:col-span-6">
              <div
                className="h-72 md:h-96 w-full rounded-lg overflow-hidden shadow-xl"
                style={{
                  backgroundImage: `url(${imageUrls[currentImageIndex]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'background-image 1s ease-in-out',
                }}
              >
                <div className="h-full w-full bg-black/30 flex flex-col items-start justify-center p-8">
                  <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow">Seamless online shopping Experience</h1>
                  <p className="mt-3 text-white/90 max-w-lg">Premium sound. Exclusive deals. Upgrade your gear today.</p>
                  <div className="mt-6 flex gap-3">
                    <Link to="/shop" className="bg-yellow-500 text-black px-5 py-2 rounded-lg font-bold hover:bg-yellow-400">
                      <ShoppingBag className="inline h-4 w-4 mr-2" />Shop Now
                    </Link>
                    <Link to="/register" className="border border-white text-white px-5 py-2 rounded-lg font-bold hover:bg-white hover:text-black">
                      Join Kapee
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Promo Tiles */}
            <div className="lg:col-span-3 grid grid-rows-2 gap-6">
              <Link to="/shop" className="block rounded-lg overflow-hidden shadow-md group">
                <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${productShowcaseImages[(productCarouselIndex+1)%productShowcaseImages.length]})` }}></div>
                <div className="p-4 bg-black text-yellow-400 font-bold group-hover:bg-gray-900">Summer Sale -40%</div>
              </Link>
              <Link to="/shop" className="block rounded-lg overflow-hidden shadow-md group">
                <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${productShowcaseImages[(productCarouselIndex+2)%productShowcaseImages.length]})` }}></div>
                <div className="p-4 bg-yellow-500 text-black font-extrabold group-hover:bg-yellow-400">New Arrivals</div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Product Showcase Section */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 bg-yellow-400 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-yellow-400 rounded-full opacity-10 animate-ping"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-yellow-400 mb-6">
              Why Shop With Kapee?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of online shopping with our premium collection and unmatched service
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Fast Delivery */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl p-8 text-black transform hover:scale-105 transition-all duration-500 hover:shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center">
                    <Truck className="h-8 w-8 text-yellow-400" />
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-black text-black" />
                    ))}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4">Lightning Fast Delivery</h3>
                <p className="text-gray-800 mb-6">
                  Get your products delivered in record time with our premium logistics network
                </p>
                
                {/* Dynamic product images */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={productShowcaseImages[productCarouselIndex]}
                      alt="Product"
                      className="w-full h-24 object-cover transition-all duration-1000 transform hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={productShowcaseImages[(productCarouselIndex + 1) % productShowcaseImages.length]}
                      alt="Product"
                      className="w-full h-24 object-cover transition-all duration-1000 transform hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-sm font-medium">
                  <Zap className="h-4 w-4" />
                  <span>24-48 Hour Delivery</span>
                </div>
              </div>
            </div>

            {/* Secure Shopping */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-gray-800 to-black rounded-3xl p-8 text-white border-2 border-yellow-400 transform hover:scale-105 transition-all duration-500 hover:shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center">
                    <Shield className="h-8 w-8 text-black" />
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-yellow-400">Bank-Level Security</h3>
                <p className="text-gray-300 mb-6">
                  Shop with complete peace of mind using our advanced security protocols
                </p>
                
                {/* Dynamic product images */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={productShowcaseImages[(productCarouselIndex + 2) % productShowcaseImages.length]}
                      alt="Product"
                      className="w-full h-24 object-cover transition-all duration-1000 transform hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 to-transparent"></div>
                  </div>
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={productShowcaseImages[(productCarouselIndex + 3) % productShowcaseImages.length]}
                      alt="Product"
                      className="w-full h-24 object-cover transition-all duration-1000 transform hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 to-transparent"></div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-sm font-medium text-yellow-400">
                  <Shield className="h-4 w-4" />
                  <span>256-bit SSL Encryption</span>
                </div>
              </div>
            </div>

            {/* Quality Products */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl p-8 text-black transform hover:scale-105 transition-all duration-500 hover:shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center">
                    <Award className="h-8 w-8 text-yellow-400" />
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-black text-black" />
                    ))}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4">Premium Quality</h3>
                <p className="text-gray-800 mb-6">
                  Handpicked products from world's most trusted brands and manufacturers
                </p>
                
                {/* Dynamic product images */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={productShowcaseImages[(productCarouselIndex + 4) % productShowcaseImages.length]}
                      alt="Product"
                      className="w-full h-24 object-cover transition-all duration-1000 transform hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    <div className="absolute top-2 right-2">
                      <Heart className="h-4 w-4 text-white fill-red-500" />
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={productShowcaseImages[(productCarouselIndex + 5) % productShowcaseImages.length]}
                      alt="Product"
                      className="w-full h-24 object-cover transition-all duration-1000 transform hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    <div className="absolute top-2 right-2">
                      <Heart className="h-4 w-4 text-white fill-red-500" />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-sm font-medium">
                  <Award className="h-4 w-4" />
                  <span>Quality Guaranteed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating product images */}
          <div className="hidden lg:block absolute top-20 right-10">
            <div className="relative">
              <img
                src={featureProductImages[featuresImageIndex]}
                alt="Floating product"
                className="w-32 h-24 object-cover rounded-2xl shadow-2xl transition-all duration-1500 transform hover:rotate-6 opacity-80"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <Star className="h-4 w-4 text-black fill-black" />
              </div>
            </div>
          </div>

          <div className="hidden lg:block absolute bottom-20 left-10">
            <div className="relative">
              <img
                src={featureProductImages[(featuresImageIndex + 1) % featureProductImages.length]}
                alt="Floating product"
                className="w-28 h-20 object-cover rounded-2xl shadow-2xl transition-all duration-1500 transform hover:-rotate-6 opacity-80"
              />
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Zap className="h-3 w-3 text-black" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Moving Products Showcase */}
      <section className="py-16 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 overflow-hidden relative">
        <div className="absolute inset-0">
          {/* Row 1 - Moving Left */}
          <div className="absolute top-8 w-full">
            <div className="flex animate-move-left space-x-8">
              <div className="flex-shrink-0 bg-black rounded-2xl p-4 shadow-xl transform hover:scale-110 transition-all">
                <img src="https://pimcdn.sharafdg.com/images/Xbox_One_X_black_3?1729168181" 
                     alt="Xbox" className="w-24 h-16 object-cover rounded-lg" />
                <p className="text-yellow-400 text-xs font-bold mt-2 text-center">Xbox Series X</p>
              </div>
              <div className="flex-shrink-0 bg-black rounded-2xl p-4 shadow-xl transform hover:scale-110 transition-all">
                <img src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=120&h=80&fit=crop" 
                     alt="iPhone" className="w-24 h-16 object-cover rounded-lg" />
                <p className="text-yellow-400 text-xs font-bold mt-2 text-center">iPhone 15 Pro</p>
              </div>
              <div className="flex-shrink-0 bg-black rounded-2xl p-4 shadow-xl transform hover:scale-110 transition-all">
                <img src="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=120&h=80&fit=crop" 
                     alt="Samsung" className="w-24 h-16 object-cover rounded-lg" />
                <p className="text-yellow-400 text-xs font-bold mt-2 text-center">Samsung Galaxy</p>
              </div>
              <div className="flex-shrink-0 bg-black rounded-2xl p-4 shadow-xl transform hover:scale-110 transition-all">
                <img src="https://i.pinimg.com/736x/11/d3/ec/11d3ecc8d40b70fe0d6cca0cee1c24df.jpg" 
                     alt="CCTV" className="w-24 h-16 object-cover rounded-lg" />
                <p className="text-yellow-400 text-xs font-bold mt-2 text-center">CCTV Camera</p>
              </div>
              <div className="flex-shrink-0 bg-black rounded-2xl p-4 shadow-xl transform hover:scale-110 transition-all">
                <img src="https://i.pinimg.com/1200x/52/9a/87/529a87de4ac2b2d8a5c627bd70faf422.jpg" 
                     alt="Headphones" className="w-24 h-16 object-cover rounded-lg" />
                <p className="text-yellow-400 text-xs font-bold mt-2 text-center">Sony WH-1000XM5</p>
              </div>
              <div className="flex-shrink-0 bg-black rounded-2xl p-4 shadow-xl transform hover:scale-110 transition-all">
                <img src="https://cjo.info/assets-content/classic-analogue-cameras/canon-eos-5/images/135/20120729-0087.jpg" 
                     alt="Canon" className="w-24 h-16 object-cover rounded-lg" />
                <p className="text-yellow-400 text-xs font-bold mt-2 text-center">Canon EOS R5</p>
              </div>
              {/* Duplicate for seamless loop */}
              <div className="flex-shrink-0 bg-black rounded-2xl p-4 shadow-xl transform hover:scale-110 transition-all">
                <img src="https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/66743890_Highlight_VisID_3000x1682:VP2-859x540" 
                     alt="Xbox" className="w-24 h-16 object-cover rounded-lg" />
                <p className="text-yellow-400 text-xs font-bold mt-2 text-center">Xbox Series X</p>
              </div>
              <div className="flex-shrink-0 bg-black rounded-2xl p-4 shadow-xl transform hover:scale-110 transition-all">
                <img src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=120&h=80&fit=crop" 
                     alt="iPhone" className="w-24 h-16 object-cover rounded-lg" />
                <p className="text-yellow-400 text-xs font-bold mt-2 text-center">iPhone 15 Pro</p>
              </div>
            </div>
          </div>

          {/* Row 2 - Moving Right */}
          <div className="absolute top-40 w-full">
            <div className="flex animate-move-right space-x-8">
              <div className="flex-shrink-0 bg-white rounded-2xl p-4 shadow-xl transform hover:scale-110 transition-all border-2 border-black">
                <img src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=120&h=80&fit=crop" 
                     alt="PS5" className="w-24 h-16 object-cover rounded-lg" />
                <p className="text-black text-xs font-bold mt-2 text-center">PlayStation 5</p>
              </div>
              <div className="flex-shrink-0 bg-white rounded-2xl p-4 shadow-xl transform hover:scale-110 transition-all border-2 border-black">
                <img src="https://images.unsplash.com/photo-1567581935884-3349723552ca?w=120&h=80&fit=crop" 
                     alt="MacBook" className="w-24 h-16 object-cover rounded-lg" />
                <p className="text-black text-xs font-bold mt-2 text-center">MacBook Pro</p>
              </div>
              <div className="flex-shrink-0 bg-white rounded-2xl p-4 shadow-xl transform hover:scale-110 transition-all border-2 border-black">
                <img src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=120&h=80&fit=crop" 
                     alt="Nintendo Switch" className="w-24 h-16 object-cover rounded-lg" />
                <p className="text-black text-xs font-bold mt-2 text-center">Nintendo Switch</p>
              </div>
              <div className="flex-shrink-0 bg-white rounded-2xl p-4 shadow-xl transform hover:scale-110 transition-all border-2 border-black">
                <img src="https://www.apple.com/v/watch/bs/images/meta/apple-watch__ywfuk5wnf1u2_og.png" 
                     alt="Smartwatch" className="w-24 h-16 object-cover rounded-lg" />
                <p className="text-black text-xs font-bold mt-2 text-center">Apple Watch</p>
              </div>
              <div className="flex-shrink-0 bg-white rounded-2xl p-4 shadow-xl transform hover:scale-110 transition-all border-2 border-black">
                <img src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=120&h=80&fit=crop" 
                     alt="Camera" className="w-24 h-16 object-cover rounded-lg" />
                <p className="text-black text-xs font-bold mt-2 text-center">Sony A7R V</p>
              </div>
              <div className="flex-shrink-0 bg-white rounded-2xl p-4 shadow-xl transform hover:scale-110 transition-all border-2 border-black">
                <img src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=120&h=80&fit=crop" 
                     alt="Sunglasses" className="w-24 h-16 object-cover rounded-lg" />
                <p className="text-black text-xs font-bold mt-2 text-center">Ray-Ban</p>
              </div>
              {/* Duplicate for seamless loop */}
              <div className="flex-shrink-0 bg-white rounded-2xl p-4 shadow-xl transform hover:scale-110 transition-all border-2 border-black">
                <img src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=120&h=80&fit=crop" 
                     alt="PS5" className="w-24 h-16 object-cover rounded-lg" />
                <p className="text-black text-xs font-bold mt-2 text-center">PlayStation 5</p>
              </div>
              <div className="flex-shrink-0 bg-white rounded-2xl p-4 shadow-xl transform hover:scale-110 transition-all border-2 border-black">
                <img src="https://images.unsplash.com/photo-1567581935884-3349723552ca?w=120&h=80&fit=crop" 
                     alt="MacBook" className="w-24 h-16 object-cover rounded-lg" />
                <p className="text-black text-xs font-bold mt-2 text-center">MacBook Pro</p>
              </div>
            </div>
          </div>

          {/* Row 3 - Moving Left (slower) */}
          <div className="absolute bottom-8 w-full">
            <div className="flex animate-move-left-slow space-x-8">
              <div className="flex-shrink-0 bg-gradient-to-br from-black to-gray-800 rounded-2xl p-4 shadow-xl transform hover:scale-110 transition-all">
                <img src="https://images.unsplash.com/photo-1588508065123-287b28e013da?w=120&h=80&fit=crop" 
                     alt="Drone" className="w-24 h-16 object-cover rounded-lg" />
                <p className="text-yellow-400 text-xs font-bold mt-2 text-center">DJI Mavic</p>
              </div>
              <div className="flex-shrink-0 bg-gradient-to-br from-black to-gray-800 rounded-2xl p-4 shadow-xl transform hover:scale-110 transition-all">
                <img src="https://static0.pocketlintimages.com/wordpress/wp-content/uploads/wm/2023/10/meta-quest-3-1.jpg?w=1600&h=900&fit=crop" 
                     alt="VR Headset" className="w-24 h-16 object-cover rounded-lg" />
                <p className="text-yellow-400 text-xs font-bold mt-2 text-center">Meta Quest 3</p>
              </div>
              <div className="flex-shrink-0 bg-gradient-to-br from-black to-gray-800 rounded-2xl p-4 shadow-xl transform hover:scale-110 transition-all">
                <img src="https://image.made-in-china.com/202f0j00QyYioSJthhkR/E-Sports-RGB-Lights-PU-Gaming-Chair-with-Headrest-Lumbar-Support.webp" 
                     alt="Gaming Chair" className="w-24 h-16 object-cover rounded-lg" />
                <p className="text-yellow-400 text-xs font-bold mt-2 text-center">Gaming Chair</p>
              </div>
              {/* Duplicate for seamless loop */}
              <div className="flex-shrink-0 bg-gradient-to-br from-black to-gray-800 rounded-2xl p-4 shadow-xl transform hover:scale-110 transition-all">
                <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=80&fit=crop" 
                     alt="Shoes" className="w-24 h-16 object-cover rounded-lg" />
                <p className="text-yellow-400 text-xs font-bold mt-2 text-center">Nike Air Max</p>
              </div>
              <div className="flex-shrink-0 bg-gradient-to-br from-black to-gray-800 rounded-2xl p-4 shadow-xl transform hover:scale-110 transition-all">
                <img src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=120&h=80&fit=crop" 
                     alt="Watch" className="w-24 h-16 object-cover rounded-lg" />
                <p className="text-yellow-400 text-xs font-bold mt-2 text-center">Rolex Watch</p>
              </div>
            </div>
          </div>
        </div>

        {/* Center Text Overlay */}
        <div className="relative z-10 text-center py-20">
          <h3 className="text-4xl font-bold text-black mb-4">Trending Products</h3>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto">
            Discover the latest and most popular tech products loved by millions worldwide
          </p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-yellow-500">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600">
              Check out our most popular items
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {(featuredProducts || []).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/shop" className="btn btn-primary bg-yellow-500 hover:bg-yellow-600 text-white">
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;