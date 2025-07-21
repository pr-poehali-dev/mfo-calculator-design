import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface LoanCalculatorProps {
  loanAmount: number;
  loanDays: number;
  onAmountChange: (value: number[]) => void;
  onDaysChange: (value: number[]) => void;
  onApplyClick: () => void;
}

const LoanCalculator: React.FC<LoanCalculatorProps> = ({
  loanAmount,
  loanDays,
  onAmountChange,
  onDaysChange,
  onApplyClick
}) => {
  const dailyRate = 0.08; // 0.08% в день
  const totalAmount = Math.round(loanAmount * (1 + (dailyRate / 100) * loanDays));
  const overpayment = totalAmount - loanAmount;

  return (
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
              onValueChange={onAmountChange}
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
              onValueChange={onDaysChange}
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

          <Button 
            className="w-full py-6 text-lg bg-secondary hover:bg-secondary/90 text-black font-bold"
            onClick={onApplyClick}
          >
            <Icon name="PlusCircle" size={24} className="mr-2" />
            Оформить займ
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default LoanCalculator;