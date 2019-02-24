export const password = {
  mismatch: 'One of these passwords is not like the other',
  reset_helper: 'Happens to the best of us.',
  success: 'Your password has been successfully reset.',
  emailSent: email => `Password reset email sent to ${email}.`,
  new_helper: 'Make it a really good one.',
  noEmail: "Who's the lucky account getting a Password Reset?"
};

export const login = error => authErrors(error);

export const unexpected = "Oops, our bad. Please let your planner know what happened and we'll check it out.";

export const email = {
  sent: "Hurray! Email verification is on its way!",
  validate: email =>`You're all set at ${email}. You're a redirect away from your dream day.`,
};

export function authErrors(error, actionText='') {
  switch(error.code) {
    case 'auth/invalid-action-code' :
      return 'An invalid code was supplied. Please do not tamper with the URL.';

    case 'auth/expired-action-code' :
      return `This link is invalid or expired and likely rancid. ${actionText}`;

    case 'auth/user-disabled' :
      return 'This account has been disabled.';

    case 'auth/user-not-found' :
      return "Sorry, we don't have an account attached to that email.";

    case 'auth/wrong-password' :
      return "Are you sure you entered the right password?";

    case 'auth/invalid-email' :
      return 'Whoa there, that email looks incorrect';

    case 'auth/weak-password' :
      return 'Try a stronger, more secure password';

    case 'auth/requires-recent-login' :
      return 'We want to make sure you are who you say you are. Please login again.';

    default :
      return error.message;
  }
};
