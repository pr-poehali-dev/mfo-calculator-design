import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [loanAmount, setLoanAmount] = useState(25000);
  const [loanDays, setLoanDays] = useState(15);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [applicationStep, setApplicationStep] = useState(1);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    passport: '',
    income: '',
    workPlace: '',
    purpose: '',
    agreement: false
  });

  const dailyRate = 0.08; // 0.08% в день
  const totalAmount = Math.round(loanAmount * (1 + (dailyRate / 100) * loanDays));
  const overpayment = totalAmount - loanAmount;

  const handleLoanAmountChange = (value: number[]) => {
    setLoanAmount(value[0]);
  };

  const handleLoanDaysChange = (value: number[]) => {
    setLoanDays(value[0]);
  };

  const handleFormSubmit = () => {
    if (!formData.agreement) {
      toast({
        title: "Ошибка",
        description: "Необходимо согласие на обработку данных",
        variant: "destructive"
      });
      return;
    }
    setApplicationStep(2);
    toast({
      title: "Заявка отправлена!",
      description: "Рассмотрение займет до 10 минут",
    });
  };

  const ApplicationTimer = () => {
    const [timeLeft, setTimeLeft] = useState(600); // 10 минут

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
        <Progress value={(600 - timeLeft) / 6} className="w-full" />
      </div>
    );
  };

  const ChatWidget = () => (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="rounded-full w-16 h-16 bg-secondary hover:bg-secondary/90 shadow-lg animate-bounce-gentle"
      >
        <Icon name="MessageCircle" size={24} />
      </Button>
      
      {isChatOpen && (
        <Card className="absolute bottom-20 right-0 w-80 h-96 animate-slide-up">
          <CardHeader className="bg-primary text-white rounded-t-lg">
            <CardTitle className="flex items-center justify-between">
              <span>Поддержка</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <Icon name="X" size={16} />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm">Здравствуйте! Как могу помочь с оформлением займа?</p>
            </div>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Icon name="Calculator" size={16} className="mr-2" />
                Помощь с калькулятором
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Icon name="FileText" size={16} className="mr-2" />
                Документы для займа
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Icon name="Clock" size={16} className="mr-2" />
                Сроки рассмотрения
              </Button>
            </div>
            <div className="flex space-x-2">
              <Input placeholder="Ваш вопрос..." className="flex-1" />
              <Button size="sm">
                <Icon name="Send" size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Banknote" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">МФО Финанс</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Займы</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">О нас</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Контакты</a>
              <Button variant="outline">
                <Icon name="User" size={16} className="mr-2" />
                Личный кабинет
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6 animate-fade-in">
            <Badge className="bg-secondary text-black">Одобрение за 10 минут</Badge>
            <h2 className="text-5xl font-bold text-gray-900 leading-tight">
              Займы до <span className="text-primary">50 000 ₽</span> на выгодных условиях
            </h2>
            <p className="text-xl text-gray-600">
              Быстрое получение денег на карту. Минимум документов, максимум удобства.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={20} className="text-secondary" />
                <span>До 30 дней</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Percent" size={20} className="text-secondary" />
                <span>0.08% в день</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={20} className="text-secondary" />
                <span>100% безопасно</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center animate-scale-in">
            <img 
              src="/img/416d01f0-3cd8-4d9a-ad27-609d474525cc.jpg" 
              alt="3D человек с калькулятором" 
              className="w-full max-w-md rounded-lg shadow-2xl"
            />
          </div>
        </section>

        <section className="mb-16">
          <Card className="max-w-2xl mx-auto shadow-2xl animate-slide-up">
            <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white">
              <CardTitle className="text-2xl text-center flex items-center justify-center space-x-2">
                <img 
                  src="/img/7d489d0d-735c-4338-a386-1d54b9e47384.jpg" 
                  alt="Калькулятор" 
                  className="w-8 h-8 rounded"
                />
                <span>Калькулятор займа</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Сумма займа: {loanAmount.toLocaleString()} ₽</Label>
                <Slider
                  value={[loanAmount]}
                  onValueChange={handleLoanAmountChange}
                  max={50000}
                  min={1000}
                  step={1000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>1 000 ₽</span>
                  <span>50 000 ₽</span>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-semibold">Срок займа: {loanDays} дней</Label>
                <Slider
                  value={[loanDays]}
                  onValueChange={handleLoanDaysChange}
                  max={30}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>1 день</span>
                  <span>30 дней</span>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <span>Сумма займа:</span>
                  <span className="font-semibold">{loanAmount.toLocaleString()} ₽</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Переплата:</span>
                  <span className="font-semibold text-orange-600">{overpayment.toLocaleString()} ₽</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>К возврату:</span>
                    <span className="text-primary">{totalAmount.toLocaleString()} ₽</span>
                  </div>
                </div>
              </div>

              <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full py-6 text-lg bg-secondary hover:bg-secondary/90 text-black font-bold"
                    onClick={() => setIsFormOpen(true)}
                  >
                    <Icon name="PlusCircle" size={24} className="mr-2" />
                    Оформить займ
                  </Button>
                </DialogTrigger>
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
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          placeholder="Иванов Иван Иванович"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Номер телефона</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="+7 (999) 123-45-67"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="example@mail.ru"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="passport">Серия и номер паспорта</Label>
                        <Input
                          id="passport"
                          value={formData.passport}
                          onChange={(e) => setFormData({...formData, passport: e.target.value})}
                          placeholder="1234 567890"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="income">Ежемесячный доход</Label>
                        <Select>
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
                          onChange={(e) => setFormData({...formData, workPlace: e.target.value})}
                          placeholder="ООО Компания"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="purpose">Цель займа</Label>
                        <Textarea
                          id="purpose"
                          value={formData.purpose}
                          onChange={(e) => setFormData({...formData, purpose: e.target.value})}
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
                          onCheckedChange={(checked) => setFormData({...formData, agreement: !!checked})}
                        />
                        <Label htmlFor="agreement" className="text-sm">
                          Согласен на обработку персональных данных
                        </Label>
                      </div>
                      
                      <Button 
                        onClick={handleFormSubmit}
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
                          onClick={() => setIsFormOpen(false)}
                          className="w-full"
                        >
                          Закрыть
                        </Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Zap" size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Быстрое одобрение</h3>
            <p className="text-gray-600">Рассмотрение заявки занимает до 10 минут</p>
          </Card>
          
          <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Shield" size={32} className="text-black" />
            </div>
            <h3 className="text-xl font-bold mb-2">Безопасность</h3>
            <p className="text-gray-600">Защищенная передача данных и конфиденциальность</p>
          </Card>
          
          <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CreditCard" size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">На карту</h3>
            <p className="text-gray-600">Деньги поступают на карту в течение 15 минут</p>
          </Card>
        </section>

        <section className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white text-center mb-16">
          <h3 className="text-3xl font-bold mb-4">🎉 Специальное предложение!</h3>
          <p className="text-xl mb-6">Первый займ под 0% для новых клиентов</p>
          <Badge className="bg-white text-primary text-lg px-4 py-2">
            Акция действует до конца месяца
          </Badge>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">МФО Финанс</h4>
              <p className="text-gray-400">Надежный партнер в мире микрофинансирования</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Услуги</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Микрозаймы</li>
                <li>Экспресс-займы</li>
                <li>Займы на карту</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Поддержка</h5>
              <ul className="space-y-2 text-gray-400">
                <li>8 (800) 123-45-67</li>
                <li>support@mfo-finans.ru</li>
                <li>Круглосуточно</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Документы</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Пользовательское соглашение</li>
                <li>Политика конфиденциальности</li>
                <li>Тарифы</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 МФО Финанс. Все права защищены.</p>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
};

export default Index;