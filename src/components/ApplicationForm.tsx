import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  status: 'pending' | 'processing' | 'completed';
  duration: number;
}

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
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [processingSteps, setProcessingSteps] = useState<ProcessStep[]>([
    { id: 1, title: 'Проверка данных', description: 'Валидация введенной информации', icon: 'FileCheck', status: 'pending', duration: 2000 },
    { id: 2, title: 'Скоринг', description: 'Анализ кредитной истории', icon: 'Calculator', status: 'pending', duration: 3000 },
    { id: 3, title: 'Верификация', description: 'Подтверждение личности', icon: 'Shield', status: 'pending', duration: 2500 },
    { id: 4, title: 'Одобрение', description: 'Принятие решения', icon: 'CheckCircle', status: 'pending', duration: 1500 }
  ]);

  const totalReturn = Math.round(loanAmount * (1 + (0.08 / 100) * loanDays));
  const dailyPayment = Math.round(totalReturn / loanDays);

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  const calculateProgress = () => {
    const fields = ['fullName', 'phone', 'email', 'passport', 'income', 'workPlace', 'purpose'];
    const filledFields = fields.filter(field => formData[field as keyof FormData]).length;
    return Math.round((filledFields / fields.length) * 100);
  };

  useEffect(() => {
    setProgress(calculateProgress());
  }, [formData]);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!formData.agreement) {
      toast({
        title: "Ошибка",
        description: "Необходимо согласие с условиями",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    setCurrentStep(4);

    // Имитация процесса обработки заявки
    for (let i = 0; i < processingSteps.length; i++) {
      setProcessingSteps(prev => prev.map((step, index) => 
        index === i ? { ...step, status: 'processing' } : step
      ));

      await new Promise(resolve => setTimeout(resolve, processingSteps[i].duration));

      setProcessingSteps(prev => prev.map((step, index) => 
        index === i ? { ...step, status: 'completed' } : step
      ));
    }

    onSubmit();
    setIsSubmitting(false);
    setCurrentStep(5);

    toast({
      title: "Заявка одобрена! 🎉",
      description: "Деньги поступят на карту в течение 15 минут",
    });
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName && formData.phone && formData.email;
      case 2:
        return formData.passport && formData.income && formData.workPlace;
      case 3:
        return formData.purpose && formData.agreement;
      default:
        return true;
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Личные данные</h3>
        <p className="text-gray-600">Укажите ваши основные данные для связи</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName" className="flex items-center space-x-2">
            <Icon name="User" size={16} />
            <span>Полное имя</span>
          </Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => updateFormData('fullName', e.target.value)}
            placeholder="Иванов Иван Иванович"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="phone" className="flex items-center space-x-2">
            <Icon name="Phone" size={16} />
            <span>Номер телефона</span>
          </Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            placeholder="+7 (999) 123-45-67"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="email" className="flex items-center space-x-2">
            <Icon name="Mail" size={16} />
            <span>Email</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            placeholder="example@mail.ru"
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Документы и доходы</h3>
        <p className="text-gray-600">Информация для проверки платежеспособности</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="passport" className="flex items-center space-x-2">
            <Icon name="CreditCard" size={16} />
            <span>Серия и номер паспорта</span>
          </Label>
          <Input
            id="passport"
            value={formData.passport}
            onChange={(e) => updateFormData('passport', e.target.value)}
            placeholder="1234 567890"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="income" className="flex items-center space-x-2">
            <Icon name="Banknote" size={16} />
            <span>Ежемесячный доход</span>
          </Label>
          <Select onValueChange={(value) => updateFormData('income', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Выберите диапазон дохода" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="20000-40000">20 000 - 40 000 ₽</SelectItem>
              <SelectItem value="40000-70000">40 000 - 70 000 ₽</SelectItem>
              <SelectItem value="70000-100000">70 000 - 100 000 ₽</SelectItem>
              <SelectItem value="100000+">Более 100 000 ₽</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="workPlace" className="flex items-center space-x-2">
            <Icon name="Building" size={16} />
            <span>Место работы</span>
          </Label>
          <Input
            id="workPlace"
            value={formData.workPlace}
            onChange={(e) => updateFormData('workPlace', e.target.value)}
            placeholder="ООО Компания"
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Финальный шаг</h3>
        <p className="text-gray-600">Укажите цель займа и подтвердите согласие</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="purpose" className="flex items-center space-x-2">
            <Icon name="Target" size={16} />
            <span>Цель займа</span>
          </Label>
          <Select onValueChange={(value) => updateFormData('purpose', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Выберите цель займа" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="personal">Личные нужды</SelectItem>
              <SelectItem value="bills">Оплата счетов</SelectItem>
              <SelectItem value="medical">Медицинские расходы</SelectItem>
              <SelectItem value="education">Образование</SelectItem>
              <SelectItem value="travel">Путешествие</SelectItem>
              <SelectItem value="other">Другое</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="p-4 bg-blue-50 border-blue-200">
          <h4 className="font-semibold mb-3 flex items-center">
            <Icon name="Calculator" size={18} className="mr-2 text-primary" />
            Условия займа
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Сумма займа:</span>
              <span className="font-semibold">{loanAmount.toLocaleString()} ₽</span>
            </div>
            <div className="flex justify-between">
              <span>Срок:</span>
              <span className="font-semibold">{loanDays} дней</span>
            </div>
            <div className="flex justify-between">
              <span>Ставка:</span>
              <span className="font-semibold">0.08% в день</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span>К возврату:</span>
              <span className="font-bold text-primary">{totalReturn.toLocaleString()} ₽</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Ежедневный платеж:</span>
              <span>~{dailyPayment.toLocaleString()} ₽</span>
            </div>
          </div>
        </Card>

        <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
          <Checkbox
            id="agreement"
            checked={formData.agreement}
            onCheckedChange={(checked) => updateFormData('agreement', checked as boolean)}
          />
          <Label htmlFor="agreement" className="text-sm leading-relaxed">
            Я согласен с <span className="text-primary font-medium cursor-pointer hover:underline">условиями займа</span>, 
            <span className="text-primary font-medium cursor-pointer hover:underline"> политикой конфиденциальности</span> и 
            даю согласие на обработку персональных данных
          </Label>
        </div>
      </div>
    </div>
  );

  const renderProcessing = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <Icon name="Zap" size={32} className="text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Обрабатываем заявку</h3>
        <p className="text-gray-600">Это займет не более 1 минуты</p>
      </div>

      <div className="space-y-4">
        {processingSteps.map((step, index) => (
          <div key={step.id} className="flex items-center space-x-4 p-4 rounded-lg border">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
              step.status === 'completed' ? 'bg-green-500' : 
              step.status === 'processing' ? 'bg-primary animate-pulse' : 
              'bg-gray-200'
            }`}>
              <Icon 
                name={step.status === 'completed' ? 'Check' : step.icon} 
                size={20} 
                className={step.status === 'completed' || step.status === 'processing' ? 'text-white' : 'text-gray-500'} 
              />
            </div>
            
            <div className="flex-1">
              <h4 className="font-semibold">{step.title}</h4>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
            
            {step.status === 'processing' && (
              <div className="animate-spin">
                <Icon name="Loader2" size={20} className="text-primary" />
              </div>
            )}
            
            {step.status === 'completed' && (
              <Badge className="bg-green-100 text-green-800">Готово</Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <Icon name="CheckCircle" size={40} className="text-green-600" />
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Заявка одобрена! 🎉</h3>
        <p className="text-gray-600 mb-4">Поздравляем! Ваша заявка успешно одобрена</p>
        
        <Card className="p-6 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <div className="space-y-3">
            <div className="flex justify-between text-lg">
              <span>Сумма к получению:</span>
              <span className="font-bold text-green-700">{loanAmount.toLocaleString()} ₽</span>
            </div>
            <div className="flex justify-between">
              <span>Срок погашения:</span>
              <span className="font-semibold">{loanDays} дней</span>
            </div>
            <div className="text-center text-sm text-gray-600 pt-3 border-t border-green-200">
              Деньги поступят на карту в течение 15 минут
            </div>
          </div>
        </Card>
      </div>
      
      <Button onClick={onClose} className="w-full" size="lg">
        Отлично!
      </Button>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="FileText" size={24} />
              <span>Заявка на займ</span>
            </div>
            {currentStep <= 3 && (
              <Badge variant="outline" className="text-xs">
                Шаг {currentStep} из 3
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        {currentStep <= 3 && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Прогресс заполнения</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <div className="min-h-[400px]">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderProcessing()}
          {currentStep === 5 && renderSuccess()}
        </div>

        {currentStep <= 3 && (
          <div className="flex justify-between pt-6 border-t">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 1}
            >
              <Icon name="ChevronLeft" size={16} className="mr-1" />
              Назад
            </Button>
            
            {currentStep < 3 ? (
              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
              >
                Далее
                <Icon name="ChevronRight" size={16} className="ml-1" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!isStepValid() || isSubmitting}
                className="bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? (
                  <>
                    <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                    Отправляем...
                  </>
                ) : (
                  <>
                    <Icon name="Send" size={16} className="mr-2" />
                    Отправить заявку
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationForm;