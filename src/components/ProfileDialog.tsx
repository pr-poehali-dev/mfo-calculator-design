import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface UserProfile {
  phone: string;
  name: string;
  applications: Array<{
    id: number;
    amount: number;
    status: string;
    date: string;
  }>;
}

interface ProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile | null;
  onLogin: (profile: UserProfile) => void;
  onLogout: () => void;
}

const ProfileDialog: React.FC<ProfileDialogProps> = ({
  isOpen,
  onClose,
  userProfile,
  onLogin,
  onLogout
}) => {
  const [loginPhone, setLoginPhone] = useState('');

  const handleLogin = () => {
    if (loginPhone) {
      const profile: UserProfile = {
        phone: loginPhone,
        name: 'Иван Иванов',
        applications: [
          { id: 1, amount: 25000, status: 'approved', date: '15.01.2024' },
          { id: 2, amount: 15000, status: 'paid', date: '10.12.2023' }
        ]
      };
      onLogin(profile);
      toast({
        title: "Вход выполнен",
        description: "Добро пожаловать в личный кабинет!"
      });
    }
  };

  const handleLogout = () => {
    onLogout();
    setLoginPhone('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Icon name="User" size={24} />
            <span>Личный кабинет</span>
          </DialogTitle>
        </DialogHeader>
        
        {!userProfile ? (
          <div className="space-y-4">
            <p className="text-gray-600">Войдите по номеру телефона для доступа к личному кабинету</p>
            <div>
              <Label htmlFor="loginPhone">Номер телефона</Label>
              <Input
                id="loginPhone"
                value={loginPhone}
                onChange={(e) => setLoginPhone(e.target.value)}
                placeholder="+7 (999) 123-45-67"
              />
            </div>
            <Button 
              className="w-full"
              onClick={handleLogin}
            >
              Войти
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Профиль</h3>
              <p><strong>Имя:</strong> {userProfile.name}</p>
              <p><strong>Телефон:</strong> {userProfile.phone}</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">История заявок</h3>
              <div className="space-y-3">
                {userProfile.applications.map((app) => (
                  <Card key={app.id} className="p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{app.amount.toLocaleString()} ₽</p>
                        <p className="text-sm text-gray-500">{app.date}</p>
                      </div>
                      <Badge className={
                        app.status === 'approved' ? 'bg-green-100 text-green-800' :
                        app.status === 'paid' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }>
                        {app.status === 'approved' ? 'Одобрен' :
                         app.status === 'paid' ? 'Погашен' : 'В обработке'}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleLogout}
            >
              Выйти
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;