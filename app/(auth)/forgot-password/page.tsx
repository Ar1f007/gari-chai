"use client";

import React from 'react';
import {FormProvider, useForm} from "react-hook-form";
import {ResetPasswordRequestPayload, resetPasswordRequestSchema} from "@/schema/user";
import {zodResolver} from "@hookform/resolvers/zod";
import {RHFInput} from "@/components/form/RHFInput";
import {Button} from "@nextui-org/button";
import {detectEmailOrPhone} from "@/util/detect-email-or-phone";
import {toast} from "sonner";
import {auth} from "@/services/user";
import {GENERIC_ERROR_MSG} from "@/lib/constants";
import {TApiData, TApiError} from "@/types";
import {mapValidationErrors} from "@/util/mapValidationError";
import Link from "next/link";
import {routes} from "@/config/routes";
import ResetPasswordForm from "@/modules/user/reset-password-form";

const ForgotPasswordFormPage = () => {
    const form = useForm<ResetPasswordRequestPayload>({
        criteriaMode: 'all',
        mode: 'onTouched',
        resolver: zodResolver(resetPasswordRequestSchema),
        defaultValues: {
            requestedFrom: '',
            sendCodeTo: '',
        }
    });

    const [showResetPasswordForm, setShowResetPasswordForm] = React.useState(false);
    async function handleLoginResponse(res: TApiError | TApiData<any>) {
        if (res.status === 'success') {
            toast.success('Check your email or phone for the reset code.');
            setShowResetPasswordForm(true);
            return;
        }

        if (res.status === 'validationError') {
            mapValidationErrors(res.errors, form);
            return;
        }

        // status is either error or fail, so display the message
        toast.error(res.message || GENERIC_ERROR_MSG);
        return;
    }

    function closeResetPasswordForm() {
        setShowResetPasswordForm(false);
    }
    async function onSubmit(data: ResetPasswordRequestPayload) {
        try {
            const type = detectEmailOrPhone(data.requestedFrom);

            if (!type) {
                form.setError('requestedFrom', {message: 'Invalid email or phone number'});
                return;
            }

            const payload = {
                type,
                ...data,
            }

            const res = await auth.resetPasswordCode(payload);

            handleLoginResponse(res);

        } catch (e) {
            toast.error(e instanceof Error ? e.message : GENERIC_ERROR_MSG);
        }

    }

    return (
        <div className='space-y-5'>
            <FormProvider {...form}>
                <h1 className='text-xl font-semibold text-center'>Forgot Password</h1>
                <form
                    className='mt-4 flex flex-col gap-4'
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <RHFInput
                        label='Email or Phone Number'
                        name='requestedFrom'
                        autoComplete='off'
                        isRequired
                        description={
                            <span className="text-default-500">
                                * Enter the email or phone number you used to log in
                            </span>
                        }
                    />

                    <RHFInput
                        label='Email'
                        name='sendCodeTo'
                        autoComplete='off'
                        isRequired
                        type="email"
                        description={
                            <span className="text-default-500">
                                * Enter the email where you want to receive the reset code
                            </span>
                        }
                    />

                    <Button
                        variant='faded'
                        fullWidth
                        className='py-6 text-large font-semibold'
                        color='primary'
                        type='submit'
                        isLoading={form.formState.isSubmitting}
                    >
                        Send Reset Code
                    </Button>

                    <div className="flex justify-between text-sm text-primary underline">
                        <Link href={routes.register}>
                            Go to Register
                        </Link>
                        <Link href={routes.login}>
                            Go to Login
                        </Link>
                    </div>
                </form>
            </FormProvider>
            {
                showResetPasswordForm && <ResetPasswordForm onSuccess={closeResetPasswordForm}/>
            }
        </div>
    );
};

export default ForgotPasswordFormPage;