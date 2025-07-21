/**
 * Встраиваемый калькулятор займа Фин5
 * Версия: 1.0
 * 
 * Использование:
 * <div id="fin5-calculator"></div>
 * <script src="embed-calculator.js"></script>
 */

(function() {
    'use strict';

    // Конфигурация
    const CONFIG = {
        DAILY_RATE: 0.08,
        TARGET_URL: 'https://fin5.ru',
        MIN_AMOUNT: 1000,
        MAX_AMOUNT: 50000,
        MIN_DAYS: 1,
        MAX_DAYS: 30,
        DEFAULT_AMOUNT: 15000,
        DEFAULT_DAYS: 14
    };

    // CSS стили
    const CSS = `
        .fin5-calculator {
            max-width: 500px;
            margin: 0 auto;
            padding: 24px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            box-sizing: border-box;
        }
        .fin5-calculator * {
            box-sizing: border-box;
        }
        .fin5-header {
            background: linear-gradient(135deg, #3b82f6, #10b981);
            color: white;
            padding: 20px;
            border-radius: 12px 12px 0 0;
            margin: -24px -24px 24px -24px;
            text-align: center;
        }
        .fin5-title {
            font-size: 24px;
            font-weight: bold;
            margin: 0;
        }
        .fin5-group {
            margin-bottom: 24px;
        }
        .fin5-label {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 12px;
            display: block;
            color: #374151;
        }
        .fin5-slider {
            width: 100%;
            height: 6px;
            border-radius: 3px;
            background: #e5e7eb;
            outline: none;
            -webkit-appearance: none;
            margin-bottom: 8px;
        }
        .fin5-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #3b82f6;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .fin5-slider::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #3b82f6;
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .fin5-range {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: #6b7280;
        }
        .fin5-results {
            background: #f9fafb;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .fin5-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
        }
        .fin5-row:last-child {
            margin-bottom: 0;
            padding-top: 12px;
            border-top: 1px solid #e5e7eb;
            font-weight: bold;
            font-size: 20px;
        }
        .fin5-amount {
            font-weight: 600;
        }
        .fin5-overpay {
            color: #f59e0b;
        }
        .fin5-total {
            color: #3b82f6;
        }
        .fin5-button {
            width: 100%;
            padding: 16px;
            background: linear-gradient(135deg, #10b981, #3b82f6);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.2s;
        }
        .fin5-button:hover {
            transform: translateY(-2px);
        }
        .fin5-powered {
            text-align: center;
            margin-top: 16px;
            font-size: 12px;
            color: #6b7280;
        }
        .fin5-powered a {
            color: #3b82f6;
            text-decoration: none;
        }
    `;

    // HTML шаблон
    const HTML_TEMPLATE = `
        <div class="fin5-calculator">
            <div class="fin5-header">
                <h2 class="fin5-title">🧮 Калькулятор займа</h2>
            </div>
            
            <div class="fin5-group">
                <label class="fin5-label">
                    Сумма займа: <span data-amount>${CONFIG.DEFAULT_AMOUNT.toLocaleString()}</span> ₽
                </label>
                <input 
                    type="range" 
                    class="fin5-slider" 
                    data-amount-slider
                    min="${CONFIG.MIN_AMOUNT}" 
                    max="${CONFIG.MAX_AMOUNT}" 
                    step="1000" 
                    value="${CONFIG.DEFAULT_AMOUNT}"
                >
                <div class="fin5-range">
                    <span>${CONFIG.MIN_AMOUNT.toLocaleString()} ₽</span>
                    <span>${CONFIG.MAX_AMOUNT.toLocaleString()} ₽</span>
                </div>
            </div>

            <div class="fin5-group">
                <label class="fin5-label">
                    Срок займа: <span data-days>${CONFIG.DEFAULT_DAYS}</span> дней
                </label>
                <input 
                    type="range" 
                    class="fin5-slider" 
                    data-days-slider
                    min="${CONFIG.MIN_DAYS}" 
                    max="${CONFIG.MAX_DAYS}" 
                    step="1" 
                    value="${CONFIG.DEFAULT_DAYS}"
                >
                <div class="fin5-range">
                    <span>${CONFIG.MIN_DAYS} день</span>
                    <span>${CONFIG.MAX_DAYS} дней</span>
                </div>
            </div>

            <div class="fin5-results">
                <div class="fin5-row">
                    <span>Сумма займа:</span>
                    <span class="fin5-amount" data-loan-amount></span>
                </div>
                <div class="fin5-row">
                    <span>Переплата:</span>
                    <span class="fin5-amount fin5-overpay" data-overpayment></span>
                </div>
                <div class="fin5-row">
                    <span>К возврату:</span>
                    <span class="fin5-amount fin5-total" data-total-amount></span>
                </div>
            </div>

            <button class="fin5-button" data-apply-button>
                💰 Подать заявку
            </button>

            <div class="fin5-powered">
                Powered by <a href="${CONFIG.TARGET_URL}" target="_blank">Фин5</a>
            </div>
        </div>
    `;

    // Класс калькулятора
    class LoanCalculator {
        constructor(container) {
            this.container = container;
            this.amount = CONFIG.DEFAULT_AMOUNT;
            this.days = CONFIG.DEFAULT_DAYS;
            
            this.init();
        }

        init() {
            // Добавляем стили
            this.addStyles();
            
            // Рендерим HTML
            this.container.innerHTML = HTML_TEMPLATE;
            
            // Находим элементы
            this.elements = {
                amountSlider: this.container.querySelector('[data-amount-slider]'),
                daysSlider: this.container.querySelector('[data-days-slider]'),
                amountDisplay: this.container.querySelector('[data-amount]'),
                daysDisplay: this.container.querySelector('[data-days]'),
                loanAmount: this.container.querySelector('[data-loan-amount]'),
                overpayment: this.container.querySelector('[data-overpayment]'),
                totalAmount: this.container.querySelector('[data-total-amount]'),
                applyButton: this.container.querySelector('[data-apply-button]')
            };
            
            // Добавляем обработчики
            this.bindEvents();
            
            // Первоначальный расчет
            this.calculate();
        }

        addStyles() {
            if (!document.getElementById('fin5-calculator-styles')) {
                const style = document.createElement('style');
                style.id = 'fin5-calculator-styles';
                style.textContent = CSS;
                document.head.appendChild(style);
            }
        }

        bindEvents() {
            this.elements.amountSlider.addEventListener('input', () => {
                this.amount = parseInt(this.elements.amountSlider.value);
                this.calculate();
            });

            this.elements.daysSlider.addEventListener('input', () => {
                this.days = parseInt(this.elements.daysSlider.value);
                this.calculate();
            });

            this.elements.applyButton.addEventListener('click', () => {
                this.applyForLoan();
            });
        }

        calculate() {
            const overpaymentAmount = Math.round(this.amount * (CONFIG.DAILY_RATE / 100) * this.days);
            const total = this.amount + overpaymentAmount;

            // Обновляем отображение
            this.elements.amountDisplay.textContent = this.amount.toLocaleString();
            this.elements.daysDisplay.textContent = this.days;
            this.elements.loanAmount.textContent = this.amount.toLocaleString() + ' ₽';
            this.elements.overpayment.textContent = overpaymentAmount.toLocaleString() + ' ₽';
            this.elements.totalAmount.textContent = total.toLocaleString() + ' ₽';
        }

        applyForLoan() {
            const url = `${CONFIG.TARGET_URL}?amount=${this.amount}&days=${this.days}&utm_source=widget`;
            window.open(url, '_blank');
        }
    }

    // Автоинициализация
    function initCalculators() {
        const containers = document.querySelectorAll('#fin5-calculator, .fin5-calculator-container');
        containers.forEach(container => {
            if (!container.dataset.initialized) {
                new LoanCalculator(container);
                container.dataset.initialized = 'true';
            }
        });
    }

    // Инициализация при загрузке DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCalculators);
    } else {
        initCalculators();
    }

    // Глобальная функция для ручной инициализации
    window.Fin5Calculator = {
        init: initCalculators,
        create: function(containerId) {
            const container = document.getElementById(containerId);
            if (container) {
                return new LoanCalculator(container);
            }
        }
    };

})();