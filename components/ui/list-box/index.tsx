'use client';

import { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { HiOutlineSelector, HiCheck } from 'react-icons/hi';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

type Option = {
  name: string;
  value: string;
};

export default function ListBox({ options }: { options: Option[] }) {
  const t = useTranslations('common');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const sortBy = searchParams.get('sort_by');
  const currentSelectedItem = options.find((o) => o.value === sortBy) || options[0];

  const [selectedItem, setSelectedItem] = useState<Option>(currentSelectedItem);

  useEffect(() => {
    setSelectedItem(currentSelectedItem);
  }, []);

  function handleItemClick(values: Option) {
    setSelectedItem(values);

    const params = new URLSearchParams(searchParams);
    if (values.value !== options[0].value) {
      params.set('sort_by', values.value);
    } else {
      params.delete('sort_by');
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <Listbox value={selectedItem} onChange={handleItemClick}>
      {({ open }) => (
        <div className="relative ltr:ml-2 rtl:mr-2 ltr:lg:ml-0 rtl:lg:mr-0 z-10 min-w-[180px]">
          <Listbox.Button className="border border-gray-300 text-heading text-[13px] md:text-sm font-semibold relative w-full py-2 ltr:pl-3 rtl:pr-3 ltr:pr-10 rtl:pl-10 ltr:text-left rtl:text-right bg-white rounded-lg shadow-md focus:outline-none cursor-pointer">
            <span className="block truncate">{t(selectedItem.name)}</span>
            <span className="absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center ltr:pr-2 rtl:pl-2 pointer-events-none">
              <HiOutlineSelector className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none text-sm">
              {options.map((option, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `${active ? 'text-amber-900 bg-gray-100' : 'text-gray-900'}
                    cursor-default select-none relative py-2 ltr:pl-10 rtl:pr-10 ltr:pr-4 rtl:pl-4`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                        {t(option.name)}
                      </span>
                      {selected && (
                        <span className="check-icon absolute inset-y-0 ltr:left-0 rtl:right-0 flex items-center ltr:pl-3 rtl:pr-3">
                          <HiCheck className="w-5 h-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
