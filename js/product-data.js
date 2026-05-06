/* =============================================================
   INFINITY MERCHANDISE — Product Data
   Product categories with sub-products and descriptions.
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
            'Summer Wear', 'Indian Ethnic Wear', 'Sarees', 'US Style Wear',
            'Abayas & Modest Wear', 'Kurtis & Tunics', 'Indo-Western Wear', 'Swimwear',
            'Gym & Active Wear', 'Casual Wear', 'Formal Wear', 'Party Wear',
            'Loungewear & Nightwear', 'Fashion & Designer Wear'
        ],
        subImages: [
            'images/compressed/dress/Kids Wear Boys Girls.webp',
            'images/compressed/dress/Mens Wear (1).webp',
            'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=1080&q=80',
            'images/compressed/dress/European Wear (1).webp',
            'images/compressed/dress/Winter Wear.webp',
            'images/compressed/dress/Casual Wear (1).webp',
            'images/compressed/dress/Indian Ethnic Wear (1).webp',
            'images/compressed/dress/Saree (1).webp',
            'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1080&q=80',
            'images/compressed/dress/Abaya (2).webp',
            'images/compressed/dress/Kurtis and Tunics (1).webp',
            'images/compressed/dress/Indo Western.webp',
            'images/compressed/dress/Swimwear.webp',
            'images/compressed/dress/Gym Wear (1).webp',
            'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1080&q=80',
            'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1080&q=80',
            'images/compressed/dress/Formal Wear (1).webp',
            'images/compressed/dress/Loungewear and Nightwear.webp',
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
    'furnitures': {
        id: 'furnitures',
        name: 'Furnitures',
        tagline: 'Functional design for homes, workplaces, and hospitality.',
        description: 'Outfit any space with durable, well-crafted furniture sourced from leading manufacturers. We supply homes, offices, restaurants, and hotels — covering everything from individual workstations to full fit-outs at bulk pricing.',
        image: 'images/compressed/Furniture/Modular Office Furniture.webp',
        checkboxValue: 'Furnitures',
        subProducts: [
            'Home Furniture', 'Restaurant Furniture', 'Hotel Furnitures', 'Luxury Sofas',
            'Office Chairs', 'Workstations & Cubicles', 'Office Tables & Desks',
            'Conference Tables', 'Storage Cabinets', 'Reception Furniture',
            'Modular Office Furniture'
        ],
        subImages: [
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1080&q=80',
            'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1080&q=80',
            'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1080&q=80',
            'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1080&q=80',
            'images/compressed/Furniture/Office Chair.webp',
            'images/compressed/Furniture/Work Station.webp',
            'images/compressed/Furniture/Office Desk (1).webp',
            'images/compressed/Furniture/Conference Tables.webp',
            'images/compressed/Furniture/Storage Cabinets.webp',
            'images/compressed/Furniture/Reception Furnitures (1).webp',
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
            'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=1080&q=80',
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
            'images/placeholders/plastic-processing.svg',
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
    'arcade-games': {
        id: 'arcade-games',
        name: 'Arcade Games',
        tagline: 'Entertainment experiences for every venue.',
        description: 'We source arcade and amusement equipment for entertainment centers, malls, hotels, and family venues. From classic coin-operated cabinets to modern VR and motion simulators, our supplier network delivers fully tested machines with installation and service support.',
        image: 'images/placeholders/arcade-cabinets.jpg',
        checkboxValue: 'Arcade Games',
        subProducts: [
            'Arcade Cabinets', 'Claw & Prize Machines', 'Racing Simulators',
            'VR Arcade Games', 'Air Hockey & Table Games', 'Basketball & Sports Games',
            'Coin-Operated Kids Rides', 'Redemption Game Machines'
        ],
        subImages: [
            'images/placeholders/arcade-cabinets.jpg',
            'https://images.unsplash.com/photo-1533236897111-3e94666b2edf?w=1080&q=80',
            'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1080&q=80',
            'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=1080&q=80',
            'https://images.unsplash.com/photo-1511882150382-421056c89033?w=1080&q=80',
            'https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=1080&q=80',
            'images/placeholders/coin-operated-rides.svg',
            'images/placeholders/redemption-game.svg'
        ]
    }
};
