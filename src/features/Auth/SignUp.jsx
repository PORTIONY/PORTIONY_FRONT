import React, { useState } from 'react';
import SignupTerms from './Signup/SignupTerms';
import SignupForms from './Signup/SignupForms';
import SignupLocation from './Signup/SignupLocation';
import SignupSurvey from './Signup/SignupSurvey';
import SignupDone from './Signup/SignupDone';


const SignUp = () => {
  const [step, setStep] = useState(1); // 상태로 단계 관리

  const goToNextStep = () => setStep(step + 1);
  const goToBeforeStep = () => setStep(step - 1);

  return (
    <div>
      {step === 1 && <SignupTerms onNext={goToNextStep} />}
      {step === 2 && <SignupForms onNext={goToNextStep} onBack={goToBeforeStep} />}
      {step === 3 && <SignupLocation onNext={goToNextStep} onBack={goToBeforeStep} />}
      {step === 4 && <SignupSurvey onNext={goToNextStep} onBack={goToBeforeStep} />}
      {step === 5 && <SignupDone />}
    </div>
  );
};

export default SignUp;
