import ContactSection from '../components/checkout/ContactSection';
import HikeInfoSection from '../components/checkout/HikeInfoSection';
import PaymentSection from '../components/checkout/PaymentSection';
import PaymentTypeSection from '../components/checkout/PaymentTypeSection';
import CheckoutConfirmation from '../components/checkout/CheckoutConfirmation';

export default [
  {
    component: ContactSection,
    path: 'contact-info',
    name: 'Contact Info',
    img: 'contact.png',
  },
  {
    component: HikeInfoSection,
    path: 'hike-info',
    name: 'Hike Info',
    img: 'hike.png',
  },
  {
    component: PaymentTypeSection,
    path: 'payment-type',
    name: 'Payment Type',
    img: 'payment-type.png',
  },
  {
    component: PaymentSection,
    path: 'payment',
    name: 'Payment',
    img: 'payment.png',
  },
  {
    component: CheckoutConfirmation,
    path: 'confirmation',
    name: 'Checkout',
    img: 'confirm.png',
  },
];
