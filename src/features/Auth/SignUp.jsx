import React, { useState } from 'react';
import SignupTerms from './SignupTerms';
import SignupForms from './SignupForms';
import SignupLocation from './SignupLocation';
import SignupSurvey from './SignupSurvey';
import SignupDone from './SignupDone';


const Signup = () => {
  const [step, setStep] = useState(1); // 상태로 단계 관리

  const goToNextStep = () => setStep(step + 1);
  const goToBeforeStep = () => setStep(step - 1);

  return (
    <div>
      {step === 1 && <SignupTerms onNext={goToNextStep} />}
      {step === 2 && <SignupForms onNext={goToNextStep} onBack={goToBeforeStep} />}
      {step === 3 && <SignupLocation onNext={goToNextStep} onBack={goToBeforeStep} />}
      {step === 4 && <SignupSurvey onBack={goToBeforeStep} />}
      {step === 5 && <SignupDone />}
    </div>
  );
};

export default SignUp;
