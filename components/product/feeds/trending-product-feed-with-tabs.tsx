import SectionHeader from '@components/ui/section-header';
import ProductsBlock from '@blocks/products-block';
import { useProductsQuery } from '@services/product/get-all-products-2';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useTranslations } from 'next-intl';

const TrendingProductFeedWithTabs: React.FC<any> = () => {
  const t = useTranslations('common');

  const { data, isLoading, error } = useProductsQuery({
    limit: 10,
  });

  return (
    <div className="mb-12 md:mb-14 xl:mb-16">
      <SectionHeader
        sectionHeading="text-trending-products"
        className="pb-0.5 mb-1 sm:mb-1.5 md:mb-2 lg:mb-3 2xl:mb-4 3xl:mb-5"
      />

      <TabGroup as="div" className="">
        <TabList as="ul" className="tab-ul">
          <Tab
            as="li"
            className={({ selected }) =>
              selected ? 'tab-li-selected' : 'tab-li'
            }
          >
            <p className="">{t('tab-all-collection')}</p>
          </Tab>
          <Tab
            as="li"
            className={({ selected }) =>
              selected ? 'tab-li-selected' : 'tab-li'
            }
          >
            <p>{t('tab-flash-sale')}</p>
          </Tab>
          <Tab
            as="li"
            className={({ selected }) =>
              selected ? 'tab-li-selected' : 'tab-li'
            }
          >
            <p>{t('tab-best-sellers')}</p>
          </Tab>
          <Tab
            as="li"
            className={({ selected }) =>
              selected ? 'tab-li-selected' : 'tab-li'
            }
          >
            <p>{t('tab-featured')}</p>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ProductsBlock
              products={data?.slice(0, 10)}
              loading={isLoading}
              error={error?.message}
              uniqueKey="new-arrivals"
              variant="gridModern"
              imgWidth={344}
              imgHeight={344}
            />
          </TabPanel>
          <TabPanel>
            <ProductsBlock
              products={data?.slice(5, 15)}
              loading={isLoading}
              error={error?.message}
              uniqueKey="new-arrivals"
              variant="gridModern"
              imgWidth={344}
              imgHeight={344}
            />
          </TabPanel>
          <TabPanel>
            <ProductsBlock
              products={data?.slice(12, 22)}
              loading={isLoading}
              error={error?.message}
              uniqueKey="new-arrivals"
              variant="gridModern"
              imgWidth={344}
              imgHeight={344}
            />
          </TabPanel>
          <TabPanel>
            <ProductsBlock
              products={data?.slice(8, 18)}
              loading={isLoading}
              error={error?.message}
              uniqueKey="new-arrivals"
              variant="gridModern"
              imgWidth={344}
              imgHeight={344}
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default TrendingProductFeedWithTabs;
