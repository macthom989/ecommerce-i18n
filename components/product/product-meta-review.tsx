import { useState } from 'react';
import ReviewForm from '@components/common/form/review-form';
import { Collapse } from '../ui/accordion';

interface Props {
  data: any;
}

const ProductMetaReview: React.FC<Props> = ({ data }) => {
  const [expanded, setExpanded] = useState<number>(0);
  return (
    <>
      {data.map((item: any, index: any) => (
        <Collapse
          i={index}
          key={item.title}
          title={item.title}
          translatorNS="review"
          content={
            data.length === item.id ? (
              <>
                {item.content} <ReviewForm />
              </>
            ) : (
              item.content
            )
          }
          expanded={expanded}
          setExpanded={setExpanded}
          variant="transparent"
        />
      ))}
    </>
  );
};

export default ProductMetaReview;
