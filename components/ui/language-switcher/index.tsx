'use client';

import { useState, useEffect, Fragment } from 'react';
import { Listbox, ListboxOptions, ListboxOption, ListboxButton, Transition } from '@headlessui/react';
import { usePathname, useRouter } from 'next/navigation';
import { siteSettings } from '@/settings/site-settings';
import { useTranslations } from 'next-intl';

export default function LanguageSwitcher() {
  const { site_header } = siteSettings;
  const t = useTranslations('common');
  const options = site_header.languageMenu;

  const router = useRouter();
  const pathname = usePathname();

  const [selectedItem, setSelectedItem] = useState(options[2]);

  useEffect(() => {
    const locale = pathname.split('/')[1];
    const currentSelectedItem = locale ? options.find((o) => o.value === locale) || options[2] : options[2];
    setSelectedItem(currentSelectedItem);
  }, [pathname, options]);

  function handleItemClick(values: any) {
    setSelectedItem(values);
    router.push(`/${values.value}${pathname.slice(3)}`);
  }

  return (
    <Listbox value={selectedItem} onChange={handleItemClick}>
      {({ open }) => (
        <div className="relative ltr:ml-2 rtl:mr-2 ltr:lg:ml-0 rtl:lg:mr-0 z-10 w-[140px] sm:w-[150px] lg:w-[130px] xl:w-[150px]">
          <ListboxButton className="border border-gray-300 text-heading text-[13px] xl:text-sm font-semibold relative w-full py-2 ltr:pl-3 rtl:pr-3 ltr:pr-7 rtl:pl-7 ltr:text-left rtl:text-right bg-white rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 cursor-pointer">
            <span className="flex truncate items-center">
              <span className="ltr:mr-1.5 rtl:ml-1.5">{selectedItem.icon}</span> {selectedItem.name}
            </span>
          </ListboxButton>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions
              static
              className="absolute w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none text-sm"
            >
              {options?.map((option) => (
                <ListboxOption
                  key={option.id}
                  className={({ active }) =>
                    `${
                      active ? 'text-amber-900 bg-gray-100' : 'text-gray-900'
                    } cursor-pointer select-none relative py-2 px-3`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <span className="flex items-center">
                      {option.icon}
                      <span
                        className={`${selected ? 'font-medium' : 'font-normal'} block truncate ltr:ml-1.5 rtl:mr-1.5`}
                      >
                        {option.name}
                      </span>
                    </span>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
