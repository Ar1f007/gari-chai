import 'keen-slider/keen-slider.min.css';
import '@/styles/slider.css';
import Navbar from '@/components/layout/navbar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
