import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryBar } from './components/CategoryBar';
import { RoomShowcase } from './components/RoomShowcase';
import { StudioServices } from './components/StudioServices';
import { ProductGrid } from './components/ProductGrid';
import { PromotionalBanner } from './components/PromotionalBanner';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { WishlistModal } from './components/WishlistModal';
import { CheckoutModal } from './components/CheckoutModal';
import { AccountModal } from './components/AccountModal';
import { StartProjectModal } from './components/StartProjectModal';
import { Toast } from './components/Toast';

const StoreContent: React.FC = () => {
  const { setSelectedCategory } = useCart();
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const handleShopNow = () => {
    setSelectedCategory('All');
    const el = document.getElementById('product-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreRooms = () => {
    const el = document.getElementById('rooms-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDiscoverCraft = () => {
    const el = document.getElementById('craftsmanship');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    const el = document.getElementById('product-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1A1A1A] antialiased">
      {/* Sticky Header with Interior Design Studio Navigation and 'Start a Project' CTA */}
      <Header onStartProject={() => setIsProjectModalOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Full-width Impactful Hero */}
        <Hero
          onShopClick={handleShopNow}
          onExploreClick={handleExploreRooms}
        />

        {/* 4 Clean Outlined Category Icons directly below hero */}
        <CategoryBar onCategorySelect={handleCategorySelect} />

        {/* Interior Architecture & Design Studio Services */}
        <StudioServices onStartProject={() => setIsProjectModalOpen(true)} />

        {/* "Find Furniture for Every Room" Curated Showcase */}
        <RoomShowcase />

        {/* Primary Product Grid: "Our Favorites For Your Home" */}
        <ProductGrid
          title="Our Favorites For Your Home"
          subtitle="Signature Handcrafted Living"
          sectionId="product-catalog"
        />

        {/* Split Screen Promotional Banner: "Made to Comfort, Built for Real Life" */}
        <PromotionalBanner onDiscoverClick={handleDiscoverCraft} />

        {/* Secondary Grid: "Featured Furniture & Architectural Accents" */}
        <ProductGrid
          title="Featured Furniture"
          subtitle="Artisan Selections & Limited Editions"
          sectionId="featured-furniture"
        />

        {/* The Nova Atelier: Craftsmanship & Sustainability Standards */}
        <CraftsmanshipSection />
      </main>

      {/* Clean Multi-Column Editorial Footer */}
      <Footer />

      {/* Slide-overs & Interactive Modals */}
      <CartDrawer />
      <QuickViewModal />
      <SearchModal />
      <WishlistModal />
      <CheckoutModal />
      <AccountModal />
      <StartProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <StoreContent />
    </CartProvider>
  );
}
