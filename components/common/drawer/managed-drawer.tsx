'use client';

import { usePathname } from 'next/navigation';
import { getDirection } from '@utils/get-direction';
import motionProps from '@components/common/drawer/motion';
import { useUI } from '@/contexts/ui.context';
import Cart from '@/components/cart';
import { Drawer } from '@components/common/drawer/index';

const ManagedDrawer = () => {
  const { displayCart, closeCart } = useUI();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  const dir = getDirection(locale);
  const contentWrapperCSS = dir === 'ltr' ? { right: 0 } : { left: 0 };
  return (
    <Drawer
      className="managed-drawer"
      open={displayCart}
      placement={dir === 'rtl' ? 'left' : 'right'}
      onClose={closeCart}
      styles={{
        wrapper: contentWrapperCSS,
      }}
      {...motionProps}
    >
      <div className="rc-drawer-content">
        <Cart />
      </div>
    </Drawer>
  );
};

export default ManagedDrawer;
