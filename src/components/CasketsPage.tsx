import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CasketSelection from './CasketSelection';
import { useTheme } from '../contexts/ThemeContext';

interface CasketsPageProps {
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
}

function CasketsPage({ isSidebarCollapsed, setIsSidebarCollapsed }: CasketsPageProps) {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    sessionStorage.setItem('navigatingToSection', sectionId);
    navigate('/');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <Header
        activeSection="caskets"
        onNavigate={scrollToSection}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        isFooterInView={false}
      />

      <main className={`pt-20 pb-16 ${isSidebarCollapsed ? 'lg:pl-24' : 'lg:pl-64'}`}
        style={{
          transition: 'padding-left 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}>
        <div className={`w-full max-w-[85vw] ${isSidebarCollapsed ? 'md:max-w-[74rem]' : 'md:max-w-[min(74rem,calc(100vw-14rem-0.5rem))]'} mx-auto px-5 sm:px-6 md:px-2`}>
          <CasketSelection />
        </div>
      </main>

      <Footer id="footer" isSidebarCollapsed={isSidebarCollapsed} />
    </div>
  );
}

export default CasketsPage;
