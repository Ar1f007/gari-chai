import React from 'react';
import {RHFInput} from "@/components/form/RHFInput";
import {Button} from "@nextui-org/button";
import {FormProvider, useForm} from "react-hook-form";
import {
    ResetPasswordPayload,
    resetPasswordSchema
} from "@/schema/user";
import {zodResolver} from "@hookform/resolvers/zod";
import {Modal, ModalBody, ModalContent, ModalHeader} from "@nextui-org/modal";
import {auth} from "@/services/user";
import {toast} from "sonner";
import {GENERIC_ERROR_MSG} from "@/lib/constants";
import {useRouter} from "next/navigation";
import {routes} from "@/config/routes";

type ResetPasswordFormProps = {
    onSuccess: () => void;
};
const ResetPasswordForm = ({onSuccess}: ResetPasswordFormProps) => {

    const form = useForm<ResetPasswordPayload>({
        criteriaMode: 'all',
        mode: 'onTouched',
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            code: '',
            password: '',
        }
    });

    const router = useRouter();
    async function onSubmit(data: ResetPasswordPayload) {
        try {
            const res = await auth.resetPassword(data);

            if (res.status === 'success') {
                onSuccess();
                toast.success('Password reset successfully');
                router.push(routes.login);
                return;
            }

            toast.error(res.message || GENERIC_ERROR_MSG);

        } catch (e) {
            toast.error(GENERIC_ERROR_MSG);
        }
    }

    return (
        <Modal isOpen hideCloseButton>
            <ModalContent>
                <ModalHeader>Reset Password</ModalHeader>
                <ModalBody>
                    <FormProvider {...form}>
                        <form
                            className='flex flex-col gap-4 pb-3'
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <RHFInput
                                label='Code'
                                name='code'
                                autoComplete='off'
                                isRequired
                                description={(
                                    <span className="text-default-500">Enter the code you received</span>
                                )}
                            />

                            <RHFInput
                                label='New Password'
                                name='password'
                                autoComplete='off'
                                isRequired
                                type="password"
                                description={(
                                    <span className="text-default-500">
                                        Enter the your new password
                                    </span>
                                )}
                            />

                            <Button
                                variant='faded'
                                fullWidth
                                className='py-6 text-large font-semibold'
                                color='primary'
                                type='submit'
                                isLoading={form.formState.isSubmitting}
                            >
                                Reset Password
                            </Button>

                        </form>
                    </FormProvider>
                </ModalBody>
            </ModalContent>
        </Modal>

    );
};

export default ResetPasswordForm;