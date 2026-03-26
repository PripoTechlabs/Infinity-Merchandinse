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
        image: 'images/textile.png',
        checkboxValue: 'Textiles & Apparel',
        subProducts: [
            'Kids Wear', "Men's Wear", "Women's Wear", 'Western Wear', 'Winter Wear',
            'Summer Wear', 'Indian Ethnic Wear', 'Sarees', 'European Style Wear', 'US Style Wear',
            'Abayas & Modest Wear', 'Kurtis & Tunics', 'Indo-Western Wear', 'Swim Wear',
            'Gym & Active Wear', 'Casual Wear', 'Formal Wear', 'Party Wear',
            'Loungewear & Nightwear', 'Fashion & Designer Wear'
        ]
    },
    'shoes-footwear': {
        id: 'shoes-footwear',
        name: 'Shoes & Footwear',
        tagline: 'Style, comfort, and performance for all markets.',
        description: 'We source an extensive range of footwear — from safety boots for industrial clients to fashion-forward designer shoes for retail. Our supplier network spans India, Vietnam, and China, covering all styles, sizes, and price points for B2B buyers worldwide.',
        image: 'images/shoe.png',
        checkboxValue: 'Footwear',
        subProducts: [
            "Men's Formal Shoes", "Men's Casual Shoes", "Women's Heels & Flats",
            'Sneakers & Sports Shoes', 'Sandals & Slippers', 'Safety Shoes',
            'Kids Footwear', 'Leather Shoes', 'Fashion & Designer Footwear'
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
        image: 'images/gifts.png',
        checkboxValue: 'Corporate Gifts',
        subProducts: [
            'Customized Corporate Gifts', 'Promotional Gift Items', 'Executive Gift Sets',
            'Office Utility Gifts', 'Eco-Friendly Gifts', 'Festival & Event Gifts',
            'Branded Merchandise', 'Premium Gift Hampers'
        ]
    },
    'stationery': {
        id: 'stationery',
        name: 'Stationery Items',
        tagline: 'Everyday essentials for office, school, and institutions.',
        description: 'We supply high-quality stationery products for corporate offices, educational institutions, and retail chains. From writing instruments to customized notebooks, our stationery range is competitively priced for bulk procurement with options for branded packaging and custom printing.',
        image: 'images/corporate.png',
        checkboxValue: 'Stationery',
        subProducts: [
            'Office Stationery', 'School Stationery', 'Writing Instruments',
            'Paper Products', 'Files & Folders', 'Desk Accessories',
            'Notebooks & Diaries', 'Customized Stationery'
        ]
    },
    'office-furniture': {
        id: 'office-furniture',
        name: 'Office Furniture',
        tagline: 'Functional design for productive workplaces.',
        description: 'Outfit your workspace with durable, ergonomic furniture sourced from leading manufacturers. We cater to corporate offices, co-working spaces, hospitality setups, and institutions — providing everything from individual workstations to full office fit-outs at bulk pricing.',
        image: 'images/br1.png',
        checkboxValue: 'Office Furniture',
        subProducts: [
            'Office Chairs', 'Workstations & Cubicles', 'Office Tables & Desks',
            'Conference Tables', 'Storage Cabinets', 'Reception Furniture',
            'Ergonomic Furniture', 'Modular Office Furniture'
        ]
    },
    'wall-decor': {
        id: 'wall-decor',
        name: 'Wall Paintings & Home Décor',
        tagline: 'Art that transforms spaces.',
        description: 'Elevate interiors with curated wall art and home décor pieces sourced globally. From canvas paintings to customized wall installations, we supply hotels, interior designers, retail showrooms, and homeowners with premium décor that blends aesthetics with affordability.',
        image: 'images/br4.png',
        checkboxValue: 'Home Decor',
        subProducts: [
            'Canvas Paintings', 'Framed Art', 'Abstract Art', 'Modern Wall Decor',
            'Traditional & Cultural Art', 'Customized Wall Art', 'Office & Home Decor'
        ]
    },
    'dry-fruits': {
        id: 'dry-fruits',
        name: 'Dry Fruits & Dates',
        tagline: 'Premium quality, globally sourced.',
        description: 'We source premium dry fruits and dates directly from producing regions — Afghanistan, Iran, California, and beyond. Ideal for food distributors, gift packaging companies, supermarkets, and HORECA businesses seeking consistent quality at competitive wholesale prices.',
        image: 'images/br5.png',
        checkboxValue: 'Dry Fruits',
        subProducts: [
            'Almonds', 'Cashews', 'Pistachios', 'Walnuts',
            'Raisins', 'Dates', 'Mixed Dry Fruits', 'Gift Packs & Bulk Supply'
        ]
    },
    'electronics': {
        id: 'electronics',
        name: 'Small Electronics Items',
        tagline: 'Compact technology for daily use.',
        description: 'We source a wide range of consumer electronics and tech accessories from reliable manufacturers in China and across Asia. From power banks to LED lighting solutions, our electronics range is ideal for retailers, distributors, and corporate gifting — available in bulk with custom branding options.',
        image: 'images/br2.png',
        checkboxValue: 'Electronics',
        subProducts: [
            'Chargers & Adapters', 'Power Banks', 'Earphones & Headphones',
            'Smart Accessories', 'LED Lights', 'Cables & Connectors', 'Promotional Electronics'
        ]
    },
    'kitchen-utilities': {
        id: 'kitchen-utilities',
        name: 'Kitchen Utilities & Machineries',
        tagline: 'Efficiency meets innovation.',
        description: 'From domestic kitchen essentials to commercial-grade processing machinery, we supply a comprehensive range of kitchen products. Ideal for hospitality chains, food businesses, retailers, and institutional buyers looking for dependable quality at scale.',
        image: 'images/br3.png',
        checkboxValue: 'Kitchen Utilities',
        subProducts: [
            'Kitchen Utensils', 'Cookware Sets', 'Storage Containers',
            'Small Kitchen Appliances', 'Commercial Kitchen Equipment',
            'Food Processing Machines', 'Hotel & Restaurant Kitchen Tools'
        ]
    },
    'commercial-machinery': {
        id: 'commercial-machinery',
        name: 'Imported Commercial Machinery',
        tagline: 'Industrial solutions sourced globally.',
        description: 'We facilitate the import of commercial and industrial machinery from leading global manufacturers. Whether you need food processing lines, packaging equipment, or construction machinery, our team handles sourcing, compliance documentation, and end-to-end logistics.',
        image: 'images/br1.png',
        checkboxValue: 'Machinery',
        subProducts: [
            'Food Processing Machinery', 'Packaging Machines', 'Printing Machines',
            'Construction Equipment', 'Material Handling Equipment', 'CNC Machines',
            'Plastic Processing Machines', 'Metal Fabrication Machines', 'Woodworking Machines',
            'Cleaning & Maintenance Machines', 'Bakery & Confectionery Machines',
            'Hotel & Restaurant Equipment', 'Automation & Production Line Machinery'
        ]
    },
    'toys': {
        id: 'toys',
        name: 'Toys',
        tagline: 'Fun, safe, and educational.',
        description: 'We source a diverse range of toys for retailers, distributors, and gifting companies — from educational learning toys to promotional giveaways. Our supplier network ensures product safety standards are met, with options for custom branding and bulk packaging.',
        image: 'images/br6.png',
        checkboxValue: 'Toys',
        subProducts: [
            'Educational Toys', 'Kids Learning Toys', 'Soft Toys', 'Plastic Toys',
            'Electronic Toys', 'Board Games', 'Outdoor Toys', 'Promotional & Gift Toys'
        ]
    },
    'promotional-merchandise': {
        id: 'promotional-merchandise',
        name: 'Promotional Merchandise',
        tagline: 'Brand visibility through everyday products.',
        description: 'Turn everyday items into powerful brand touchpoints. We source customized promotional merchandise for marketing campaigns, trade exhibitions, corporate events, and loyalty programs — combining competitive pricing with high-quality branding across a wide range of product categories.',
        image: 'images/gifts.png',
        checkboxValue: 'Promotional Merchandise',
        subProducts: [
            'Branded Apparel', 'Promotional Bags', 'Customized Stationery',
            'Drinkware (Mugs, Bottles, Tumblers)', 'Tech Promotional Items (USBs, Power Banks)',
            'Office Desk Accessories', 'Eco-Friendly Promotional Products',
            'Event & Exhibition Giveaways', 'Festival & Seasonal Merchandise', 'Premium Executive Gifts'
        ]
    },
    'wholesale-goods': {
        id: 'wholesale-goods',
        name: 'Wholesale Consumer Goods',
        tagline: 'High-demand products for bulk trade.',
        description: 'We supply a broad range of high-turnover consumer goods for wholesalers, distributors, supermarkets, and e-commerce businesses. Our sourcing network delivers consistent quality across household products, personal care, and fast-moving consumer goods — at competitive bulk pricing with flexible order quantities.',
        image: 'images/br4.png',
        checkboxValue: 'Consumer Goods',
        subProducts: [
            'Household Items', 'Daily Utility Products', 'Home & Living Products',
            'Personal Care Items', 'Cleaning Products', 'Plastic & Storage Products',
            'Travel & Lifestyle Accessories', 'Fast-Moving Consumer Goods (FMCG)', 'General Merchandise Items'
        ]
    },
    'textile-machinery': {
        id: 'textile-machinery',
        name: 'Textile Machineries',
        tagline: 'Powering production with precision.',
        description: 'We source and import textile machinery from established manufacturers across Asia and Europe. From spinning and weaving to dyeing and finishing — our machinery sourcing service supports textile mills, garment factories, and production facilities with reliable equipment, technical documentation, and after-sales support coordination.',
        image: 'images/textile.png',
        checkboxValue: 'Textile Machinery',
        subProducts: [
            'Spinning Machines', 'Weaving Machines', 'Knitting Machines',
            'Dyeing & Finishing Machines', 'Embroidery Machines',
            'Cutting & Sewing Machines', 'Textile Processing Equipment'
        ]
    }
};
