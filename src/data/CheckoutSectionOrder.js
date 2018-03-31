import ContactSection from '../components/checkout/ContactSection';
import HikeInfoSection from '../components/checkout/HikeInfoSection';
import PaymentSection from '../components/checkout/PaymentSection';
import PaymentTypeSection from '../components/checkout/PaymentTypeSection';
import CheckoutConfirmation from '../components/checkout/CheckoutConfirmation';

export default [
  { component: ContactSection, path: 'contact-info', name: 'Contact Info' },
  { component: HikeInfoSection, path: 'hike-info', name: 'Hike Info' },
  { component: PaymentTypeSection, path: 'payment-type', name: 'Payment Type' },
  { component: PaymentSection, path: 'payment', name: 'Payment' },
  {
    component: CheckoutConfirmation,
    path: 'confirmation',
    name: 'Confirmation',
  },
];
