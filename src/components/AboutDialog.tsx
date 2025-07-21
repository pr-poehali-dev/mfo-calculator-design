import React from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface AboutDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutDialog: React.FC<AboutDialogProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Icon name="Building" size={24} />
            <span>О компании Фин5</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Наша миссия</h3>
              <p className="text-gray-600">
                Предоставлять быстрые и доступные финансовые решения для каждого клиента, 
                помогая решать жизненные задачи без лишних сложностей.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Преимущества</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <Icon name="Check" size={16} className="text-green-500 mr-2" />
                  Рассмотрение за 10 минут
                </li>
                <li className="flex items-center">
                  <Icon name="Check" size={16} className="text-green-500 mr-2" />
                  Без скрытых комиссий
                </li>
                <li className="flex items-center">
                  <Icon name="Check" size={16} className="text-green-500 mr-2" />
                  Прозрачные условия
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-lg text-white">
            <h3 className="text-xl font-bold mb-3">Статистика компании</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">50,000+</div>
                <div className="text-sm opacity-90">Довольных клиентов</div>
              </div>
              <div>
                <div className="text-2xl font-bold">5 лет</div>
                <div className="text-sm opacity-90">На рынке</div>
              </div>
              <div>
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm opacity-90">Одобренных заявок</div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Лицензии и сертификаты</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Shield" size={24} className="text-primary" />
                  <div>
                    <p className="font-medium">Лицензия ЦБ РФ</p>
                    <p className="text-sm text-gray-500">№ 2110177000001</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Award" size={24} className="text-secondary" />
                  <div>
                    <p className="font-medium">ISO 27001</p>
                    <p className="text-sm text-gray-500">Безопасность данных</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Контактная информация</h3>
            <div className="space-y-2 text-gray-600">
              <p className="flex items-center">
                <Icon name="Phone" size={16} className="mr-2" />
                8 (800) 123-45-67 (бесплатно по России)
              </p>
              <p className="flex items-center">
                <Icon name="Mail" size={16} className="mr-2" />
                info@mfo-finans.ru
              </p>
              <p className="flex items-center">
                <Icon name="MapPin" size={16} className="mr-2" />
                г. Москва, ул. Тверская, д. 1, стр. 1
              </p>
              <p className="flex items-center">
                <Icon name="Clock" size={16} className="mr-2" />
                Круглосуточно, без выходных
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutDialog;