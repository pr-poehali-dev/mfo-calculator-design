import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  passport: string;
  income: string;
  workPlace: string;
  purpose: string;
  agreement: boolean;
}

interface ApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  loanAmount: number;
  loanDays: number;
  formData: FormData;
  onFormDataChange: (data: FormData) => void;
  applicationStep: number;
  onSubmit: () => void;
}

const ApplicationTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(60); // 1 минута

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-center space-y-4">
      <div className="text-6xl font-bold text-primary animate-bounce-gentle">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <p className="text-muted-foreground">Осталось времени на рассмотрение</p>
      <Progress value={(60 - timeLeft) / 0.6} className="w-full" />
    </div>
  );
};

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  isOpen,
  onClose,
  loanAmount,
  loanDays,
  formData,
  onFormDataChange,
  applicationStep,
  onSubmit
}) => {
  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    onFormDataChange({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = () => {
    if (!formData.agreement) {
      toast({
        title: "Ошибка",
        description: "Необходимо согласие на обработку данных",
        variant: "destructive"
      });
      return;
    }
    onSubmit();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {applicationStep === 1 ? "Анкета заявки" : "Рассмотрение заявки"}
          </DialogTitle>
        </DialogHeader>
        
        {applicationStep === 1 ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">ФИО</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Иванов Иван Иванович"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Номер телефона</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+7 (999) 123-45-67"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="example@mail.ru"
              />
            </div>
            
            <div>
              <Label htmlFor="passport">Серия и номер паспорта</Label>
              <Input
                id="passport"
                value={formData.passport}
                onChange={(e) => handleInputChange('passport', e.target.value)}
                placeholder="1234 567890"
              />
            </div>
            
            <div>
              <Label htmlFor="income">Ежемесячный доход</Label>
              <Select onValueChange={(value) => handleInputChange('income', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите доход" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20000">До 20 000 ₽</SelectItem>
                  <SelectItem value="50000">20 000 - 50 000 ₽</SelectItem>
                  <SelectItem value="100000">50 000 - 100 000 ₽</SelectItem>
                  <SelectItem value="more">Более 100 000 ₽</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="workPlace">Место работы</Label>
              <Input
                id="workPlace"
                value={formData.workPlace}
                onChange={(e) => handleInputChange('workPlace', e.target.value)}
                placeholder="ООО Компания"
              />
            </div>
            
            <div>
              <Label htmlFor="purpose">Цель займа</Label>
              <Textarea
                id="purpose"
                value={formData.purpose}
                onChange={(e) => handleInputChange('purpose', e.target.value)}
                placeholder="На что планируете потратить займ"
              />
            </div>
            
            <div className="space-y-4">
              <Label>Загрузка фото паспорта</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Icon name="Upload" size={32} className="mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">Нажмите для загрузки фото паспорта</p>
                <Input type="file" accept="image/*" className="hidden" />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreement"
                checked={formData.agreement}
                onCheckedChange={(checked) => handleInputChange('agreement', !!checked)}
              />
              <Label htmlFor="agreement" className="text-sm">
                Согласен на обработку персональных данных
              </Label>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <h4 className="font-semibold">Параметры займа:</h4>
              <p>Сумма: {loanAmount.toLocaleString()} ₽</p>
              <p>Срок: {loanDays} дней</p>
              <p>К возврату: {Math.round(loanAmount * (1 + (0.08 / 100) * loanDays)).toLocaleString()} ₽</p>
            </div>
            
            <Button 
              onClick={handleSubmit}
              className="w-full"
              disabled={!formData.agreement}
            >
              Отправить заявку
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <ApplicationTimer />
            <div className="text-center space-y-4">
              <Badge className="bg-yellow-100 text-yellow-800">Рассматривается</Badge>
              <p className="text-sm text-gray-600">
                Ваша заявка принята и находится на рассмотрении. 
                Результат будет отправлен на указанный номер телефона.
              </p>
              <Button 
                variant="outline" 
                onClick={onClose}
                className="w-full"
              >
                Закрыть
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationForm;