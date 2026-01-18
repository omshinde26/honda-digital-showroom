import React, { useState, useEffect, useRef } from 'react';

const EMICalculator: React.FC = () => {
  const [downPayment, setDownPayment] = useState(8965);
  const [interestRate, setInterestRate] = useState(9);
  const [tenure, setTenure] = useState(24);
  const [tenureType, setTenureType] = useState<'Mo' | 'Yr'>('Mo');
  const [emi, setEmi] = useState(0);
  const [isDragging, setIsDragging] = useState<string | null>(null);

  const downPaymentRef = useRef<HTMLDivElement>(null);
  const interestRateRef = useRef<HTMLDivElement>(null);
  const tenureRef = useRef<HTMLDivElement>(null);

  const vehiclePrice = 87234; // Activa 125 price
  const loanAmount = vehiclePrice - downPayment;

  useEffect(() => {
    const actualTenure = tenureType === 'Yr' ? tenure * 12 : tenure;
    const r = interestRate / 12 / 100;
    const n = actualTenure;
    
    if (loanAmount > 0 && r > 0 && n > 0) {
      const calculatedEmi = Math.round((loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
      setEmi(calculatedEmi);
    } else {
      setEmi(0);
    }
  }, [downPayment, interestRate, tenure, tenureType, loanAmount]);

  const handleSliderClick = (
    event: React.MouseEvent<HTMLDivElement>,
    sliderRef: React.RefObject<HTMLDivElement>,
    min: number,
    max: number,
    setValue: (value: number) => void,
    step: number = 1
  ) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const rawValue = min + (percentage * (max - min));
    const steppedValue = Math.round(rawValue / step) * step;
    const clampedValue = Math.max(min, Math.min(max, steppedValue));
    
    setValue(clampedValue);
  };

  const handleMouseDown = (sliderType: string) => {
    setIsDragging(sliderType);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging) return;

    let sliderRef: React.RefObject<HTMLDivElement>;
    let min: number, max: number, setValue: (value: number) => void, step: number = 1;

    switch (isDragging) {
      case 'downPayment':
        sliderRef = downPaymentRef;
        min = 0;
        max = vehiclePrice;
        setValue = setDownPayment;
        step = 1000;
        break;
      case 'interestRate':
        sliderRef = interestRateRef;
        min = 5;
        max = 20;
        setValue = setInterestRate;
        step = 0.1;
        break;
      case 'tenure':
        sliderRef = tenureRef;
        min = tenureType === 'Mo' ? 6 : 1;
        max = tenureType === 'Mo' ? 60 : 5;
        setValue = setTenure;
        step = 1;
        break;
      default:
        return;
    }

    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const rawValue = min + (percentage * (max - min));
    const steppedValue = Math.round(rawValue / step) * step;
    const clampedValue = Math.max(min, Math.min(max, steppedValue));
    
    setValue(clampedValue);
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (!isDragging) return;
    
    const touch = event.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    
    handleMouseMove(mouseEvent);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging, tenureType]);

  const CustomSlider = ({ 
    value, 
    min, 
    max, 
    onChange, 
    step = 1, 
    sliderRef, 
    sliderType,
    label,
    unit = ""
  }: {
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
    step?: number;
    sliderRef: React.RefObject<HTMLDivElement>;
    sliderType: string;
    label: string;
    unit?: string;
  }) => {
    const percentage = ((value - min) / (max - min)) * 100;
    const isBeingDragged = isDragging === sliderType;

    return (
      <div className="relative">
        <div
          ref={sliderRef}
          className={`w-full bg-lightGrey2 rounded-lg transition-all duration-300 ${
            isBeingDragged ? 'h-5 shadow-lg' : 'h-3 hover:h-4 hover:shadow-md'
          }`}
          style={{
            background: `linear-gradient(to right, #E4002B 0%, #E4002B ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`,
            boxShadow: isBeingDragged ? '0 4px 20px rgba(228, 0, 43, 0.3)' : undefined
          }}
        />
        
        {/* Enhanced Slider Handle */}
        <div 
          className={`absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-jetBlack rounded-lg shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing transition-all duration-300 ${
            isBeingDragged 
              ? 'w-10 h-10 scale-110 shadow-2xl ring-4 ring-hondaRed ring-opacity-30' 
              : 'w-7 h-7 hover:scale-110 hover:shadow-2xl'
          }`}
          style={{ 
            left: `${percentage}%`,
            background: isBeingDragged 
              ? 'linear-gradient(135deg, #000000 0%, #333333 100%)' 
              : '#000000',
            transform: `translate(-50%, -50%) ${isBeingDragged ? 'scale(1.1)' : 'scale(1)'}`
          }}
          onMouseDown={() => handleMouseDown(sliderType)}
          onTouchStart={() => handleMouseDown(sliderType)}
        >
          <div className={`bg-white rounded-full transition-all duration-200 ${
            isBeingDragged ? 'w-2.5 h-2.5' : 'w-2 h-2'
          }`}></div>
          <div className={`bg-white rounded-full ml-0.5 transition-all duration-200 ${
            isBeingDragged ? 'w-2.5 h-2.5' : 'w-2 h-2'
          }`}></div>
        </div>

        {/* Real-time Value Display While Dragging */}
        {isBeingDragged && (
          <div 
            className="absolute -top-16 transform -translate-x-1/2 bg-jetBlack text-white px-4 py-2 rounded-lg shadow-xl z-10 animate-in fade-in slide-in-from-bottom-2 duration-200"
            style={{ left: `${percentage}%` }}
          >
            <div className="text-center">
              <div className="text-xs font-medium text-gray-300 uppercase tracking-wide">{label}</div>
              <div className="text-lg font-bold">
                {sliderType === 'downPayment' ? `₹${value.toLocaleString()}` : `${value}${unit}`}
              </div>
            </div>
            {/* Arrow pointing down */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-jetBlack"></div>
          </div>
        )}

        {/* Progress Indicator Dots */}
        <div className="absolute inset-0 flex items-center pointer-events-none">
          {[...Array(5)].map((_, i) => {
            const dotPosition = (i + 1) * 20;
            const isPassed = percentage >= dotPosition;
            return (
              <div
                key={i}
                className={`absolute w-1 h-1 rounded-full transition-all duration-300 ${
                  isPassed ? 'bg-white shadow-sm' : 'bg-gray-400'
                } ${isBeingDragged && isPassed ? 'scale-150 bg-white' : ''}`}
                style={{ left: `${dotPosition}%`, transform: 'translateX(-50%)' }}
              />
            );
          })}
        </div>
        
        {/* Hidden native input for accessibility */}
        <input 
          type="range" 
          min={min} 
          max={max} 
          step={step}
          value={value} 
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label={`${label} slider`}
        />
      </div>
    );
  };

  return (
    <div className="bg-white p-8 lg:p-12 rounded-lg shadow-lg border border-lightGrey2 max-w-4xl mx-auto transition-all duration-500 hover:shadow-xl">
      <h2 className="text-3xl font-bold mb-12 text-jetBlack transition-colors duration-300">EMI Calculator</h2>
      
      <div className="space-y-10">
        {/* Down Payment */}
        <div className="transition-all duration-300 hover:transform hover:scale-[1.02]">
          <div className="flex justify-between items-center mb-6">
            <label className="text-lg font-medium text-charcoalGrey transition-colors duration-200">Down Payment</label>
            <div className="relative">
              <input 
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-48 px-4 py-3 border-2 border-lightGrey2 rounded-lg text-right text-lg font-semibold focus:border-hondaRed focus:outline-none transition-all duration-300 focus:shadow-lg focus:scale-105"
                min="0"
                max={vehiclePrice}
              />
            </div>
          </div>
          <CustomSlider
            value={downPayment}
            min={0}
            max={vehiclePrice}
            step={1000}
            onChange={setDownPayment}
            sliderRef={downPaymentRef}
            sliderType="downPayment"
            label="Down Payment"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Interest Rate */}
          <div className="transition-all duration-300 hover:transform hover:scale-[1.02]">
            <div className="flex justify-between items-center mb-6">
              <label className="text-lg font-medium text-charcoalGrey transition-colors duration-200">Interest Rate (%)</label>
            </div>
            <div className="relative mb-4">
              <input 
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-lightGrey2 rounded-lg text-lg font-semibold focus:border-hondaRed focus:outline-none transition-all duration-300 focus:shadow-lg focus:scale-105"
                min="5"
                max="20"
                step="0.1"
              />
            </div>
            <CustomSlider
              value={interestRate}
              min={5}
              max={20}
              step={0.1}
              onChange={setInterestRate}
              sliderRef={interestRateRef}
              sliderType="interestRate"
              label="Interest Rate"
              unit="%"
            />
          </div>

          {/* Tenure */}
          <div className="transition-all duration-300 hover:transform hover:scale-[1.02]">
            <div className="flex justify-between items-center mb-6">
              <label className="text-lg font-medium text-charcoalGrey transition-colors duration-200">Tenure</label>
              <div className="flex bg-jetBlack rounded-full p-1 transition-all duration-300 hover:shadow-lg">
                <button
                  onClick={() => setTenureType('Mo')}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                    tenureType === 'Mo' ? 'bg-white text-jetBlack shadow-md' : 'text-white hover:bg-gray-800'
                  }`}
                >
                  Mo
                </button>
                <button
                  onClick={() => setTenureType('Yr')}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                    tenureType === 'Yr' ? 'bg-white text-jetBlack shadow-md' : 'text-white hover:bg-gray-800'
                  }`}
                >
                  Yr
                </button>
              </div>
            </div>
            <div className="relative mb-4">
              <input 
                type="number"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-lightGrey2 rounded-lg text-lg font-semibold focus:border-hondaRed focus:outline-none transition-all duration-300 focus:shadow-lg focus:scale-105"
                min={tenureType === 'Mo' ? "6" : "1"}
                max={tenureType === 'Mo' ? "60" : "5"}
              />
            </div>
            <CustomSlider
              value={tenure}
              min={tenureType === 'Mo' ? 6 : 1}
              max={tenureType === 'Mo' ? 60 : 5}
              step={1}
              onChange={setTenure}
              sliderRef={tenureRef}
              sliderType="tenure"
              label="Tenure"
              unit={tenureType === 'Mo' ? ' Months' : ' Years'}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8">
          <button className="flex-1 bg-jetBlack text-white py-4 px-8 rounded-full font-bold text-lg hover:bg-hondaRed transition-all duration-300 hover:scale-105 hover:shadow-xl transform">
            Calculate EMI
          </button>
          <button className="flex-1 bg-jetBlack text-white py-4 px-8 rounded-full font-bold text-lg hover:bg-hondaRed transition-all duration-300 hover:scale-105 hover:shadow-xl transform">
            Avail Finance
          </button>
        </div>

        {/* EMI Result */}
        {emi > 0 && (
          <div className="bg-lightGrey1 p-6 rounded-lg text-center border-l-4 border-hondaRed transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 hover:shadow-lg hover:scale-[1.02]">
            <p className="text-sm font-semibold text-charcoalGrey mb-2 uppercase tracking-widest transition-colors duration-200">Monthly EMI</p>
            <div className="text-3xl font-bold text-hondaRed mb-2 transition-all duration-300 hover:scale-110">
              ₹{emi.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 transition-colors duration-200">
              Loan Amount: ₹{loanAmount.toLocaleString()} | Tenure: {tenureType === 'Mo' ? tenure : tenure * 12} months
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EMICalculator;