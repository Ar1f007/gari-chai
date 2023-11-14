'use client';

import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal';
import { proxy, useSnapshot } from 'valtio';
import Countdown from 'react-countdown';
import { verifyOTP } from '@/services/user/verifyOTP';
import { toast } from 'sonner';
import { GENERIC_ERROR_MSG } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';
import { userAPIResponseSchema } from '@/schema/user';
import { userActions } from '@/store';
import { auth } from '@/services/user/auth';

const otpStore = proxy({
  otpCode: '',
  loading: false,
  isResendBtnDisabled: true,
  errorMsg: '',
});

const TWO_MINUTES = 2 * 60;

type OTPFormProps = {
  phoneNumber: string;
};

const OTPForm = ({ phoneNumber }: OTPFormProps) => {
  const router = useRouter();

  const otpSnap = useSnapshot(otpStore);

  async function resendOTP() {
    try {
      otpStore.loading = true;
      const res = await auth.sendOTP({ phoneNumber });

      if (!res) {
        toast.error(GENERIC_ERROR_MSG);
        return;
      }

      if (res.status === 'success') {
        toast.success('OTP is sent! Please fill up the box.');
        return;
      }

      toast.error(res.message);
    } catch (error) {
      toast.error(GENERIC_ERROR_MSG);
    } finally {
      otpStore.loading = false;
    }
  }

  function resetOTPStore() {
    otpStore.errorMsg = '';
    otpStore.isResendBtnDisabled = true;
    otpStore.loading = false;
    otpStore.otpCode = '';
  }

  async function handleVerifyOTP() {
    try {
      if (!otpSnap.otpCode.trim().length) {
        otpStore.errorMsg = 'Please fill up the box';
        return;
      }

      otpStore.loading = true;

      const res = await verifyOTP({
        otp: +otpSnap.otpCode,
        phoneNumber,
      });

      if (!res) {
        toast.error(GENERIC_ERROR_MSG);
        return;
      }

      if (res.status !== 'success') {
        otpStore.errorMsg = res.message ?? GENERIC_ERROR_MSG;
        return;
      }

      const parsedData = userAPIResponseSchema.safeParse(res.data);

      if (parsedData.success) {
        userActions.setUser(parsedData.data);
      }

      toast.success('Account verification successful, Redirecting...');

      resetOTPStore();
      router.push(routes.home);
    } catch (error) {
      toast.error(GENERIC_ERROR_MSG);
    } finally {
      otpStore.loading = false;
    }
  }

  return (
    <Modal
      defaultOpen
      isDismissable={false}
      hideCloseButton
    >
      <ModalContent>
        <>
          <ModalHeader className='flex flex-col gap-1'>
            Enter the OTP (Expires in 10 mins)
          </ModalHeader>
          <ModalBody>
            {otpSnap.errorMsg && <p className='text-lg text-danger'>{otpSnap.errorMsg}</p>}
            <Input
              placeholder='Enter the otp number'
              value={otpSnap.otpCode}
              onChange={(e) => (otpStore.otpCode = e.target.value)}
              inputMode='numeric'
              autoComplete='off'
            />

            <p className='text-sm font-medium text-foreground'>
              Did not receive any code?
              <span
                className='ml-1 text-primary-500'
                onClick={resendOTP}
              >
                Click on resend button{' '}
                {otpSnap.isResendBtnDisabled && (
                  <Countdown
                    date={Date.now() + TWO_MINUTES * 1000}
                    renderer={({ minutes, seconds, completed }) => {
                      if (completed) {
                        otpStore.isResendBtnDisabled = false;
                        return null;
                      } else {
                        return (
                          <span>
                            in: {minutes.toString().padStart(2, '0')}:
                            {seconds.toString().padStart(2, '0')}
                          </span>
                        );
                      }
                    }}
                  />
                )}
              </span>
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              variant='faded'
              color='primary'
              isLoading={otpSnap.loading}
              onPress={handleVerifyOTP}
            >
              Verify
            </Button>
            <Button
              variant='faded'
              isDisabled={otpSnap.isResendBtnDisabled}
              isLoading={otpSnap.loading}
              onPress={resendOTP}
            >
              Resend
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};
export default OTPForm;
