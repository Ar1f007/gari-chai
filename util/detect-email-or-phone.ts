import {loginWithEmailSchema, loginWithPhoneSchema} from "@/schema/user";

export function detectEmailOrPhone(input: string): 'email' | 'phone' | null {

    const parsedEmail = loginWithEmailSchema.shape.email.safeParse(input);
    const parsedPhone = loginWithPhoneSchema.shape.phone.safeParse(input);

    if (parsedEmail.success) {
        return 'email';
    }

    if (parsedPhone.success) {
        return 'phone';
    }

    return null;
}