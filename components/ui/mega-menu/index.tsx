import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface MenuItem {
  id: number | string;
  url: string;
  title: string;
  children?: MenuItem[];
}

type MegaMenuProps = {
  columns: {
    id: number | string;
    url: string;
    title: string;
    children: MenuItem[];
  }[];
};

const Index: React.FC<MegaMenuProps> = ({ columns }) => {
  const t = useTranslations('menu');
  return (
    <div className="absolute bg-gray-200 megaMenu shadow-header ltr:-left-28 rtl:-right-28 ltr:xl:left-0 rtl:xl:right-0">
      <div className="grid grid-cols-5">
        {columns?.map((column) => (
          <ul className="pt-6 even:bg-gray-150 pb-7 2xl:pb-8 2xl:pt-7" key={column.id}>
            <li className="mb-1.5">
              <Link
                href={column.url}
                className="block text-sm py-1.5 text-heading font-semibold px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300"
              >
                {column.title}
              </Link>
            </li>
            {column?.children?.map((item: any) => (
              <li
                key={item.id}
                className={item?.children?.length === item.id ? 'border-b border-gray-300 pb-3.5 mb-3' : ''}
              >
                <Link
                  href={item.url}
                  className="text-body text-sm block py-1.5 px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300"
                >
                  {item.title}
                </Link>
              </li>
            ))}
            {/* {column?.map((columnItem) => (
              <React.Fragment key={columnItem.id}>
                <li className="mb-1.5">
                  <Link
                    href={columnItem.path}
                    className="block text-sm py-1.5 text-heading font-semibold px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300"
                  >
                    {t(columnItem.title)}
                  </Link>
                </li>
                {columnItem?.columnItemItems?.map((item: any) => (
                  <li
                    key={item.id}
                    className={
                      columnItem?.columnItemItems?.length === item.id ? 'border-b border-gray-300 pb-3.5 mb-3' : ''
                    }
                  >
                    <Link
                      href={item.path}
                      className="text-body text-sm block py-1.5 px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300"
                    >
                      {t(item.label)}
                    </Link>
                  </li>
                ))}
              </React.Fragment>
            ))} */}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Index;
