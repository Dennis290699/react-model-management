import { Model } from '../types';

export const models: Model[] = [
  {
    id: '1',
    name: 'Sara Bakley',
    category: 'women',
    location: 'Nevada',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
    compCard: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
    badges: ['Top Rated'],
    brands: ['Vogue', 'Gucci', 'Zara', 'H&M', 'Chanel', 'Prada'],
    stats: { height: "5' 8\"", dress: "4 US", bust: "32D", waist: "25\"", hips: "37\"", shoe: "8.5 US", hair: "BROWN", eyes: "HAZEL" },
    bio: "Sara Bakley stands as a paragon of modern elegance. With a career that spans high-profile campaigns for Vogue and Gucci, she brings a sophisticated edge to every shoot. Her ability to embody diverse characters has made her a favorite among top-tier photographers in Europe and America.",
    quote: "Modeling is about storytelling without words. It's the art of becoming someone else for a split second, capturing an emotion that lasts forever.",
    portfolio: [
      "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    id: '2',
    name: 'Eliza Riley',
    category: 'new-faces',
    location: 'Kansas City',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1000&auto=format&fit=crop',
    compCard: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1000&auto=format&fit=crop',
    badges: ['New Face'],
    isNew: true,
    brands: [],
    stats: { height: "5' 9\"", dress: "4 US", bust: "34B", waist: "24\"", hips: "36\"", shoe: "9 US", hair: "BLONDE", eyes: "BLUE" },
    bio: "Eliza Riley is the fresh face defining the new generation of beauty. Discovered in Kansas City, her raw potential and striking features have quickly caught the attention of casting directors worldwide. She brings an authentic, undone look that resonates with contemporary indie brands.",
    quote: "I'm learning that imperfection is what makes an image compelling. It's not about being flawless; it's about being real.",
    portfolio: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1485230405346-71acb9518d9c?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    id: '3',
    name: 'Denise Hudson',
    category: 'women',
    location: 'Denver',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop',
    compCard: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop',
    badges: ['New Face'],
    isNew: true,
    brands: [],
    stats: { height: "5' 8\"", dress: "2 US", bust: "32A", waist: "24\"", hips: "34\"", shoe: "7 US", hair: "BLACK", eyes: "BROWN" },
    bio: "With a background in contemporary dance, Denise brings a unique fluidity and grace to her posing. Her commercial appeal is undeniable, bridging the gap between high fashion editorial and lifestyle advertising. She is currently developing her portfolio for international placement.",
    quote: "Movement is my first language. I try to bring that rhythm into every still image I create.",
    portfolio: [
      "https://images.unsplash.com/photo-1502323777036-f29e3972d82f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529139574466-a302d20525b5?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    id: '4',
    name: 'Victoria Barrett',
    category: 'curve',
    location: 'NYC',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1000&auto=format&fit=crop',
    compCard: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1000&auto=format&fit=crop',
    badges: ['Runway Ready'],
    brands: ['Nike', 'Adidas', 'Puma', 'Under Armour'],
    stats: { height: "5' 10\"", dress: "4 US", bust: "34D", waist: "25\"", hips: "37\"", shoe: "9.5 US", hair: "BROWN", eyes: "GREEN" },
    bio: "Victoria Barrett dominates the athleisure and sportswear sector. Her athletic build and intense focus have landed her major campaigns with global giants like Nike and Adidas. She possesses a commanding runway presence that translates power and confidence.",
    quote: "Strength is beautiful. I want to inspire women to feel powerful in their own skin.",
    portfolio: [
      "https://images.unsplash.com/photo-1525151423987-b985c9878b6c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589464096030-974d6c483251?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    id: '5',
    name: 'Victoria B',
    category: 'direct',
    location: 'NYC',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop',
    compCard: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop',
    badges: [],
    brands: ['Sephora', 'Ulta', 'L\'Oreal'],
    stats: { height: "5' 11\"", dress: "4 US", bust: "34C", waist: "25\"", hips: "36\"", shoe: "9 US", hair: "BROWN", eyes: "BROWN" },
    bio: "A beauty campaign favorite, Victoria B is known for her flawless complexion and expressive features. She has become a staple for major cosmetic brands including Sephora and L'Oreal. Her versatility allows her to transition seamlessly from commercial beauty to high-concept editorial.",
    quote: "The camera sees everything, so you have to be honest with it. Authenticity shines through the lens.",
    portfolio: [
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    id: '6',
    name: 'Lori Bradley',
    category: 'new-faces',
    location: 'Las Vegas',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop',
    compCard: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop',
    badges: [],
    isNew: true,
    stats: { height: "5' 7\"", dress: "2 US", bust: "32B", waist: "23\"", hips: "35\"", shoe: "7 US", hair: "RED", eyes: "BLUE" },
    bio: "Lori Bradley brings a striking, alternative edge to the board. Her distinctive look and fiery personality make her perfect for brands looking to make a bold statement. Though new to the scene, her editorial work shows a maturity beyond her years.",
    quote: "I don't just want to take a picture; I want to create a mood, a feeling, a moment.",
    portfolio: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492288991661-058aa541ff43?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    id: '7',
    name: 'Sara Alvarado',
    category: 'women',
    location: 'Miami',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1000&auto=format&fit=crop',
    compCard: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1000&auto=format&fit=crop',
    badges: [],
    brands: ['Calvin Klein', 'Tommy Hilfiger'],
    stats: { height: "5' 9\"", dress: "4 US", bust: "34C", waist: "26\"", hips: "38\"", shoe: "8.5 US", hair: "BLACK", eyes: "BROWN" },
    bio: "Based in Miami, Sara Alvarado is the queen of swim and resort wear. Her radiant energy and sun-kissed aesthetic have made her a go-to for summer campaigns. She brings a warmth and approachability that connects instantly with audiences.",
    quote: "Sun, sea, and style. I live for the energy of a location shoot.",
    portfolio: [
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522228115018-d838bcce5c3a?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520155707862-5b32817388d6?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    id: '8',
    name: 'Julian Rose',
    category: 'men',
    location: 'London',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop',
    compCard: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop',
    badges: ['Mainboard'],
    brands: ['Burberry', 'GQ'],
    stats: { height: "6' 2\"", dress: "N/A", bust: "38\"", waist: "31\"", hips: "37\"", shoe: "11 US", hair: "BLONDE", eyes: "BLUE" },
    bio: "Classic British charm meets modern edge. Julian has been a staple in London Fashion Week.",
    quote: "Style is eternal.",
    portfolio: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484515991647-c5760fcecfc7?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    id: '9',
    name: 'Marcus Thorne',
    category: 'men',
    location: 'Berlin',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1000&auto=format&fit=crop',
    compCard: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1000&auto=format&fit=crop',
    badges: [],
    brands: ['Hugo Boss'],
    stats: { height: "6' 1\"", dress: "N/A", bust: "40\"", waist: "32\"", hips: "38\"", shoe: "12 US", hair: "BROWN", eyes: "BROWN" },
    bio: "Strong features and an intense gaze make Marcus a favorite for high-contrast B&W photography.",
    quote: "Focus is everything.",
    portfolio: [
      "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534030347209-56789827c423?q=80&w=1000&auto=format&fit=crop"
    ]
  }
];