import React, { useState } from "react";
import { ProvideNewPassword } from "@/components/auth/ProvideNewPassword";
import { RequestNewPassword } from "@/components/auth/RequestNewPassword";

export default function ForgotPasswordScreen() {
  const [emailAddress, setEmailAddress] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  if (isEmailSent) {
    return <ProvideNewPassword emailAddress={emailAddress} />;
  }

  return (
    <RequestNewPassword
      emailAddress={emailAddress}
      setIsEmailSent={setIsEmailSent}
      setEmailAddress={setEmailAddress}
    />
  );
}
