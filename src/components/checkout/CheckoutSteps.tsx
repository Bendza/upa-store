interface CheckoutStepsProps {
  currentStep: 'information' | 'shipping' | 'payment';
}

const steps = [
  { id: 'information', label: 'Informacije' },
  { id: 'shipping', label: 'Dostava' },
  { id: 'payment', label: 'Plaćanje' }
] as const;

const CheckoutSteps = ({ currentStep }: CheckoutStepsProps) => {
  return (
    <nav aria-label="Progress">
      <ol className="flex items-center">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = steps.findIndex(s => s.id === currentStep) > index;

          return (
            <li key={step.id} className={`relative ${index !== 0 ? 'flex-1' : ''}`}>
              {index !== 0 && (
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className={`h-0.5 w-full ${isCompleted ? 'bg-[#B39B8E]' : 'bg-gray-200'}`} />
                </div>
              )}
              <div className="relative flex items-center justify-center">
                <span className={`
                  w-8 h-8 flex items-center justify-center rounded-full text-sm
                  ${isActive ? 'bg-[#B39B8E] text-white' : 
                    isCompleted ? 'bg-[#B39B8E] text-white' : 'bg-gray-100 text-gray-500'}
                `}>
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </span>
                <span className={`
                  ml-4 text-sm font-medium
                  ${isActive ? 'text-[#B39B8E]' : 
                    isCompleted ? 'text-[#B39B8E]' : 'text-gray-500'}
                `}>
                  {step.label}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default CheckoutSteps; 