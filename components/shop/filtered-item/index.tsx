'use client';

import { IoClose } from 'react-icons/io5';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import isEmpty from 'lodash/isEmpty';

interface Props {
  itemKey: string;
  itemValue: string;
}

export const FilteredItem = ({ itemKey, itemValue }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function handleClose() {
    const params = new URLSearchParams(searchParams.toString());

    const currentItem =
      params
        .get(itemKey)
        ?.split(',')
        .filter((i) => i !== itemValue) || [];

    if (currentItem.length) {
      params.set(itemKey, currentItem.join(','));
    } else {
      params.delete(itemKey);
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div
      className="group flex flex-shrink-0 m-1.5 items-center border border-gray-300 bg-borderBottom rounded-lg text-xs px-3.5 py-2.5 capitalize text-heading cursor-pointer transition duration-200 ease-in-out hover:border-heading"
      onClick={handleClose}
    >
      {itemValue}
      <IoClose className="text-sm text-body ml-2 flex-shrink-0 -mr-0.5 mt-0.5 transition duration-200 ease-in-out group-hover:text-heading" />
    </div>
  );
};
