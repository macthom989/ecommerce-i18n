import { use } from 'react';
import PageHeader from '@components/common/page-header';
import Container from '@components/ui/container';
import Subscription from '@components/ui/subscription';
import OrderInformation from '@components/order/order-information';
import OrderDetails from '@components/order/order-details';

export default function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const orderId = use(params)?.id;
  return (
    <>
      <PageHeader pageHeader="text-page-order" />
      <Container>
        {orderId && (
          <div className="py-6">
            <OrderInformation orderId={orderId} />
            <OrderDetails orderId={orderId} />
          </div>
        )}
        <Subscription />
      </Container>
    </>
  );
}
