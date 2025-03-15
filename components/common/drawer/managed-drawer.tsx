'use client';

import { Drawer } from '@components/common/drawer/drawer';
import { useRouter } from 'next/router';
import { getDirection } from '@utils/get-direction';
import motionProps from '@components/common/drawer/motion';
import { useUI } from '@/contexts/ui.context';
import Cart from '@/components/cart';

const ManagedDrawer = () => {
  const { displayCart, closeCart } = useUI();
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const contentWrapperCSS = dir === 'ltr' ? { right: 0 } : { left: 0 };
  return (
    <Drawer
      open={displayCart}
      placement={dir === 'rtl' ? 'left' : 'right'}
      onClose={closeCart}
      styles={{
        wrapper: contentWrapperCSS,
      }}
      {...motionProps}
    >
      <Cart />
    </Drawer>
  );
};

export default ManagedDrawer;
