'use client';

import Modal from './modal';
import dynamic from 'next/dynamic';
import { useUI } from '@/contexts/managed-ui-provider';
import Newsletter from '@components/common/newsletter';

const LoginForm = dynamic(() => import('@components/auth/login-form'));
const SignUpForm = dynamic(() => import('@components/auth/sign-up-form'));
const ProductPopup = dynamic(() => import('@components/product/product-popup'));
// const ForgetPasswordForm = dynamic(() => import('@components/auth/forget-password-form'));

const ManagedModal: React.FC = () => {
  const { displayModal, closeModal, modalView } = useUI();
  return (
    <Modal open={displayModal} onClose={closeModal}>
      {modalView === 'LOGIN_VIEW' && <LoginForm />}
      {modalView === 'SIGN_UP_VIEW' && <SignUpForm />}
      {modalView === 'PRODUCT_VIEW' && <ProductPopup />}
      {modalView === 'NEWSLETTER_VIEW' && <Newsletter />}
      {/* {modalView === 'FORGET_PASSWORD' && <ForgetPasswordForm />} */}
    </Modal>
  );
};

export default ManagedModal;
