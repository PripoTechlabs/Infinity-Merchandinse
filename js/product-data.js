/* =============================================================
   INFINITY MERCHANDISE — Product Data
   All 15 product categories with sub-products and descriptions.
   Used by product.html via product-page.js
   ============================================================= */

const PRODUCT_DATA = {
    'textiles-apparel': {
        id: 'textiles-apparel',
        name: 'Textiles & Apparel',
        tagline: 'Global fashion, sourced at origin.',
        description: 'From everyday essentials to designer collections, we source a complete range of textile and apparel products from manufacturing hubs across Asia. Whether you need bulk orders or specialized varieties, we connect you directly with reliable factories — ensuring quality, competitive pricing, and on-time delivery.',
        image: 'images/compressed/dress/Formal Wear (1).webp',
        checkboxValue: 'Textiles & Apparel',
        subProducts: [
            'Kids Wear', "Men's Wear", "Women's Wear", 'Western Wear', 'Winter Wear',
            'Summer Wear', 'Indian Ethnic Wear', 'Sarees', 'European Style Wear', 'US Style Wear',
            'Abayas & Modest Wear', 'Kurtis & Tunics', 'Indo-Western Wear', 'Swim Wear',
            'Gym & Active Wear', 'Casual Wear', 'Formal Wear', 'Party Wear',
            'Loungewear & Nightwear', 'Fashion & Designer Wear'
        ],
        subImages: [
            'images/compressed/dress/Kids Wear Boys Girls.webp',
            'images/compressed/dress/Mens Wear (1).webp',
            'images/compressed/dress/European Wear (1).webp',
            'images/compressed/dress/European Wear (1).webp',
            'images/compressed/dress/Formal Wear (1).webp',
            'images/compressed/dress/Casual Wear (1).webp',
            'images/compressed/dress/Indian Ethnic Wear (1).webp',
            'images/compressed/dress/Saree (1).webp',
            'images/compressed/dress/European Wear (1).webp',
            'images/compressed/dress/Casual Wear (1).webp',
            'images/compressed/dress/Abaya (2).webp',
            'images/compressed/dress/Kurtis and Tunics (1).webp',
            'images/compressed/dress/Indo Western.webp',
            'images/compressed/dress/Gym Wear (1).webp',
            'images/compressed/dress/Gym Wear (1).webp',
            'images/compressed/dress/Casual Wear (1).webp',
            'images/compressed/dress/Formal Wear (1).webp',
            'images/compressed/dress/Designer Wear.webp',
            'images/compressed/dress/Casual Wear (1).webp',
            'images/compressed/dress/Designer Wear.webp'
        ]
    },
    'shoes-footwear': {
        id: 'shoes-footwear',
        name: 'Shoes & Footwear',
        tagline: 'Style, comfort, and performance for all markets.',
        description: 'We source an extensive range of footwear — from safety boots for industrial clients to fashion-forward designer shoes for retail. Our supplier network spans India, Vietnam, and China, covering all styles, sizes, and price points for B2B buyers worldwide.',
        image: 'images/compressed/Footwear/Mens Formal Shoe.webp',
        checkboxValue: 'Footwear',
        subProducts: [
            "Men's Formal Shoes", "Men's Casual Shoes", "Women's Heels & Flats",
            'Sneakers & Sports Shoes', 'Sandals & Slippers', 'Safety Shoes',
            'Kids Footwear', 'Leather Shoes', 'Fashion & Designer Footwear'
        ],
        subImages: [
            'images/compressed/Footwear/Mens Formal Shoe.webp',
            "images/compressed/Footwear/Men's Casual Shoes.jpg.webp",
            'images/compressed/Footwear/Women Heels and Flats (1).webp',
            'images/compressed/Footwear/Sneakers and Sport Shoes.webp',
            'images/compressed/Footwear/Sandals and Slippers.webp',
            'images/compressed/Footwear/Safety Shoe (1).webp',
            'images/compressed/Footwear/Kids Shoe (1).webp',
            'images/compressed/Footwear/Leather Shoe (1).webp',
            'images/compressed/Footwear/Designer Fashion.webp'
        ]
    },
    'textile-accessories': {
        id: 'textile-accessories',
        name: 'Textile Accessories',
        tagline: 'Finishing touches that define fashion.',
        description: 'The right accessory completes every garment. We supply a full range of textile accessories — from buttons and zippers to embroidery threads — sourced directly from specialized manufacturers. Ideal for garment factories, fashion brands, and boutique studios seeking reliable bulk supply.',
        image: 'images/textile.png',
        checkboxValue: 'Textile Accessories',
        subProducts: [
            'Buttons & Zippers', 'Labels & Tags', 'Laces & Elastics',
            'Threads & Yarns', 'Embroidery Accessories', 'Patches & Badges', 'Trimmings & Borders'
        ]
    },
    'corporate-gifts': {
        id: 'corporate-gifts',
        name: 'Corporate Gifts',
        tagline: 'Meaningful gifts that represent your brand.',
        description: 'Make a lasting impression with premium corporate gifts tailored to your brand identity. From customized executive sets to eco-friendly promotional hampers, we handle sourcing, branding, and bulk packaging — helping businesses across the GCC, Europe, and beyond strengthen relationships at every occasion.',
        image: 'images/compressed/corporate gift/Customized Corporate Gifts.webp',
        checkboxValue: 'Corporate Gifts',
        subProducts: [
            'Customized Corporate Gifts', 'Promotional Gift Items', 'Executive Gift Sets',
            'Office Utility Gifts', 'Eco-Friendly Gifts', 'Festival & Event Gifts',
            'Branded Merchandise', 'Premium Gift Hampers'
        ],
        subImages: [
            'images/compressed/corporate gift/Customized Corporate Gifts.webp',
            'images/compressed/corporate gift/Promotional Gifts Image.webp',
            'images/compressed/corporate gift/Executive Gift Set.webp',
            'images/compressed/corporate gift/Office Utility Items.webp',
            'images/compressed/corporate gift/Eco Friendly Gift.webp',
            'images/compressed/corporate gift/Festival Gift Hamper.webp',
            'images/compressed/corporate gift/Branded Merchandise.webp',
            'images/compressed/corporate gift/Premium Gift Hamper.webp'
        ]
    },
    'stationery': {
        id: 'stationery',
        name: 'Stationery Items',
        tagline: 'Everyday essentials for office, school, and institutions.',
        description: 'We supply high-quality stationery products for corporate offices, educational institutions, and retail chains. From writing instruments to customized notebooks, our stationery range is competitively priced for bulk procurement with options for branded packaging and custom printing.',
        image: 'images/compressed/Stationeries/Stationery Items.webp',
        checkboxValue: 'Stationery',
        subProducts: [
            'Office Stationery', 'School Stationery', 'Writing Instruments',
            'Paper Products', 'Files & Folders', 'Desk Accessories',
            'Notebooks & Diaries', 'Customized Stationery'
        ],
        subImages: [
            'images/compressed/Stationeries/Office Items (1).webp',
            'images/compressed/Stationeries/School Items (1).webp',
            'images/compressed/Stationeries/Pens (1).webp',
            'images/compressed/Stationeries/Paper Items (1).webp',
            'images/compressed/Stationeries/Office Items (1).webp',
            'images/compressed/Stationeries/Desk Acc (1).webp',
            'images/compressed/Stationeries/Dairy Image.webp',
            'images/compressed/Stationeries/Customised Items (1).webp'
        ]
    },
    'office-furniture': {
        id: 'office-furniture',
        name: 'Office Furniture',
        tagline: 'Functional design for productive workplaces.',
        description: 'Outfit your workspace with durable, ergonomic furniture sourced from leading manufacturers. We cater to corporate offices, co-working spaces, hospitality setups, and institutions — providing everything from individual workstations to full office fit-outs at bulk pricing.',
        image: 'images/compressed/Furniture/Modular Office Furniture.webp',
        checkboxValue: 'Office Furniture',
        subProducts: [
            'Office Chairs', 'Workstations & Cubicles', 'Office Tables & Desks',
            'Conference Tables', 'Storage Cabinets', 'Reception Furniture',
            'Ergonomic Furniture', 'Modular Office Furniture'
        ],
        subImages: [
            'images/compressed/Furniture/Office Chair.webp',
            'images/compressed/Furniture/Work Station.webp',
            'images/compressed/Furniture/Office Desk (1).webp',
            'images/compressed/Furniture/Conference Tables.webp',
            'images/compressed/Furniture/Storage Cabinets.webp',
            'images/compressed/Furniture/Reception Furnitures (1).webp',
            'images/compressed/Furniture/Ergonomic Furniture (1).webp',
            'images/compressed/Furniture/Modular Office Furniture.webp'
        ]
    },
    'wall-decor': {
        id: 'wall-decor',
        name: 'Wall Paintings & Home Décor',
        tagline: 'Art that transforms spaces.',
        description: 'Elevate interiors with curated wall art and home décor pieces sourced globally. From canvas paintings to customized wall installations, we supply hotels, interior designers, retail showrooms, and homeowners with premium décor that blends aesthetics with affordability.',
        image: 'images/compressed/Wall Paintings and Decor/Modern Wall Decor.webp',
        checkboxValue: 'Home Decor',
        subProducts: [
            'Canvas Paintings', 'Framed Art', 'Abstract Art', 'Modern Wall Decor',
            'Traditional & Cultural Art', 'Customized Wall Art', 'Office & Home Decor'
        ],
        subImages: [
            'images/compressed/Wall Paintings and Decor/Canvas Painting (1).webp',
            'images/compressed/Wall Paintings and Decor/Framed Art (1).webp',
            'images/compressed/Wall Paintings and Decor/Abstract Art.webp',
            'images/compressed/Wall Paintings and Decor/Modern Wall Decor.webp',
            'images/compressed/Wall Paintings and Decor/Traditional Cultural Art.webp',
            'images/compressed/Wall Paintings and Decor/Custom Wall Art.png.webp',
            'images/compressed/Wall Paintings and Decor/Office Home Decor.webp'
        ]
    },
    'dry-fruits': {
        id: 'dry-fruits',
        name: 'Dry Fruits & Dates',
        tagline: 'Premium quality, globally sourced.',
        description: 'We source premium dry fruits and dates directly from producing regions — Afghanistan, Iran, California, and beyond. Ideal for food distributors, gift packaging companies, supermarkets, and HORECA businesses seeking consistent quality at competitive wholesale prices.',
        image: 'images/compressed/Dry Fruits and Nuts/Mixed Dry Fruits (1).webp',
        checkboxValue: 'Dry Fruits',
        subProducts: [
            'Almonds', 'Cashews', 'Pistachios', 'Walnuts',
            'Raisins', 'Dates', 'Mixed Dry Fruits', 'Gift Packs & Bulk Supply'
        ],
        subImages: [
            'images/compressed/Dry Fruits and Nuts/Almonds (1).webp',
            'images/compressed/Dry Fruits and Nuts/Cashews (1).webp',
            'images/compressed/Dry Fruits and Nuts/Pistachios (1).webp',
            'images/compressed/Dry Fruits and Nuts/Walnuts (1).webp',
            'images/compressed/Dry Fruits and Nuts/Raisins (1).webp',
            'images/compressed/Dry Fruits and Nuts/Image Converter Dates.webp',
            'images/compressed/Dry Fruits and Nuts/Mixed Dry Fruits (1).webp',
            'images/compressed/Dry Fruits and Nuts/Gift Packs and Bulk Supply.webp'
        ]
    },
    'electronics': {
        id: 'electronics',
        name: 'Small Electronics Items',
        tagline: 'Compact technology for daily use.',
        description: 'We source a wide range of consumer electronics and tech accessories from reliable manufacturers in China and across Asia. From power banks to LED lighting solutions, our electronics range is ideal for retailers, distributors, and corporate gifting — available in bulk with custom branding options.',
        image: 'images/compressed/Small Electronics Items/Promotional Electronics.webp',
        checkboxValue: 'Electronics',
        subProducts: [
            'Chargers & Adapters', 'Power Banks', 'Earphones & Headphones',
            'Smart Accessories', 'LED Lights', 'Cables & Connectors', 'Promotional Electronics'
        ],
        subImages: [
            'images/compressed/Small Electronics Items/Chargers and Adaptor (1).webp',
            'images/compressed/Small Electronics Items/Power Banks.webp',
            'images/compressed/Small Electronics Items/Earphones and Headphones.webp',
            'images/compressed/Small Electronics Items/Smart Accessories.webp',
            'images/compressed/Small Electronics Items/LED Lights.webp',
            'images/compressed/Small Electronics Items/Cables and Connectors (1).webp',
            'images/compressed/Small Electronics Items/Promotional Electronics.webp'
        ]
    },
    'kitchen-utilities': {
        id: 'kitchen-utilities',
        name: 'Kitchen Utilities & Machineries',
        tagline: 'Efficiency meets innovation.',
        description: 'From domestic kitchen essentials to commercial-grade processing machinery, we supply a comprehensive range of kitchen products. Ideal for hospitality chains, food businesses, retailers, and institutional buyers looking for dependable quality at scale.',
        image: 'images/compressed/Kitchen/Commercial Kitchen Equipment.webp',
        checkboxValue: 'Kitchen Utilities',
        subProducts: [
            'Kitchen Utensils', 'Cookware Sets', 'Storage Containers',
            'Small Kitchen Appliances', 'Commercial Kitchen Equipment',
            'Food Processing Machines', 'Hotel & Restaurant Kitchen Tools'
        ],
        subImages: [
            'images/compressed/Kitchen/Kitchen Utensils (1).webp',
            'images/compressed/Kitchen/Cookware Set (1).webp',
            'images/compressed/Kitchen/Storage Containers.webp',
            'images/compressed/Kitchen/Small Kitchen Appliance.webp',
            'images/compressed/Kitchen/Commercial Kitchen Equipment.webp',
            'images/compressed/Kitchen/Food Processing Line 1x1.webp',
            'images/compressed/Kitchen/Hotel Restaurant Kitchen Tools.webp'
        ]
    },
    'commercial-machinery': {
        id: 'commercial-machinery',
        name: 'Imported Commercial Machinery',
        tagline: 'Industrial solutions sourced globally.',
        description: 'We facilitate the import of commercial and industrial machinery from leading global manufacturers. Whether you need food processing lines, packaging equipment, or construction machinery, our team handles sourcing, compliance documentation, and end-to-end logistics.',
        image: 'images/compressed/Imported Commercial Machinery/Automation Production Line Machinery.webp',
        checkboxValue: 'Machinery',
        subProducts: [
            'Food Processing Machinery', 'Packaging Machines', 'Printing Machines',
            'Construction Equipment', 'Material Handling Equipment', 'CNC Machines',
            'Plastic Processing Machines', 'Metal Fabrication Machines', 'Woodworking Machines',
            'Cleaning & Maintenance Machines', 'Bakery & Confectionery Machines',
            'Hotel & Restaurant Equipment', 'Automation & Production Line Machinery'
        ],
        subImages: [
            'images/compressed/Imported Commercial Machinery/Food Processing Machinery.webp',
            'images/compressed/Imported Commercial Machinery/Packaging Machines.webp',
            'images/compressed/Imported Commercial Machinery/Printing Machines (1).webp',
            'images/compressed/Imported Commercial Machinery/Construction Equipment.webp',
            'images/compressed/Imported Commercial Machinery/Material Handling Equipment.webp',
            'images/compressed/Imported Commercial Machinery/CNC Machines.webp',
            'images/compressed/Imported Commercial Machinery/Metal Fabrication Machines.webp',
            'images/compressed/Imported Commercial Machinery/Metal Fabrication Machines.webp',
            'images/compressed/Imported Commercial Machinery/Woodworking Machines.webp',
            'images/compressed/Imported Commercial Machinery/Cleaning and Maintenance Machines.webp',
            'images/compressed/Imported Commercial Machinery/Bakery Confectionery Machines.webp',
            'images/compressed/Imported Commercial Machinery/Hotel Restaurant Equipment.webp',
            'images/compressed/Imported Commercial Machinery/Automation Production Line Machinery.webp'
        ]
    },
    'toys': {
        id: 'toys',
        name: 'Toys',
        tagline: 'Fun, safe, and educational.',
        description: 'We source a diverse range of toys for retailers, distributors, and gifting companies — from educational learning toys to promotional giveaways. Our supplier network ensures product safety standards are met, with options for custom branding and bulk packaging.',
        image: 'images/compressed/Toys/Kids Learning Toy (1).webp',
        checkboxValue: 'Toys',
        subProducts: [
            'Educational Toys', 'Kids Learning Toys', 'Soft Toys', 'Plastic Toys',
            'Electronic Toys', 'Board Games', 'Outdoor Toys', 'Promotional & Gift Toys'
        ],
        subImages: [
            'images/compressed/Toys/Educational Toy (1).webp',
            'images/compressed/Toys/Kids Learning Toy (1).webp',
            'images/compressed/Toys/Soft Toys (1).webp',
            'images/compressed/Toys/Plastic Toy (1).webp',
            'images/compressed/Toys/Electronic Toys (1).webp',
            'images/compressed/Toys/Board Games (1).webp',
            'images/compressed/Toys/Outdoor Toy (1).webp',
            'images/compressed/Toys/Promotional Gift Toys.webp'
        ]
    },
    'promotional-merchandise': {
        id: 'promotional-merchandise',
        name: 'Promotional Merchandise',
        tagline: 'Brand visibility through everyday products.',
        description: 'Turn everyday items into powerful brand touchpoints. We source customized promotional merchandise for marketing campaigns, trade exhibitions, corporate events, and loyalty programs — combining competitive pricing with high-quality branding across a wide range of product categories.',
        image: 'images/compressed/Promotional Merchandise/Event Exhibition Giveaways.webp',
        checkboxValue: 'Promotional Merchandise',
        subProducts: [
            'Branded Apparel', 'Promotional Bags', 'Customized Stationery',
            'Drinkware (Mugs, Bottles, Tumblers)', 'Tech Promotional Items (USBs, Power Banks)',
            'Office Desk Accessories', 'Eco-Friendly Promotional Products',
            'Event & Exhibition Giveaways', 'Festival & Seasonal Merchandise', 'Premium Executive Gifts'
        ],
        subImages: [
            'images/compressed/Promotional Merchandise/Branded Apparel.webp',
            'images/compressed/Promotional Merchandise/Promotional Bags.webp',
            'images/compressed/Promotional Merchandise/Customized Stationery.webp',
            'images/compressed/Promotional Merchandise/Drinkware Mugs Bottles Tumblers.webp',
            'images/compressed/Promotional Merchandise/Tech Promotional Items.webp',
            'images/compressed/Promotional Merchandise/Office Desk Accessories.webp',
            'images/compressed/Promotional Merchandise/Eco-Friendly Promotional Products.webp',
            'images/compressed/Promotional Merchandise/Event Exhibition Giveaways.webp',
            'images/compressed/Promotional Merchandise/Festival Seasonal Merchandise.webp',
            'images/compressed/Promotional Merchandise/ChatGPT Image Mar 27 2026.webp'
        ]
    },
    'wholesale-goods': {
        id: 'wholesale-goods',
        name: 'Wholesale Consumer Goods',
        tagline: 'High-demand products for bulk trade.',
        description: 'We supply a broad range of high-turnover consumer goods for wholesalers, distributors, supermarkets, and e-commerce businesses. Our sourcing network delivers consistent quality across household products, personal care, and fast-moving consumer goods — at competitive bulk pricing with flexible order quantities.',
        image: 'images/compressed/Wholesale Consumer Goods/Fast Moving Consumer Goods.webp',
        checkboxValue: 'Consumer Goods',
        subProducts: [
            'Household Items', 'Daily Utility Products', 'Home & Living Products',
            'Personal Care Items', 'Cleaning Products', 'Plastic & Storage Products',
            'Travel & Lifestyle Accessories', 'Fast-Moving Consumer Goods (FMCG)', 'General Merchandise Items'
        ],
        subImages: [
            'images/compressed/Wholesale Consumer Goods/Household Items.webp',
            'images/compressed/Wholesale Consumer Goods/Daily Utility Products.webp',
            'images/compressed/Wholesale Consumer Goods/Home Living Products.webp',
            'images/compressed/Wholesale Consumer Goods/Personal Care Items.webp',
            'images/compressed/Wholesale Consumer Goods/Cleaning Products.webp',
            'images/compressed/Wholesale Consumer Goods/Plastic Storage Products.webp',
            'images/compressed/Wholesale Consumer Goods/Travel Lifestyle Accessories.webp',
            'images/compressed/Wholesale Consumer Goods/Fast Moving Consumer Goods.webp',
            'images/compressed/Wholesale Consumer Goods/General Merchandise Items.webp'
        ]
    },
    'textile-machinery': {
        id: 'textile-machinery',
        name: 'Textile Machineries',
        tagline: 'Powering production with precision.',
        description: 'We source and import textile machinery from established manufacturers across Asia and Europe. From spinning and weaving to dyeing and finishing — our machinery sourcing service supports textile mills, garment factories, and production facilities with reliable equipment, technical documentation, and after-sales support coordination.',
        image: 'images/compressed/Textile Machineries/Textile Processing Equipment.webp',
        checkboxValue: 'Textile Machinery',
        subProducts: [
            'Spinning Machines', 'Weaving Machines', 'Knitting Machines',
            'Dyeing & Finishing Machines', 'Embroidery Machines',
            'Cutting & Sewing Machines', 'Textile Processing Equipment'
        ],
        subImages: [
            'images/compressed/Textile Machineries/Spinning Machines.webp',
            'images/compressed/Textile Machineries/Weaving Machines.webp',
            'images/compressed/Textile Machineries/Knitting Version (1).webp',
            'images/compressed/Textile Machineries/Dyeing Finishing Machines.webp',
            'images/compressed/Textile Machineries/Embroidery Machines.webp',
            'images/compressed/Textile Machineries/Cutting and Sewing Machines.webp',
            'images/compressed/Textile Machineries/Textile Processing Equipment.webp'
        ]
    }
};
