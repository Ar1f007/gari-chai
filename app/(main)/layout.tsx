import 'keen-slider/keen-slider.min.css';
import '@/styles/slider.css';
import Navbar from '@/components/layout/navbar';
import TopHeader from '@/components/layout/navbar/top-header';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopHeader />
      <Navbar />
      <main>{children}</main>
    </>
  );
}
