'use client';

import { useUI } from '@contexts/managed-ui-provider';
import dynamic from 'next/dynamic';
import Modal from '@components/common/modal/index';
import Newsletter from '@components/common/newsletter';

const ProductPopup = dynamic(() => import('@components/product/product-popup'));

// const LoginForm = dynamic(() => import("@components/auth/login-form"));
// const SignUpForm = dynamic(() => import("@components/auth/sign-up-form"));
// const ForgetPasswordForm = dynamic(
//   () => import("@components/auth/forget-password-form")
// );

const ManagedModal: React.FC = () => {
  const { displayModal, closeModal, modalView } = useUI();
  return (
    <Modal open={displayModal} onClose={closeModal} useBlurBackdrop={true}>
      {/*{modalView === 'LOGIN_VIEW' && <LoginForm />}*/}
      {/*{modalView === 'SIGN_UP_VIEW' && <SignUpForm />}*/}
      {/*{modalView === 'FORGET_PASSWORD' && <ForgetPasswordForm />}*/}
      {modalView === 'PRODUCT_VIEW' && <ProductPopup />}
      {modalView === 'NEWSLETTER_VIEW' && <Newsletter />}
    </Modal>
  );
};

export default ManagedModal;
