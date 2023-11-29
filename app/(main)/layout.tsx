import 'keen-slider/keen-slider.min.css';
import '@/styles/slider.css';
import Navbar from '@/components/layout/navbar';
import TopHeader from '@/components/layout/navbar/top-header';
import SetStoreValue from '../set-store-value';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SetStoreValue />
      <TopHeader />
      <Navbar />
      <main className='pb-5'>{children}</main>
    </>
  );
}
