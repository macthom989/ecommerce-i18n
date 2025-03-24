import { useForm } from 'react-hook-form';
import TextArea from '@components/ui/text-area';
import { useTranslations } from 'next-intl';
import Button from '../button';
import Input from '../input';

interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>();

  function onSubmit(values: ContactFormValues) {
    console.error(values, 'contact');
  }

  const t = useTranslations();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto flex flex-col justify-center " noValidate>
      <div className="flex flex-col space-y-5">
        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0">
          <Input
            labelKey="forms.label-name-required"
            placeholder="forms.placeholder-name"
            {...register('name', { required: 'forms.name-required' })}
            className="w-full md:w-1/2 "
            errorKey={errors.name?.message}
            variant="solid"
          />
          <Input
            labelKey="forms.label-email-required"
            type="email"
            placeholder="forms.placeholder-email"
            {...register('email', {
              required: 'forms.email-required',
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'forms.email-error',
              },
            })}
            className="w-full md:w-1/2 ltr:md:ml-2.5 rtl:md:mr-2.5 ltr:lg:ml-5 rtl:lg:mr-5 mt-2 md:mt-0"
            errorKey={errors.email?.message}
            variant="solid"
          />
        </div>
        <Input
          labelKey="forms.label-subject"
          {...register('subject', { required: 'forms.name-subject' })}
          className="relative"
          placeholder="forms.placeholder-subject"
          errorKey={errors.subject?.message}
          variant="solid"
        />
        <TextArea
          labelKey="forms.label-message"
          {...register('message')}
          className="relative mb-4"
          placeholder="forms.placeholder-message"
        />
        <div className="relative">
          <Button type="submit" className="h-12 lg:h-14 mt-1 text-sm lg:text-base w-full sm:w-auto">
            {t('common.button-send-message')}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
