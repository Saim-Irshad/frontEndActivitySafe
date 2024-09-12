import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";

interface ModalProps {
  isOpen?: any;
  modalContent?: any;
  onSubmit?: any;
  noButtons?: boolean;
  closeModal?: any;
  title?: string;
  onClose?: any;
}

const Modal = ({
  isOpen,
  noButtons,
  modalContent,
  onSubmit,
  closeModal,
  title,
  onClose,
}: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e: any) => e.stopPropagation()}
            className="bg-gradient-to-br from-tertiaryGreen to-tertiaryOrange text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <h1 className="text-2xl font-semibold text-safepayGray text-center mb-4">
                {title}
              </h1>
              {modalContent}
              {!noButtons && (
                <div className="flex gap-2 mt-6">
                  <button
                    onClick={onClose}
                    className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      onSubmit && onSubmit();
                      onClose();
                    }}
                    className="bg-safepayBlue hover:opacity-90 transition-opacity text-white font-semibold w-full py-2 rounded"
                  >
                    Confirm
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
