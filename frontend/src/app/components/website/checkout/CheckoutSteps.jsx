const steps = ["Cart", "Shipping", "Payment", "Confirmation"];

export default function CheckoutSteps({ activeStep = 2 }) {
  return (
    <ol className="flex items-center gap-2 mb-10">
      {steps.map((step, i) => {
        const index = i + 1;
        const isActive = index === activeStep;
        const isDone = index < activeStep;
        return (
          <li key={step} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs
                  ${isActive ? "bg-amber-700 text-white" : ""}
                  ${isDone ? "bg-stone-900 text-white" : ""}
                  ${!isActive && !isDone ? "bg-stone-200 text-stone-500" : ""}
                `}
              >
                {index}
              </span>
              <span className={`text-sm ${isActive ? "text-stone-900" : "text-stone-500"}`}>
                {step}
              </span>
            </div>
            {index !== steps.length && <span className="w-8 h-px bg-stone-200 ml-2" />}
          </li>
        );
      })}
    </ol>
  );
}