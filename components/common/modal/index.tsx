'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { IoClose } from 'react-icons/io5';
import { fadeInOut } from '@utils/motion/fade-in-out';
import { zoomOutIn } from '@utils/motion/zoom-out-in';
import { useUI } from '@contexts/managed-ui-provider';
import useOnClickOutside from '@utils/use-click-outside';
import { cn } from '@lib/utils';
import { Portal } from '@radix-ui/react-portal';

type ModalProps = {
  open?: boolean;
  onClose: () => void;
  rootClassName?: string;
  useBlurBackdrop?: boolean;
  containerClassName?: string;
  variant?: 'center' | 'bottom';
};

// variant based classes for modal root, container & close btn
const rootClasses = {
  center: 'p-4 md:p-5',
  bottom: 'p-5 pb-0',
};
const containerClasses = {
  center: 'h-auto max-h-full top-1/2 -translate-y-1/2 rounded-lg',
  bottom: 'h-full max-h-70vh bottom-0 ltr:rounded-tr-2xl rtl:rounded-tl-2xl ltr:rounded-tl-2xl rtl:rounded-tr-2xl',
};
const closeBtnClasses = {
  center: '-top-3 md:-top-4 ltr:-right-3 rtl:-left-3 ltr:md:-right-4 rtl:md:-left-4',
  bottom: 'top-1/4 ltr:left-1/2 rtl:right-1/2 transform -translate-y-1/2 -translate-x-1/2',
};

export default function Modal({
  children,
  open,
  onClose,
  rootClassName,
  useBlurBackdrop,
  containerClassName,
  variant = 'center',
}: React.PropsWithChildren<ModalProps>) {
  const { closeModal } = useUI();
  const modalRootRef = useRef<HTMLDivElement>(null);
  const modalInnerRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalInnerRef, () => closeModal());
  useEffect(() => {
    if (modalInnerRef.current) {
      if (open) {
        disableBodyScroll(modalInnerRef.current);
      } else {
        enableBodyScroll(modalInnerRef.current);
      }
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [open]);
  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={modalRootRef}
            key="modal"
            initial="from"
            animate="to"
            exit="from"
            variants={fadeInOut(0.25)}
            className={cn(
              'modal-root fixed bg-black/50 inset-0 z-50 cursor-pointer',
              useBlurBackdrop && 'backdrop-filter backdrop-blur-sm',
              rootClasses[variant],
              rootClassName,
            )}
          >
            <motion.div
              initial="from"
              animate="to"
              exit="from"
              variants={zoomOutIn()}
              className="relative w-full h-full mx-auto"
            >
              <div
                className={cn(
                  'w-full md:w-auto absolute left-1/2 transform -translate-x-1/2 shadow-xl',
                  containerClasses[variant],
                  containerClassName,
                )}
              >
                <button
                  onClick={onClose}
                  aria-label="Close panel"
                  className={cn(
                    'fixed z-10 inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-white shadow text-gray-600 transition duration-200 focus:outline-none focus:text-gray-800 focus:shadow-md hover:text-gray-800 hover:shadow-md',
                    closeBtnClasses[variant],
                  )}
                >
                  <IoClose className="text-xl" />
                </button>
                <div
                  ref={modalInnerRef}
                  className="h-full overflow-y-auto rounded-lg"
                  style={{ maxHeight: 'calc(100vh - 120px)' }}
                >
                  {children}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
