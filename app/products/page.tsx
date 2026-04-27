// import React from 'react';

// // ১. টাইপ ডেফিনিশন (TypeScript Interface)
// interface Product {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   rating: number;
//   thumbnail: string;
// }

// // ২. মেইন পেজ কম্পোনেন্ট
// export default async function ProductsPage({
//   searchParams,
// }: {
//   searchParams: { q?: string };
// }) {
//   // URL থেকে সার্চ কিউয়ারি নেওয়া (যেমন: ?q=apple)
//   const query = searchParams.q || ""; 

//   // ৩. API কল (সার্চ কিউয়ারি সহ)
//   const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
//   const data = await response.json();
//   const products: Product[] = data.products;

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-black text-5xl font-bold mb-2">Marketplace</h1>
        
//         {/* ৪. সার্চ বার (Server-side Search) */}
//         {/* এখানে form সাবমিট করলে এটি অটোমেটিক URL-এ ?q=input_value যোগ করে দেয় */}
//         <form className="mb-8">
//            <input 
//              name="q" // এই name টাই মূলত URL এর 'q'
//              defaultValue={query} // আগের সার্চ করা লেখাটি বক্সে ধরে রাখার জন্য
//              placeholder="Search products (e.g. iPhone, Laptop)..."
//              className="w-full p-4 border border-gray-300 rounded-xl text-black shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
//            />
//            <button type="submit" className="hidden">Search</button>
//         </form>

//         <p className="text-gray-700 mb-8 font-medium">
//           {products.length > 0 ? `${products.length} items found` : "No products found."}
//         </p>

//         {/* ৫. প্রোডাক্ট গ্রিড এবং ম্যাপিং */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {products.map((product: Product) => (
//             <div key={product.id} className="flex flex-col bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden">
//               {/* ইমেজ সেকশন */}
//               <div className="h-48 overflow-hidden bg-gray-200">
//                 <img 
//                   src={product.thumbnail} 
//                   alt={product.title} 
//                   className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500" 
//                 />
//               </div>
              
//               {/* কন্টেন্ট সেকশন */}
//               <div className="flex flex-col flex-grow p-5">
//                 <h2 className="text-lg text-black font-bold line-clamp-1 mb-2">
//                   {product.title}
//                 </h2>
//                 <p className="text-sm text-gray-500 line-clamp-2 mb-4">
//                   {product.description}
//                 </p>
                
//                 <div className="mt-auto">
//                   <div className="flex justify-between items-center mb-4">
//                     <span className="text-blue-600 text-xl font-extrabold">
//                       ${product.price}
//                     </span>
//                     <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-md text-sm font-bold">
//                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="lucide lucide-star">
//                         <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
//                       </svg>
//                       {product.rating}
//                     </div>
//                   </div>

//                   <button className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200">
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page

// "use client";

// import React from 'react';

// // ১. আপনার দেওয়া JSON অনুযায়ী Interface আপডেট করা হয়েছে
// interface Product {
//   id: number;
//   title: string;
//   description: string;
//   category: string;
//   price: number;
//   rating: number;
//   brand: string;
//   images: string[];
//   thumbnail?: string; // যদি আগের কোড ব্যবহার করতে চান
// }

// export default async function Page({
//   searchParams,
// }: {
//   searchParams: { q?: string; category?: string };
// }) {
//   // URL থেকে q এবং category নেওয়া হচ্ছে
//   const query = searchParams.q || "";
//   const category = searchParams.category || "";

//   // ২. ডায়নামিক API URL তৈরি
//   let apiUrl = `https://dummyjson.com/products`;

//   if (query) {
//     apiUrl = `https://dummyjson.com/products/search?q=${query}`;
//   } else if (category) {
//     apiUrl = `https://dummyjson.com/products/category/${category}`;
//   }

//   const response = await fetch(apiUrl);
//   const data = await response.json();
//   const products: Product[] = data.products;

//   // ক্যাটাগরির লিস্ট (এটিও আপনি API থেকে আনতে পারেন, এখানে হার্ডকোডেড দেওয়া হলো)
//   const categories = ["beauty", "fragrances", "furniture", "groceries"];

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-black text-4xl font-extrabold mb-6">Store Explorer</h1>

//         {/* ৩. ফিল্টার সেকশন (Search + Category) */}
//         <div className="bg-white p-4 rounded-xl shadow-sm mb-8 flex flex-col md:flex-row gap-4">
          
//           {/* Search Form */}
//           <form className="flex-1 flex gap-2">
//             <input
//               name="q"
//               defaultValue={query}
//               placeholder="Search products..."
//               className="w-full p-3 border rounded-lg text-black outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
//               Search
//             </button>
//           </form>

//           {/* Category Filter (এটি একটি সাধারণ ড্রপডাউন যা URL পরিবর্তন করবে) */}
//           <form>
//             <select 
//               name="category" 
//               defaultValue={category}
//               onChange={(e) => {
//                 // ফর্মটি অটো সাবমিট করার জন্য ছোট একটি ট্রিক
//                 e.target.form?.submit();
//               }}
//               className="p-3 border rounded-lg text-black bg-white outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">All Categories</option>
//               {categories.map((cat) => (
//                 <option key={cat} value={cat}>{cat.toUpperCase()}</option>
//               ))}
//             </select>
//           </form>
//         </div>

//         <p className="text-gray-600 mb-6 font-semibold">
//           Showing {products.length} products 
//           {query && ` for "${query}"`} 
//           {category && ` in "${category}"`}
//         </p>

//         {/* ৪. প্রোডাক্ট কার্ড গ্রিড */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {products.map((product) => (
//             <div key={product.id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              
//               {/* প্রোডাক্ট ইমেজ (images[0] ব্যবহার করা হয়েছে) */}
//               <div className="relative h-56 bg-gray-100">
//                 <img
//                   src={product.images[0]}
//                   alt={product.title}
//                   className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
//                 />
//                 <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-700 uppercase">
//                   {product.category}
//                 </div>
//               </div>

//               {/* ডিটেইলস */}
//               <div className="p-5 flex flex-col flex-grow">
//                 <div className="flex justify-between items-start mb-2">
//                   <h2 className="text-lg font-bold text-gray-900 line-clamp-1">{product.title}</h2>
//                 </div>
                
//                 <p className="text-sm text-gray-500 line-clamp-2 mb-4">{product.description}</p>
                
//                 <div className="mt-auto pt-4 flex items-center justify-between border-t">
//                   <div>
//                     <span className="text-2xl font-black text-blue-600">${product.price}</span>
//                   </div>
//                   <div className="flex items-center text-yellow-500 font-bold">
//                     ★ {product.rating}
//                   </div>
//                 </div>
                
//                 <button className="w-full mt-4 bg-gray-900 text-white py-2.5 rounded-xl font-medium hover:bg-black transition-all">
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         {products.length === 0 && (
//           <div className="text-center py-20 text-gray-400">
//             No products found matching your filter.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }