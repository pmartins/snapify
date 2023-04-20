import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
const Recorder = dynamic(() => import("~/components/Recorder"), { ssr: false });
import dynamic from "next/dynamic";

export default function VideoRecordModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [step, setStep] = useState<"pre" | "in" | "post">("pre");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleClose = () => {
    if (step === "pre") closeModal();
  };

  return (
    <>
      <span
        onClick={openModal}
        className="cursor-pointer rounded border border-[#0000001a] px-2 py-2 text-sm text-[#292d34] hover:bg-[#fafbfc]"
      >
        New video
      </span>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-fit transform rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Recorder
                    closeModal={closeModal}
                    step={step}
                    setStep={setStep}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
