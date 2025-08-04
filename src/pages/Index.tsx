import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

import Header from '@/components/Header';
import LoanCalculator from '@/components/LoanCalculator';
import ApplicationForm from '@/components/ApplicationForm';
import ChatWidget from '@/components/ChatWidget';
import ProfileDialog from '@/components/ProfileDialog';
import AboutDialog from '@/components/AboutDialog';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

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

const Index = () => {
  const [loanAmount, setLoanAmount] = useState(25000);
  const [loanDays, setLoanDays] = useState(15);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [applicationStep, setApplicationStep] = useState(1);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([
    { id: 1, text: "Здравствуйте! Я помогу вам с оформлением займа. Есть вопросы?", isBot: true, timestamp: new Date() }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    passport: '',
    income: '',
    workPlace: '',
    purpose: '',
    agreement: false
  });

  const handleLoanAmountChange = (value: number[]) => {
    setLoanAmount(value[0]);
  };

  const handleLoanDaysChange = (value: number[]) => {
    setLoanDays(value[0]);
  };

  const handleFormSubmit = async () => {
    try {
      const emailData = {
        to: 'finanpro862@gmail.com',
        subject: `Новая заявка на займ - ${formData.fullName}`,
        body: `
Новая заявка на займ:

ФИО: ${formData.fullName}
Телефон: ${formData.phone}
Email: ${formData.email}
Паспорт: ${formData.passport}
Доход: ${formData.income}
Место работы: ${formData.workPlace}
Цель займа: ${formData.purpose}

Сумма займа: ${loanAmount.toLocaleString()} ₽
Срок: ${loanDays} дней
К возврату: ${Math.round(loanAmount * (1 + (0.08 / 100) * loanDays)).toLocaleString()} ₽

Дата подачи: ${new Date().toLocaleString('ru-RU')}
        `.trim()
      };

      console.log('Отправка данных на почту:', emailData);
      
    } catch (error) {
      console.error('Ошибка отправки:', error);
    }

    setApplicationStep(2);
  };

  const sendMessage = async (message: string) => {
    const userMessage: Message = {
      id: Date.now(),
      text: message,
      isBot: false,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    setTimeout(() => {
      const botResponses = [
        "Для займа до 50000₽ нужен только паспорт!",
        "Рассмотрение займа занимает до 10 минут",
        "Ставка 0.08% в день - одна из самых низких на рынке",
        "Первый займ для новых клиентов под 0%!",
        "Деньги поступят на карту в течение 15 минут"
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: Date.now() + 1,
        text: randomResponse,
        isBot: true,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header 
        onAboutClick={() => setIsAboutOpen(true)}
        onProfileClick={() => setIsProfileOpen(true)}
      />

      <main className="container mx-auto px-4 py-8">
        <section className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6 animate-fade-in">
            <Badge className="bg-gradient-to-r from-primary to-secondary text-white animate-pulse">🚀 Одобрение за 1 минуту</Badge>
            <h1 className="text-6xl font-bold text-gray-900 leading-tight">
              Займы до <span className="gradient-text">50 000 ₽</span> на выгодных условиях
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Быстрое получение денег на карту. Минимум документов, максимум удобства.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <Icon name="Clock" size={24} className="text-primary mx-auto mb-2" />
                <div className="text-sm font-semibold">До 30 дней</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <Icon name="Percent" size={24} className="text-secondary mx-auto mb-2" />
                <div className="text-sm font-semibold">0.08% в день</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <Icon name="Shield" size={24} className="text-green-500 mx-auto mb-2" />
                <div className="text-sm font-semibold">100% безопасно</div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button 
                size="lg"
                onClick={() => setIsFormOpen(true)}
                className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Icon name="Zap" size={20} className="mr-2" />
                Получить займ
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => setIsProfileOpen(true)}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-4 transition-all duration-300"
              >
                <Icon name="LogIn" size={20} className="mr-2" />
                Личный кабинет
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center animate-scale-in">
            <img 
              src="/img/79f6ae9a-dd9d-47c3-a426-896da6714289.jpg" 
              alt="Успешное финансовое решение" 
              className="w-full max-w-md rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </section>

        <LoanCalculator
          loanAmount={loanAmount}
          loanDays={loanDays}
          onAmountChange={handleLoanAmountChange}
          onDaysChange={handleLoanDaysChange}
          onApplyClick={() => setIsFormOpen(true)}
        />

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center p-8 hover:shadow-xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-white to-blue-50 border-0 shadow-lg">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Icon name="Zap" size={36} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">Быстрое одобрение</h3>
            <p className="text-gray-600 text-lg">Рассмотрение заявки занимает до 1 минуты</p>
            <div className="mt-4 text-3xl font-bold text-primary">1 мин</div>
          </Card>
          
          <Card className="text-center p-8 hover:shadow-xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-white to-green-50 border-0 shadow-lg">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Icon name="Shield" size={36} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">Безопасность</h3>
            <p className="text-gray-600 text-lg">Защищенная передача данных и конфиденциальность</p>
            <div className="mt-4 text-3xl font-bold text-green-600">SSL</div>
          </Card>
          
          <Card className="text-center p-8 hover:shadow-xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-white to-yellow-50 border-0 shadow-lg">
            <div className="w-20 h-20 bg-gradient-to-br from-secondary to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Icon name="CreditCard" size={36} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">На карту</h3>
            <p className="text-gray-600 text-lg">Деньги поступают на карту в течение 15 минут</p>
            <div className="mt-4 text-3xl font-bold text-orange-600">15 мин</div>
          </Card>
        </section>

        <section className="bg-gradient-to-r from-primary via-blue-500 to-secondary rounded-3xl p-12 text-white text-center mb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className="text-6xl mb-4 animate-bounce-gentle">🎉</div>
            <h3 className="text-4xl font-bold mb-4">Специальное предложение!</h3>
            <p className="text-2xl mb-8 opacity-90">Первый займ под <span className="font-bold text-3xl">0%</span> для новых клиентов</p>
            <div className="flex justify-center items-center gap-4 mb-6">
              <Badge className="bg-white/20 text-white text-lg px-6 py-3 backdrop-blur-sm border border-white/30">
                <Icon name="Clock" size={16} className="mr-2" />
                Акция действует до конца месяца
              </Badge>
            </div>
            <Button 
              size="lg"
              onClick={() => setIsFormOpen(true)}
              className="bg-white text-primary hover:bg-gray-100 font-bold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Воспользоваться предложением
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">Фин5</h4>
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
            <p>&copy; 2024 Фин5. Все права защищены.</p>
          </div>
        </div>
      </footer>

      <ChatWidget
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        messages={chatMessages}
        onSendMessage={sendMessage}
        isTyping={isTyping}
      />

      <ApplicationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        loanAmount={loanAmount}
        loanDays={loanDays}
        formData={formData}
        onFormDataChange={setFormData}
        applicationStep={applicationStep}
        onSubmit={handleFormSubmit}
      />

      <ProfileDialog
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userProfile={userProfile}
        onLogin={setUserProfile}
        onLogout={() => setUserProfile(null)}
      />

      <AboutDialog
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
};

export default Index;