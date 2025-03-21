'use client';

import SearchIcon from '@components/icons/search-icon';
import UserIcon from '@components/icons/user-icon';
import MenuIcon from '@components/icons/menu-icon';
import HomeIcon from '@components/icons/home-icon';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { ROUTES } from '@utils/routes';
import { getDirection } from '@utils/get-direction';
import motionProps from '@components/common/drawer/motion';
import { useUI } from '@contexts/managed-ui-provider';
import Link from 'next/link';
import { Drawer } from '@components/common/drawer';

const CartButton = dynamic(() => import('@components/cart/cart-button'), { ssr: false });
const AuthMenu = dynamic(() => import('../header/auth-menu'), { ssr: false });
const MobileMenu = dynamic(() => import('../header/mobile-menu'));

const BottomNavigation: React.FC = () => {
  const { openSidebar, closeSidebar, displaySidebar, openSearch, openModal, setModalView, isAuthorized } = useUI();

  // Xử lý an toàn khi lấy locale
  const locale = useLocale();
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');

  useEffect(() => {
    if (locale) {
      setDirection(getDirection(locale));
    }
  }, [locale]);

  const contentWrapperCSS = direction === 'ltr' ? { left: 0 } : { right: 0 };

  function handleLogin() {
    setModalView('LOGIN_VIEW');
    openModal();
  }

  function handleMobileMenu() {
    openSidebar();
  }

  return (
    <>
      <div
        className="lg:hidden fixed z-10 bottom-0 flex items-center justify-between shadow-bottomNavigation text-gray-700 body-font bg-white w-full h-14 sm:h-16 px-4 md:px-8">
        <button
          aria-label="Menu"
          className="menuBtn flex flex-col items-center justify-center flex-shrink-0 outline-none focus:outline-none"
          onClick={handleMobileMenu}
        >
          <MenuIcon />
        </button>
        <button
          className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
          onClick={openSearch}
          aria-label="search-button"
        >
          <SearchIcon />
        </button>
        <Link href="/" className="flex-shrink-0">
          <HomeIcon />
        </Link>
        <CartButton />
        <AuthMenu
          isAuthorized={isAuthorized}
          href={ROUTES.ACCOUNT}
          className="flex-shrink-0"
          btnProps={{
            className: 'flex-shrink-0 focus:outline-none',
            children: <UserIcon />,
            onClick: handleLogin,
          }}
        >
          <UserIcon />
        </AuthMenu>
      </div>

      <Drawer
        placement={direction === 'rtl' ? 'right' : 'left'}
        open={displaySidebar}
        onClose={closeSidebar}
        styles={{ wrapper: contentWrapperCSS }}
        {...motionProps}
      >
        <div className="rc-drawer-content-wrapper">
          <div className="rc-drawer-content">
            <MobileMenu />
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default BottomNavigation;
