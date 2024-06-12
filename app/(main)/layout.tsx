import 'keen-slider/keen-slider.min.css';
import '@/styles/slider.css';
import Navbar from '@/components/layout/navbar';
import TopHeader from '@/components/layout/navbar/top-header';
import SetStoreValue from '../set-store-value';
import Footer from '@/components/layout/footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SetStoreValue />
      <TopHeader />
      <Navbar />
      <main className='min-h-[80svh] pb-5'>{children}</main>
      <Footer />
    </>
  );
}
