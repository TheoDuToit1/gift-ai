import React from 'react';
import { Carousel, TestimonialCard } from './ui/retro-testimonial';
import { useTheme } from '../contexts/ThemeContext';

interface FeedbackProps {
  isSidebarCollapsed: boolean;
}

const testimonials = [
  {
    name: 'Vinesh Bissin',
    designation: 'Family Member',
    description: 'Gift Ai provided such compassionate care during our difficult time. Their team handled everything with dignity and respect for our traditions.',
    profileImage: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&auto=format&fit=crop&q=60'
  },
  {
    name: 'Bukeka Msibi',
    designation: 'Family Member',
    description: 'When we needed help with arrangements, Gift Ai was there. They guided us through every step and honored our cultural customs beautifully.',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60'
  },
  {
    name: 'Violet Joseph',
    designation: 'Family Member',
    description: 'The memorial service arranged by Gift Ai brought our community together. Their attention to detail and compassionate approach meant everything.',
    profileImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=60'
  },
  {
    name: 'Maria Maswangai',
    designation: 'Family Member',
    description: 'Gift Ai helped us create a meaningful farewell for our loved one. Their support during our time of grief was truly comforting.',
    profileImage: 'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=400&auto=format&fit=crop&q=60'
  },
  {
    name: 'Salim Jadwat',
    designation: 'Family Member',
    description: 'From the initial consultation to the final ceremony, Gift Ai handled everything with such care and respect. We are deeply grateful.',
    profileImage: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&auto=format&fit=crop&q=60'
  },
  {
    name: 'Rakesh Ramal',
    designation: 'Family Member',
    description: 'Gift Ai understood our needs and helped us honor our loved one in a way that reflected our family\'s values and traditions.',
    profileImage: 'https://images.unsplash.com/photo-1546525848-3ce03ca516f6?w=400&auto=format&fit=crop&q=60'
  },
  {
    name: 'Trevor Williams',
    designation: 'Family Member',
    description: 'During our most difficult time, Gift Ai provided comfort and dignity. Their compassionate service helped us find peace.',
    profileImage: 'https://images.unsplash.com/photo-1544005313-ef5b7f8e3e32?w=400&auto=format&fit=crop&q=60'
  },
  {
    name: 'Martina Van Wyk',
    designation: 'Family Member',
    description: 'Gift Ai created a beautiful memorial that honored our loved one perfectly. Their care and attention to detail brought us comfort.',
    profileImage: 'https://images.unsplash.com/photo-1541216970279-affbfdd55aa8?w=400&auto=format&fit=crop&q=60'
  }
];

const Feedback: React.FC<FeedbackProps> = ({ isSidebarCollapsed }) => {
  const { isDark } = useTheme();
  return (
    <section className={`py-20 transition-all duration-700 ease-in-out border-b scroll-mt-32 ${
      isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
    } ${
      isSidebarCollapsed ? 'lg:ml-24' : 'lg:ml-64'
    } ${
      isSidebarCollapsed ? 'lg:w-[calc(100%-6rem)]' : 'lg:w-[calc(100%-16rem)]'
    }`}
    style={{
      transition: 'margin-left 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), width 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }}>
      <div className="mx-auto px-4" style={{ maxWidth: '90rem' }}>
        <div className="text-center mb-16">
          <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full mb-4 ${
            isDark 
              ? 'bg-ubuntugift-secondary/50 text-ubuntugift-light' 
              : 'bg-ubuntugift-light text-ubuntugift-primary'
          }`}>
            Family Stories
          </span>
          <h2 id="feedback" className={`text-4xl font-bold text-center mb-4 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
            Stories of Dignity & Care
          </h2>
          <p className={`text-xl text-center mb-16 max-w-3xl mx-auto ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
            Heartfelt stories from families across Limpopo who found comfort and dignity with Gift Ai.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <Carousel
            items={testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                index={index}
                onCardClose={() => {}}
              />
            ))}
          />
        </div>
      </div>
    </section>
  );
};

export default Feedback;
