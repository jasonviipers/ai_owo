'use client'
import { ValidationErrors, ValidationState } from '@/lib/types';
import { validateAdditionalInfo, validateBasicInfo, validateCTA, validateQNA } from '@/lib/validate';
import { create } from 'zustand'

export type WebinarFormState = {
    basicInfo: {
        webinarTitle?: string;
        webinarDescription?: string;
        webinarDate?: Date;
        webinarTime?: string;
        webinarTimeFormat?: 'AM' | 'PM';
        webinarTimezone?: string;
        webinarDuration?: string;
        webinarDurationFormat?: 'hours' | 'minutes';
        webinarType?: 'scheduled' | 'live';
        webinarLink?: string;
        webinarImage?: string;
    };
    cta: { //  call to action 
        ctaLabel?: string;
        ctaDescription?: string;
        ctaType?: 'BUY_NOW' | 'BOOK_A_CALL';
        priceId?: string;
        aiAgent?: string;
        tags?: string[];
    };
    qna: { //  questions and answers
        qnaTitle?: string;
        qnaDescription?: string;
        qnaLink?: string;
        qnaImage?: string;
    };
    additionalInfo: {
        lockChat?: boolean;
        couponCode?: string;
        couponEnabled?: boolean;
    };
}

interface WebinarStore {
    isModalOpen: boolean;
    isComplete: boolean;
    isSubmitting: boolean;
    formState: WebinarFormState
    validation: ValidationState

    setIsModalOpen: (isModalOpen: boolean) => void;
    setIsComplete: (isComplete: boolean) => void;
    setIsSubmitting: (isSubmitting: boolean) => void;

    updateBasicInfoField: <k extends keyof WebinarFormState['basicInfo']>(field: k,
        value: WebinarFormState['basicInfo'][k]
    ) => void;
    updateCTAField: <k extends keyof WebinarFormState['cta']>(field: k,
        value: WebinarFormState['cta'][k]
    ) => void;
    updateQNAField: <k extends keyof WebinarFormState['qna']>(field: k,
        value: WebinarFormState['qna'][k]
    ) => void;
    updateAdditionalInfoField: <k extends keyof WebinarFormState['additionalInfo']>(field: k,
        value: WebinarFormState['additionalInfo'][k]
    ) => void;
    validateStep: (stepId: keyof WebinarFormState) => boolean;
    getStepValidationErrors: (StepId: keyof WebinarFormState) => ValidationErrors;
    resetForm: () => void;
}

const initialValidationState: ValidationState = {
    basicInfo: { valid: true, errors: {} },
    cta: { valid: true, errors: {} },
    qna: { valid: true, errors: {} },
    additionalInfo: { valid: true, errors: {} }
}

const initialFormState: WebinarFormState = {
    basicInfo: {
        webinarTitle: '',
        webinarDescription: '',
        webinarDate: new Date(),
        webinarTime: '',
        webinarTimeFormat: 'AM',
        webinarTimezone: '',
        webinarDuration: '',
        webinarDurationFormat: 'hours',
        webinarType: 'scheduled',
    },
    cta: {
        ctaLabel: '',
        ctaDescription: '',
        ctaType: 'BOOK_A_CALL',
        priceId: '',
        aiAgent: '',
        tags: [],
    },
    qna: {
        qnaTitle: '',
        qnaDescription: '',
        qnaLink: '',
        qnaImage: '',
    },
    additionalInfo: {
        lockChat: false,
        couponCode: '',
        couponEnabled: false,
    }
};

export const useWebinarStore = create<WebinarStore>((set, get) => ({
    isModalOpen: false,
    isComplete: false,
    isSubmitting: false,
    formState: initialFormState,
    validation: initialValidationState,

    setIsModalOpen: (isModalOpen: boolean) => set({ isModalOpen }),
    setIsComplete: (isComplete: boolean) => set({ isComplete }),
    setIsSubmitting: (isSubmitting: boolean) => set({ isSubmitting }),

    updateBasicInfoField: <K extends keyof WebinarFormState['basicInfo']>(
        field: K,
        value: WebinarFormState['basicInfo'][K]
    ) => set((state) => {
        const newBasicInfo = { ...state.formState.basicInfo, [field]: value };
        // Map field names for validation
        const validationData = {
            webinarName: newBasicInfo.webinarTitle,
            description: newBasicInfo.webinarDescription,
            date: newBasicInfo.webinarDate,
            time: newBasicInfo.webinarTime,
            timeFormat: newBasicInfo.webinarTimeFormat,
        };

        const validationResult = validateBasicInfo(validationData);

        return {
            formState: { ...state.formState, basicInfo: newBasicInfo },
            validation: { ...state.validation, basicInfo: validationResult }
        };
    }),

    updateCTAField: <K extends keyof WebinarFormState['cta']>(
        field: K,
        value: WebinarFormState['cta'][K]
    ) => set((state) => {
        const newCTA = { ...state.formState.cta, [field]: value };
        // Map field names for validation
        const validationData = {
            ctaLabel: newCTA.ctaLabel,
            ctaType: newCTA.ctaType,
            aiAgent: newCTA.aiAgent,
            tags: newCTA.tags,
        };

        const validationResult = validateCTA(validationData);

        return {
            formState: { ...state.formState, cta: newCTA },
            validation: { ...state.validation, cta: validationResult }
        };
    }),

    updateQNAField: <K extends keyof WebinarFormState['qna']>(
        field: K,
        value: WebinarFormState['qna'][K]
    ) => set((state) => {
        const newQNA = { ...state.formState.qna, [field]: value };
        const validationResult = validateQNA(newQNA);

        return {
            formState: { ...state.formState, qna: newQNA },
            validation: { ...state.validation, qna: validationResult }
        };
    }),

    updateAdditionalInfoField: <K extends keyof WebinarFormState['additionalInfo']>(
        field: K,
        value: WebinarFormState['additionalInfo'][K]
    ) => set((state) => {
        const newAdditionalInfo = { ...state.formState.additionalInfo, [field]: value };
        const validationResult = validateAdditionalInfo(newAdditionalInfo);

        return {
            formState: { ...state.formState, additionalInfo: newAdditionalInfo },
            validation: { ...state.validation, additionalInfo: validationResult }
        };
    }),

    validateStep: (stepId: keyof WebinarFormState) => {
        const { formState, validation } = get();

        switch (stepId) {
            case 'basicInfo':
                // Map field names for validation
                const basicInfoData = {
                    webinarName: formState.basicInfo.webinarTitle,
                    description: formState.basicInfo.webinarDescription,
                    date: formState.basicInfo.webinarDate,
                    time: formState.basicInfo.webinarTime,
                    timeFormat: formState.basicInfo.webinarTimeFormat,
                };
                const basicInfoResult = validateBasicInfo(basicInfoData);
                set((state) => ({
                    validation: { ...state.validation, basicInfo: basicInfoResult }
                }));
                return basicInfoResult.valid;

            case 'cta':
                // Map field names for validation
                const ctaData = {
                    ctaLabel: formState.cta.ctaLabel,
                    ctaType: formState.cta.ctaType,
                    aiAgent: formState.cta.aiAgent,
                    tags: formState.cta.tags,
                };
                const ctaResult = validateCTA(ctaData);
                set((state) => ({
                    validation: { ...state.validation, cta: ctaResult }
                }));
                return ctaResult.valid;

            case 'qna':
                const qnaResult = validateQNA(formState.qna);
                set((state) => ({
                    validation: { ...state.validation, qna: qnaResult }
                }));
                return qnaResult.valid;

            case 'additionalInfo':
                const additionalInfoResult = validateAdditionalInfo(formState.additionalInfo);
                set((state) => ({
                    validation: { ...state.validation, additionalInfo: additionalInfoResult }
                }));
                return additionalInfoResult.valid;

            default:
                return true;
        }
    },

    getStepValidationErrors: (stepId: keyof WebinarFormState) => {
        return get().validation[stepId].errors;
    },

    resetForm: () => set({
        formState: initialFormState,
        validation: initialValidationState,
        isComplete: false,
        isSubmitting: false
    }),
}));