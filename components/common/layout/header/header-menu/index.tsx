import { FaChevronDown } from 'react-icons/fa';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import MegaMenu from '@components/ui/mega-menu';
import Link from 'next/link';
import ListMenu from '@components/ui/list-menu';

interface MenuProps {
  data: any;
  className?: string;
}

const HeaderMenu: React.FC<MenuProps> = ({ data, className }) => {
  function getCategoryPath(url: string) {
    try {
      const pathname = url.startsWith('/')
        ? url.split('/').filter((segment) => segment)
        : new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost').pathname
            .split('/')
            .filter((segment) => segment);

      const index = pathname.indexOf('product-category');
      return index !== -1 && index + 1 < pathname.length ? `/search?category=${pathname[pathname.length - 1]}` : '';
    } catch (error) {
      console.error('Invalid URL:', url);
      return '';
    }
  }

  return (
    <nav className={classNames(`headerMenu flex w-full relative`, className)}>
      {data?.map((item: any) => (
        <div className={`menuItem group cursor-pointer py-7 ${item.children ? 'relative' : ''}`} key={item.id}>
          <Link
            href={getCategoryPath(item.url)}
            className="relative inline-flex items-center px-3 py-2 text-sm font-normal xl:text-base text-heading xl:px-4 group-hover:text-black"
          >
            {item.title}
            {item.children.length > 0 && (
              <span className="opacity-30 text-xs mt-1 xl:mt-0.5 w-4 flex justify-end">
                <FaChevronDown className="transition duration-300 ease-in-out transform group-hover:-rotate-180" />
              </span>
            )}
          </Link>

          {item?.type !== 'custom' && Array.isArray(item.children) && <MegaMenu columns={item.children} />}

          {item?.type === 'custom' && item.children.length > 0 && Array.isArray(item.children) && (
            <div className="absolute invisible bg-white opacity-0 group-hover:visible subMenu shadow-header ltr:left-0 rtl:right-0 group-hover:opacity-100">
              <ul className="py-5 text-sm text-body">
                {item.children.map((menu: any, index: number) => {
                  const dept: number = 1;
                  const menuName: string = `sidebar-menu-${dept}-${index}`;
                  return (
                    <ListMenu
                      dept={dept}
                      data={menu}
                      hasSubMenu={menu.children.length > 0}
                      menuName={menuName}
                      key={menuName}
                      menuIndex={index}
                    />
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default HeaderMenu;
