import Header from './Header';
import Footer from './Footer.jsx';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f9fbf9] overflow-x-hidden">
      <Header />
      <main className="flex-1 pt-[55px]">
        <div className="px-4 flex flex-1 justify-center py-5 @[480px]:px-10 @[768px]:px-20 @[1024px]:px-40">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
