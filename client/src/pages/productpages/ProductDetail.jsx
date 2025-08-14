import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Heart, Share2, Truck, Shield, RotateCcw, Star } from 'lucide-react'
import Breadcum from '../../components/common/Breadcum'
import Rating from '../../components/rating/Rating'
import { getAllProducts, getProductById } from '../../api/Porducts/fetchProduct'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../store/features/Common'
import { useSelector } from 'react-redux'
import ProductCard from '../../components/common/Productcard'
import { addItemToCartAction } from '../../store/action/cartAction'


const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [error, setError] = useState('');
  const categories = useSelector((state) => state?.categoryState?.categories);

  useEffect(() => {
    dispatch(setLoading(true));
    getProductById(id)
      .then((data) => {
        setProduct(data);
        console.log("Product data fetched:", data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      }).finally(()=>{
       dispatch(setLoading(false));
      });
  }, [dispatch, id]);


  useEffect(() =>{
    if(!product?.categoryId || !product?.categoryTypeId) return;
    
    getAllProducts(product?.categoryId, product?.categoryTypeId)
      .then((data) => {

        const excludedproducts = data.filter((item) => item.id !== product.id);
        setRelatedProducts(excludedproducts);
        console.log("Related products fetched:", excludedproducts);
      })
      .catch((error) => {
        console.error("Error fetching related products:", error);
      });
  }, [product?.categoryId, product?.categoryTypeId, product?.id]);


  const productCategory = useMemo(() => {
    if (!product?.categoryId || !categories) return undefined;
    return categories.find((category) => String(category.id) === String(product.categoryId));
  }, [categories, product?.categoryId]);

  const addItemToCart = useCallback(()=>{
    // Clear any previous errors
    setError('');
    
    console.log("size ", selectedSize);
    if(!selectedSize){
      setError('Please select size');
      return;
    }
    
    const selectedVariant = product?.variants?.filter((variant)=> variant?.size === selectedSize)?.[0];
    console.log("selected ", selectedVariant);
    
    if(!selectedVariant){
      setError('Selected size is not available');
      return;
    }
    
    if(selectedVariant?.stockQuantity < quantity){
      setError(`Only ${selectedVariant.stockQuantity} items available in stock`);
      return;
    }
    
    if(selectedVariant?.stockQuantity > 0){
      dispatch(addItemToCartAction({
        productId: product?.id,
        thumbnail: product?.thumbnail,
        name: product?.name,
        variant: selectedVariant,
        quantity: quantity,
        subTotal: product?.price * quantity,
        price: product?.price,
      }));
      
      // Success feedback (optional)
      console.log("Item added to cart successfully");
    }
    else{
      setError('Out of Stock');
    }

  },[dispatch, product, selectedSize, quantity, setError]);



  if (!product) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-6 bg-[#0D1117] text-[#EDEDED]">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-[#DA0037]">Product not found!</h2>
          <p className="text-[#EDEDED]/70 text-lg">The product you're looking for doesn't exist or has been removed.</p>
        </div>
        <Link 
          to="/" 
          className="group px-8 py-3 bg-[#DA0037] text-white rounded-full font-bold hover:bg-[#b1002c] hover:scale-105 transition-all duration-300 shadow-xl"
        >
          <span className="flex items-center space-x-2">
            <span>Return to Home</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </Link>
      </div>
    );
  }

  const discountedPrice = product.discount 
    ? (product.price - (product.price * product.discount / 100)).toFixed(2)
    : product.price.toFixed(2);

  // Map categoryTypeId to route and display name for breadcrumb
  const categoryRouteMap = {
    'ad1073a3-99bf-419c-be85-e7a86947d887': { route: 'menfashion', display: 'Men Fashion' },
    // Add other categoryTypeId mappings as needed
  };

  const catInfo = categoryRouteMap[product.categoryTypeId];

  // Images from productResources
  const images = product.productResources && Array.isArray(product.productResources) && product.productResources.length > 0
    ? product.productResources.map(res => res.url)
    : [product.thumbnail];

  // Colors and sizes from variants
  const colors = product.variants && Array.isArray(product.variants) && product.variants.length > 0
    ? [...new Set(product.variants.map(variant => variant.color))]
    : ["#CCCCCC"];

  const sizes = product.variants && Array.isArray(product.variants) && product.variants.length > 0
    ? [...new Set(product.variants.map(variant => variant.size))]
    : ["M"];

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#EDEDED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          {/* <Breadcum 
            type_id={catInfo?.route}
            productName={product.name || product.title}
          /> */}
        </div>
        
        <div className='flex flex-col lg:flex-row gap-12 mb-16'>
          {/* Left Column - Images */}
          <div className='w-full lg:w-1/2 flex flex-col gap-6'>
            {/* Main Image */}
            <div className='relative w-full aspect-square overflow-hidden rounded-2xl bg-[#1C2128] border border-[#444444]/30 shadow-2xl'>
              <img 
                src={images[selectedImage]} 
                alt={product.name || product.title} 
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
              />
              {product.discount && (
                <div className="absolute top-4 left-4 bg-[#DA0037] text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{product.discount}%
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            <div className='flex gap-4 overflow-x-auto py-2'>
              {images.map((image, index) => (
                <div 
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 flex-shrink-0 cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                    selectedImage === index 
                      ? 'border-[#DA0037] shadow-lg' 
                      : 'border-[#444444]/30 hover:border-[#444444]/60'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name || product.title} view ${index+1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className='w-full lg:w-1/2 flex flex-col gap-6'>
            {/* Header Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[#DA0037] font-semibold text-sm tracking-wider uppercase">{product.brand}</span>
                <span className="text-[#EDEDED] font-semibold text-sm tracking-wider uppercase">{productCategory?.name}</span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      isWishlisted 
                        ? 'bg-[#DA0037] text-white' 
                        : 'bg-[#444444]/30 text-[#EDEDED] hover:bg-[#444444]/50'
                    }`}
                  >
                    <Heart className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} />
                  </button>
                  <button className="p-2 rounded-full bg-[#444444]/30 text-[#EDEDED] hover:bg-[#444444]/50 transition-all duration-300">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-[#EDEDED] leading-tight">{product.name || product.title}</h1>
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-3">
              <Rating value={product.rating} />
              <span className="text-[#EDEDED]/60 text-sm">({product.rating} stars)</span>
            </div>
            
            {/* Price */}
            <div className="py-4 border-y border-[#444444]/30">
              {product.discount ? (
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-bold text-[#EDEDED]">${discountedPrice}</span>
                  <span className="text-xl text-[#EDEDED]/50 line-through">${product.price.toFixed(2)}</span>
                  <span className="px-3 py-1 bg-[#DA0037]/20 text-[#DA0037] rounded-full text-sm font-medium">
                    Save {product.discount}%
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-[#EDEDED]">${product.price.toFixed(2)}</span>
              )}
            </div>
            
            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-[#EDEDED]">Description</h3>
              <p className="text-[#EDEDED]/80 leading-relaxed">{product.description}</p>
            </div>
            
            {/* Color Selection */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-[#EDEDED]">Color</h3>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`relative w-10 h-10 rounded-full focus:outline-none transition-all duration-300 hover:scale-110 ${
                      selectedColor === color 
                        ? 'ring-2 ring-offset-2 ring-[#DA0037] ring-offset-[#0D1117] scale-110' 
                        : 'hover:ring-2 hover:ring-offset-2 hover:ring-[#444444] hover:ring-offset-[#0D1117]'
                    }`}
                    style={{ backgroundColor: color.toLowerCase ? color.toLowerCase() : color }}
                    aria-label={`Color ${color}`}
                  />
                ))}
              </div>
              <p className="text-sm text-[#EDEDED]/60">Selected: <span className="text-[#EDEDED] font-medium">{selectedColor}</span></p>
            </div>
            
            {/* Size Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#EDEDED]">Size</h3>
                <button className="text-[#DA0037] text-sm hover:underline">Size Guide</button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setError(''); // Clear error when size is selected
                    }}
                    className={`py-3 px-2 text-sm font-medium rounded-xl focus:outline-none transition-all duration-300 hover:scale-105 ${
                      selectedSize === size 
                        ? 'bg-[#DA0037] text-white shadow-lg' 
                        : 'bg-[#444444]/30 text-[#EDEDED] hover:bg-[#444444]/50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center bg-[#444444]/30 rounded-xl border border-[#444444]/30">
                <button 
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="px-4 py-3 text-[#EDEDED] hover:bg-[#444444]/50 rounded-l-xl transition-colors"
                >
                  −
                </button>
                <span className="px-6 py-3 text-[#EDEDED] font-medium border-x border-[#444444]/30 min-w-[60px] text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-[#EDEDED] hover:bg-[#444444]/50 rounded-r-xl transition-colors"
                >
                  +
                </button>
              </div>
              
              <button 
                onClick={addItemToCart}
                className="flex-1 bg-[#DA0037] text-white py-3 px-6 rounded-xl font-bold hover:bg-[#b1002c] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#DA0037] focus:ring-offset-2 focus:ring-offset-[#0D1117] transition-all duration-300 shadow-xl"
              >
                Add to Cart
              </button>
            </div>
            
            {/* Error Display */}
            {error && (
              <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl">
                <p className="text-red-400 text-sm font-medium">{error}</p>
              </div>
            )}
            
            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-[#444444]/30">
              <div className="flex items-center gap-3 p-4 bg-[#444444]/20 rounded-xl">
                <Truck className="w-5 h-5 text-[#DA0037]" />
                <div>
                  <p className="text-sm font-medium text-[#EDEDED]">Free Shipping</p>
                  <p className="text-xs text-[#EDEDED]/60">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-[#444444]/20 rounded-xl">
                <Shield className="w-5 h-5 text-[#DA0037]" />
                <div>
                  <p className="text-sm font-medium text-[#EDEDED]">Secure Payment</p>
                  <p className="text-xs text-[#EDEDED]/60">100% protected</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-[#444444]/20 rounded-xl">
                <RotateCcw className="w-5 h-5 text-[#DA0037]" />
                <div>
                  <p className="text-sm font-medium text-[#EDEDED]">Easy Returns</p>
                  <p className="text-xs text-[#EDEDED]/60">30-day guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Related Products Section */}
        <div>
          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-[#EDEDED]">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.map((item) => {
                  const image = item.thumbnail || (item.productResources && item.productResources[0]?.url);
                  return (
                    <ProductCard
                      key={item.id}
                      product={{
                        ...item,
                        image,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail