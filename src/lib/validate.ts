import { z } from 'zod';
import { ValidationErrors, ValidationResult } from './types';

// Define our validation schemas using Zod
export const basicInfoSchema = z.object({
    webinarName: z.string().min(1, { message: 'Webinar name is required' }).trim(),
    description: z.string().min(1, { message: 'Description is required' }).trim(),
    date: z.date({ required_error: 'Date is required' }),
    time: z.string()
        .min(1, { message: 'Time is required' })
        .regex(/^(0?[1-9]|1[0-2]):[0-5][0-9]$/, {
            message: 'Time must be in format HH:MM (e.g., 10:30)'
        }),
    timeFormat: z.enum(['AM', 'PM'])
});

export const ctaSchema = z.object({
    ctaLabel: z.string().min(1, { message: 'CTA label is required' }).trim(),
    tags: z.array(z.string()).optional(),
    ctaType: z.string().min(1, { message: 'Please select a CTA type' }),
    aiAgent: z.string().optional()
});

export const additionalInfoSchema = z.object({
    lockChat: z.boolean().optional(),
    couponEnabled: z.boolean().optional(),
    couponCode: z.string().optional()
}).refine(
    (data) => {
        // If coupon is enabled, code is required
        return !data.couponEnabled || (data.couponEnabled && (data.couponCode ?? '').trim().length > 0);
    },
    {
        message: 'Coupon code is required when enabled',
        path: ['couponCode']
    }
);

export const qnaSchema = z.object({
    qnaTitle: z.string().optional(),
    qnaDescription: z.string().optional(),
    qnaLink: z.string().optional(),
    qnaImage: z.string().optional(),
});

// Define types from our schemas
export type BasicInfo = z.infer<typeof basicInfoSchema>;
export type CTAInfo = z.infer<typeof ctaSchema>;
export type AdditionalInfo = z.infer<typeof additionalInfoSchema>;
export type QNA=z.infer<typeof qnaSchema>;


// Helper function to convert Zod errors to your ValidationResult format
const formatZodError = (result: z.SafeParseReturnType<any, any>): ValidationResult => {
    if (result.success) {
        return { valid: true, errors: {} };
    }

    const errors: ValidationErrors = {};
    result.error.errors.forEach((err) => {
        const path = err.path.join('.');
        errors[path] = err.message;
    });

    return {
        valid: false,
        errors
    };
};

// Validation functions that use Zod but maintain your original API
export const validateBasicInfo = (data: Partial<BasicInfo>): ValidationResult => {
    return formatZodError(basicInfoSchema.safeParse(data));
};

export const validateCTA = (data: Partial<CTAInfo>): ValidationResult => {
    return formatZodError(ctaSchema.safeParse(data));
};

export const validateAdditionalInfo = (data: Partial<AdditionalInfo>): ValidationResult => {
    return formatZodError(additionalInfoSchema.safeParse(data));
};

export const validateQNA = (data: Partial<QNA>): ValidationResult => {
    return formatZodError(qnaSchema.safeParse(data));
};
