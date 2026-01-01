import Image from 'next/image';
import Link from 'next/link';
import { Wrench, Gauge, ShieldCheck, PhoneCall, ArrowRight, ShoppingCart, User } from 'lucide-react';

// Типизация данных из бэкенда
interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
}

interface Product {
    id: number;
    name: string;
    price: number;
    image_url: string;
}

// Запрос данных с вашего Go-бэкенда
async function getData() {
    try {
        const [servicesRes, productsRes] = await Promise.all([
            fetch('http://localhost:8080/api/v1/services', { next: { revalidate: 60 } }),
            fetch('http://localhost:8080/api/v1/products/featured', { next: { revalidate: 60 } })
        ]);

        return {
            services: servicesRes.ok ? await servicesRes.json() : [],
            products: productsRes.ok ? await productsRes.json() : []
        };
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
        return { services: [], products: [] };
    }
}

export default async function Home() {
    const { services, products } = await getData();

    return (
        <main className="min-h-screen bg-moto-blue selection:bg-moto-yellow selection:text-moto-blue">
            {/* ================= ВЕРХНЯЯ ПАНЕЛЬ НАВИГАЦИИ ================= */}
            <nav className="absolute top-0 w-full z-50 py-6 px-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white font-bold text-xl tracking-tighter">
                        MOTO <span className="text-moto-yellow">METUS</span>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/login" className="text-white/80 hover:text-moto-yellow transition flex items-center gap-2 text-sm font-medium">
                            <User size={18} /> Войти
                        </Link>
                        <Link href="/register" className="bg-moto-yellow text-moto-blue px-4 py-2 rounded-lg font-bold text-sm hover:scale-105 transition shadow-lg shadow-moto-yellow/20">
                            Регистрация
                        </Link>
                    </div>
                </div>
            </nav>

            {/* ================= HERO SECTION ================= */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/hero-bg.jpg"
                        alt="Moto Service Workshop"
                        fill
                        className="object-cover opacity-40 scale-105 animate-pulse-slow"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-moto-blue/60 via-moto-blue/80 to-moto-blue"></div>
                </div>

                <div className="container relative z-10 flex flex-col items-center text-center px-4">
                    <div className="mb-8 animate-fade-in-down">
                        <div className="flex flex-col items-center">
                            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-2 uppercase tracking-tighter">
                                მოტო <span className="text-moto-yellow">მეთუსი</span>
                            </h1>
                            <div className="my-6 drop-shadow-[0_0_25px_rgba(253,184,19,0.4)]">
                                <Image src="/images/logo-emblem.png" width={200} height={200} alt="Emblem" className="h-auto w-40 md:w-56" />
                            </div>
                            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 uppercase tracking-tighter">
                                MOTO <span className="text-moto-yellow">METUS</span>
                            </h1>
                        </div>
                    </div>

                    <p className="text-lg md:text-2xl text-zinc-300 mb-12 max-w-2xl font-light">
                        Профессиональный сервис <span className="text-white font-semibold">Triumph, Ducati, Harley-Davidson</span> и других брендов в Батуми.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <Link href="/booking" className="bg-moto-yellow text-moto-blue px-10 py-4 rounded-full font-black text-lg hover:bg-white transition-all hover:scale-110 shadow-xl shadow-moto-yellow/20 uppercase tracking-wider">
                            Записаться в сервис
                        </Link>
                        <Link href="/shop" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full font-black text-lg hover:bg-white/20 transition-all uppercase tracking-wider flex items-center gap-3">
                            <ShoppingCart size={22} /> Магазин
                        </Link>
                    </div>
                </div>
            </section>

            {/* ================= КОНТАКТНАЯ ПОЛОСА ================= */}
            <div className="bg-white py-8 border-y-[6px] border-moto-yellow sticky top-0 z-40 shadow-2xl">
                <div className="container mx-auto flex flex-wrap justify-around items-center gap-8">
                    {[
                        { tel: "+(995) 595 006 294", label: "Сервис" },
                        { tel: "+(995) 568 364 227", label: "Эвакуация" }
                    ].map((item) => (
                        <a key={item.tel} href={`tel:${item.tel}`} className="flex items-center gap-4 group">
                            <div className="bg-moto-blue p-4 rounded-2xl text-moto-yellow group-hover:rotate-12 transition-transform shadow-lg">
                                <PhoneCall size={28} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs uppercase font-bold text-moto-blue/60">{item.label}</span>
                                <span className="text-2xl md:text-3xl font-black text-moto-blue">{item.tel}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* ================= ДИНАМИЧЕСКИЕ УСЛУГИ ================= */}
            <section className="py-32 px-4">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <h2 className="text-moto-yellow font-bold uppercase tracking-widest mb-2">Наши возможности</h2>
                            <h3 className="text-4xl md:text-6xl font-black text-white">Услуги Сервиса</h3>
                        </div>
                        <Link href="/services" className="text-moto-yellow border-b-2 border-moto-yellow pb-1 font-bold flex items-center gap-2 hover:text-white hover:border-white transition">
                            Все услуги <ArrowRight size={20} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {services.length > 0 ? services.map((service: Service) => (
                            <ServiceCard
                                key={service.id}
                                icon={<Wrench size={32} />}
                                title={service.name}
                                description={service.description}
                                price={service.price}
                            />
                        )) : (
                            // Заглушки, если данных нет
                            <div className="col-span-3 text-center text-white/20 py-20 border-2 border-dashed border-white/10 rounded-3xl">
                                Данные об услугах загружаются...
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ================= ТОПОВЫЕ ТОВАРЫ (НОВОЕ) ================= */}
            <section className="py-32 px-4 bg-white/5 border-t border-white/5">
                <div className="container mx-auto">
                    <h3 className="text-4xl font-black text-white mb-16 text-center italic">
                        В наличии: <span className="text-moto-yellow">Liqui Moly, Shell, Elf</span>
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {products.map((product: Product) => (
                            <div key={product.id} className="bg-moto-blue p-4 rounded-3xl border border-white/10 hover:border-moto-yellow transition group">
                                <div className="relative h-48 mb-4 rounded-2xl overflow-hidden bg-zinc-900">
                                    <Image src={product.image_url || '/images/placeholder.png'} fill alt={product.name} className="object-contain p-4 group-hover:scale-110 transition" />
                                </div>
                                <h4 className="font-bold text-white mb-1">{product.name}</h4>
                                <p className="text-moto-yellow font-black">{product.price} GEL</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

function ServiceCard({ icon, title, description, price }: { icon: React.ReactNode, title: string, description: string, price?: number }) {
    return (
        <div className="group bg-white/5 p-10 rounded-[2.5rem] border border-white/10 hover:bg-moto-yellow transition-all duration-500 hover:-translate-y-4">
            <div className="text-moto-yellow group-hover:text-moto-blue transition-colors mb-8">
                {icon}
            </div>
            <h3 className="text-2xl font-black text-white group-hover:text-moto-blue transition-colors mb-4 uppercase">
                {title}
            </h3>
            <p className="text-zinc-400 group-hover:text-moto-blue/80 transition-colors mb-8 leading-relaxed">
                {description}
            </p>
            {price && (
                <div className="text-xl font-black text-moto-yellow group-hover:text-moto-blue">
                    от {price} GEL
                </div>
            )}
        </div>
    )
}