import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  onAboutClick: () => void;
  onProfileClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAboutClick, onProfileClick }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">5</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Фин5</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">Займы</a>
            <Button 
              variant="ghost" 
              onClick={onAboutClick}
              className="text-gray-600 hover:text-primary"
            >
              О нас
            </Button>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">Контакты</a>
            <Button 
              variant="outline"
              onClick={onProfileClick}
              className="hover:bg-primary hover:text-white transition-colors"
            >
              <Icon name="LogIn" size={16} className="mr-2" />
              Войти
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;