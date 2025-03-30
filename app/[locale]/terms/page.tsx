'use client';

import { useTranslations } from 'next-intl';
import PageHeader from '@components/common/page-header';
import Container from '@components/ui/container';
import { Element, Link } from 'react-scroll';

const termsAndServices = [
  {
    id: '1',
    title: 'terms-one-title',
    description: 'terms-one-content',
  },
  {
    id: '2',
    title: 'terms-two-title',
    description: 'terms-two-content',
  },
  {
    id: '3',
    title: 'terms-three-title',
    description: 'terms-three-content',
  },
  {
    id: '4',
    title: 'terms-four-title',
    description: 'terms-four-content',
  },
  {
    id: '5',
    title: 'terms-five-title',
    description: 'terms-five-content',
  },
  {
    id: '6',
    title: 'terms-six-title',
    description: 'terms-six-content',
  },
];

function makeTitleToDOMId(title: string) {
  return title.toLowerCase().split(' ').join('_');
}

export default function TermsPage() {
  const t = useTranslations('terms');
  return (
    <>
      <PageHeader pageHeader="text-page-terms-of-service" />
      <div className="mt-12 lg:mt-14 xl:mt-16 lg:py-1 xl:py-0 border-b border-gray-300 px-4 md:px-10 lg:px-7 xl:px-16 2xl:px-24 3xl:px-32 pb-9 md:pb-14 lg:pb-16 2xl:pb-20 3xl:pb-24">
        <Container>
          <div className="flex flex-col md:flex-row">
            <nav className="md:w-72 xl:w-3/12 mb-8 md:mb-0">
              <ol className="sticky md:top-16 lg:top-28 z-10">
                {termsAndServices?.map((item, index) => (
                  <li key={item.id}>
                    <Link
                      spy={true}
                      offset={-120}
                      smooth={true}
                      duration={500}
                      to={makeTitleToDOMId(item.title)}
                      activeClass="text-heading font-semibold"
                      className="block cursor-pointer py-3 lg:py-3.5 text-sm lg:text-base  text-gray-700 uppercase"
                    >
                      {(index <= 9 ? '0' : '') + index + ' ' + t(`${item.title}`)}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="md:w-9/12 ltr:md:pl-8 rtl:md:pr-8 ">
              {termsAndServices?.map((item) => (
                <Element name={item.title} key={item.title} id={makeTitleToDOMId(item.title)} className="mb-10">
                  <h2 className="text-lg md:text-xl lg:text-2xl text-heading font-bold mb-4">{t(`${item.title}`)}</h2>
                  <div
                    className="text-heading text-sm leading-7 lg:text-base lg:leading-loose"
                    dangerouslySetInnerHTML={{
                      __html: t(`${item.description}`),
                    }}
                  />
                </Element>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
