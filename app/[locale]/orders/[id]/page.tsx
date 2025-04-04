import { use } from 'react';
import PageHeader from '@components/common/page-header';
import Container from '@components/ui/container';
import Subscription from '@components/ui/subscription';
import OrderInformation from '@components/order/order-information';

export default function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const orderId = use(params)?.id;
  return (
    <>
      <PageHeader pageHeader="text-page-order" />
      <Container>
        <OrderInformation orderId={orderId} />
        <Subscription />
      </Container>
    </>
  );
}
