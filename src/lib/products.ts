export type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  description: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  stock: number;
  images: string[];
  badge?: string;
};

export const categories = [
  { slug: "manto", name: "مانتو", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900&q=80" },
  { slug: "shirt", name: "پیراهن", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900&q=80" },
  { slug: "dress", name: "لباس مجلسی", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&q=80" },
  { slug: "knit", name: "بافت و پلیور", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=900&q=80" },
  { slug: "pants", name: "شلوار", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=900&q=80" },
  { slug: "coat", name: "پالتو", image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=900&q=80" },
];

const img = (id: string) => `https://images.unsplash.com/${id}?w=1000&q=80`;

export const products: Product[] = [
  {
    id: "velora-manto-linen",
    name: "مانتو کتان ولورا",
    price: 2450000,
    oldPrice: 2890000,
    category: "manto",
    description:
      "مانتو بلند از جنس کتان درجه یک با دوخت تمیز و برشی آزاد؛ انتخابی راحت و شیک برای استفاده روزمره و محیط کار. پارچه خنک و سبک با قابلیت شست‌وشوی آسان.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "کرمی", hex: "#E7DCC4" },
      { name: "زرشکی تیره", hex: "#4A1D28" },
      { name: "مشکی", hex: "#1B1B1B" },
    ],
    stock: 12,
    badge: "پرفروش",
    images: [img("photo-1591047139829-d91aecb6caea"), img("photo-1483985988355-763728e1935b"), img("photo-1485462537746-965f33f7f6a7")],
  },
  {
    id: "velora-shirt-silk",
    name: "پیراهن ابریشمی نوا",
    price: 1780000,
    category: "shirt",
    description:
      "پیراهن با پارچه ابریشم مصنوعی، درخششی ملایم و لمسی نرم دارد. مناسب استایل رسمی و مهمانی، با یقه کلاسیک و آستین بلند.",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "کرمی", hex: "#EFE6D2" },
      { name: "شرابی", hex: "#6B3140" },
    ],
    stock: 7,
    images: [img("photo-1596755094514-f87e34085b2c"), img("photo-1434389677669-e08b4cac3105"), img("photo-1521572163474-6864f9cf17ab")],
  },
  {
    id: "velora-dress-emerald",
    name: "لباس مجلسی یاقوت",
    price: 4350000,
    category: "dress",
    description:
      "لباس بلند مجلسی با رنگ قرمز یاقوتی و برش بدن‌نما؛ دوخت دست، آستر کامل و جزئیات ظریف در یقه. مناسب مراسم‌های خاص.",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "قرمز یاقوتی", hex: "#8C1C2B" },
      { name: "شرابی", hex: "#5A2231" },
    ],
    stock: 4,
    badge: "محدود",
    images: [img("photo-1595777457583-95e059d581b8"), img("photo-1502716119720-b23a93e5fe1b"), img("photo-1496747611176-843222e1e57c")],
  },
  {
    id: "velora-knit-cream",
    name: "بافت یقه‌اسکی کرِم",
    price: 1290000,
    category: "knit",
    description:
      "بافت گرم و نرم با الیاف ترکیبی، فرم‌دهی عالی و بدون گلوله شدن. یقه اسکی و آستین رگلان برای حس راحتی بیشتر.",
    sizes: ["Free", "M", "L"],
    colors: [
      { name: "کرمی", hex: "#EADFC8" },
      { name: "شکلاتی", hex: "#4A392C" },
    ],
    stock: 20,
    images: [img("photo-1576566588028-4147f3842f27"), img("photo-1515886657613-9f3515b0c78f"), img("photo-1487222477894-8943e31ef7b2")],
  },
  {
    id: "velora-pants-wide",
    name: "شلوار پارچه‌ای دم‌پا گشاد",
    price: 1450000,
    category: "pants",
    description:
      "شلوار بگ با کمر کشی پنهان و جیب کاربردی؛ پارچه مازراتی سنگین با ریزش زیبا. ست‌کردنی با تمام مانتوهای ولورا.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "زرشکی تیره", hex: "#4A1D28" },
      { name: "بژ", hex: "#D9C9AC" },
    ],
    stock: 15,
    images: [img("photo-1594633312681-425c7b97ccd1"), img("photo-1552902865-b72c031ac5ea"), img("photo-1541099649105-f69ad21f3246")],
  },
  {
    id: "velora-coat-olive",
    name: "پالتو بلند زیتونی",
    price: 5250000,
    oldPrice: 5900000,
    category: "coat",
    description:
      "پالتو بلند با پارامتر فاستونی پشم‌دار، آستر ساتن و دو دکمه؛ گرمای بالا همراه با ظاهری لوکس برای زمستان.",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "زرشکی", hex: "#5E2530" },
      { name: "کرمی", hex: "#E4D9BE" },
    ],
    stock: 5,
    badge: "جدید",
    images: [img("photo-1539533113208-f6df8cc8b543"), img("photo-1520975954732-35dd22299614"), img("photo-1544022613-e87ca75a784a")],
  },
  {
    id: "velora-manto-crepe",
    name: "مانتو کرپ کمربندی",
    price: 2190000,
    category: "manto",
    description:
      "مانتو کرپ با کمربند هم‌رنگ و برش ترک؛ فرمی جمع‌وجور و شیک برای استایل روزمره.",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "مشکی", hex: "#1B1B1B" },
      { name: "زرشکی تیره", hex: "#4A1D28" },
    ],
    stock: 0,
    images: [img("photo-1485231183945-fffde7cc051e"), img("photo-1469334031218-e382a71b716b"), img("photo-1479064555552-3ef4979f8908")],
  },
  {
    id: "velora-shirt-oversize",
    name: "پیراهن اورسایز کتان",
    price: 1350000,
    category: "shirt",
    description:
      "پیراهن اورسایز با شانه افتاده و جیب سینه؛ کتان نخی خنک، مناسب چهار فصل.",
    sizes: ["Free"],
    colors: [
      { name: "سفید صدفی", hex: "#F3EFE6" },
      { name: "صورتی کهنه", hex: "#C0808A" },
    ],
    stock: 9,
    images: [img("photo-1602810318383-e386cc2a3ccf"), img("photo-1519058082700-08a0b56da9b4"), img("photo-1520975954732-35dd22299614")],
  },
  {
    id: "velora-knit-cardigan",
    name: "کاردیگان بافت ولورا",
    price: 1690000,
    category: "knit",
    description:
      "کاردیگان جلوباز با دکمه‌های چوبی و بافت درشت؛ لایه‌ای گرم و دلنشین روی هر استایلی.",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "کرمی", hex: "#E9DEC5" },
      { name: "خاکی", hex: "#8A7A5F" },
    ],
    stock: 11,
    images: [img("photo-1434389677669-e08b4cac3105"), img("photo-1556905055-8f358a7a47b2"), img("photo-1490481651871-ab68de25d43d")],
  },
  {
    id: "velora-dress-satin",
    name: "لباس ساتن آیلین",
    price: 3450000,
    category: "dress",
    description:
      "لباس ساتن میدی با بند نازک و کمر فیت؛ درخشش نرم ساتن برای شب‌های خاص.",
    sizes: ["S", "M"],
    colors: [
      { name: "کرمی", hex: "#EDE1C8" },
      { name: "زرشکی تیره", hex: "#3F1A23" },
    ],
    stock: 6,
    images: [img("photo-1496747611176-843222e1e57c"), img("photo-1515372039744-b8f02a3ae446"), img("photo-1502716119720-b23a93e5fe1b")],
  },
];

export const allSizes = ["S", "M", "L", "XL", "Free"];
export const allColors = [
  { name: "کرمی", hex: "#E7DCC4" },
  { name: "زرشکی تیره", hex: "#4A1D28" },
  { name: "شرابی", hex: "#6B3140" },
  { name: "مشکی", hex: "#1B1B1B" },
  { name: "بژ", hex: "#D9C9AC" },
  { name: "شکلاتی", hex: "#4A392C" },
];

export const formatPrice = (n: number) => `${n.toLocaleString("fa-IR")} تومان`;

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const categoryName = (slug: string) => categories.find((c) => c.slug === slug)?.name ?? slug;
export const relatedProducts = (p: Product) =>
  products.filter((x) => x.category === p.category && x.id !== p.id).concat(products.filter((x) => x.category !== p.category)).slice(0, 4);
