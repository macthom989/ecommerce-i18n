import Container from '@components/ui/container';
import { AiOutlineArrowUp } from 'react-icons/ai';
import cn from 'classnames';
import Link from '@components/ui/link';
import { siteSettings } from '@/settings/site-settings';
import { useTranslations } from 'next-intl';

interface CopyrightProps {
  payment?: {
    id: string | number;
    path?: string;
    name: string;
    image: string;
    width: number;
    height: number;
  }[];
  variant?: 'contemporary';
}
const year = new Date().getFullYear();
const Copyright: React.FC<CopyrightProps> = ({ payment, variant }) => {
  const t = useTranslations('footer');
  return (
    <div className="pt-5 pb-16 mb-2 border-t border-gray-300 sm:pb-20 md:pb-5 sm:mb-0">
      <Container
        className={cn('flex flex-col-reverse md:flex-row text-center md:justify-between', {
          'items-center': variant === 'contemporary',
        })}
      >
        <p
          className={cn('text-body text-xs lg:text-sm leading-6', {
            'p-0 m-0': variant === 'contemporary',
          })}
        >
          {t('text-copyright')} &copy; {year}&nbsp;
          <a
            className="font-semibold text-gray-700 transition-colors duration-200 ease-in-out hover:text-body"
            href={siteSettings.author.websiteUrl}
          >
            {siteSettings.author.name}
          </a>
          &nbsp; {t('text-all-rights-reserved')}
        </p>

        {payment && (
          <ul className="flex-wrap items-center justify-center hidden mx-auto mb-1 md:flex gap-x-4 xs:gap-x-5 lg:gap-x-7 md:mb-0 md:mx-0">
            {payment?.map((item) => (
              <li className="mb-2 transition md:mb-0 hover:opacity-80" key={`payment-list--key${item.id}`}>
                <a href={item.path ? item.path : '/#'} target="_blank">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={t(`${item.name}`)} height={item.height} width={item.width} />
                </a>
              </li>
            ))}
          </ul>
        )}

        {variant === 'contemporary' && (
          <p className="text-sm font-semibold leading-[19px] text-[#212121] cursor-pointer">
            <Link href="#siteHeader">Scroll to top</Link>

            <AiOutlineArrowUp className="inline ltr:ml-3 rtl:mr-3" />
          </p>
        )}
      </Container>
    </div>
  );
};

export default Copyright;
