import { use } from 'react';
import Container from '@components/ui/container';

export default function Post({ params }: { params: Promise<{ slug: string }> }) {
  const slug = use(params).slug;
  return (
    <Container>
      <div>{slug}</div>
    </Container>
  );
}
