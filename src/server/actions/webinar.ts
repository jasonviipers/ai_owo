'use server'

import { WebinarFormState } from "@/store/use-webinar-store";
import { getCurrentUser } from "./user";
import { db } from "../db";
import { webinars } from "../db/schema";
import { validateBasicInfo, validateCTA, validateQNA, validateAdditionalInfo } from '@/lib/validate';
import { combineDateTime } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function createWebinar(data: WebinarFormState) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return { status: 401, msg: 'Unauthorized' };
        }

        // Using the same validation functions as the form
        const basicInfoData = {
            webinarName: data.basicInfo.webinarTitle,
            description: data.basicInfo.webinarDescription,
            date: data.basicInfo.webinarDate,
            time: data.basicInfo.webinarTime,
            timeFormat: data.basicInfo.webinarTimeFormat,
        };

        const ctaData = {
            ctaLabel: data.cta.ctaLabel,
            ctaType: data.cta.ctaType,
            aiAgent: data.cta.aiAgent,
            tags: data.cta.tags,
        };

        // Validate all sections
        const basicInfoValidation = validateBasicInfo(basicInfoData);
        const ctaValidation = validateCTA(ctaData);
        const qnaValidation = validateQNA(data.qna);
        const additionalInfoValidation = validateAdditionalInfo(data.additionalInfo);

        // Collect all validation errors
        const validationErrors = {
            ...(!basicInfoValidation.valid ? { basicInfo: basicInfoValidation.errors } : {}),
            ...(!ctaValidation.valid ? { cta: ctaValidation.errors } : {}),
            ...(!qnaValidation.valid ? { qna: qnaValidation.errors } : {}),
            ...(!additionalInfoValidation.valid ? { additionalInfo: additionalInfoValidation.errors } : {})
        };

        // Return all validation errors at once if any section is invalid
        if (!basicInfoValidation.valid || !ctaValidation.valid ||
            !qnaValidation.valid || !additionalInfoValidation.valid) {
            return {
                status: 400,
                msg: 'Validation failed',
                errors: validationErrors
            };
        }

        // Additional validation for date/time being in the future
        const startTime = combineDateTime(
            data.basicInfo.webinarDate!,
            data.basicInfo.webinarTime!,
            data.basicInfo.webinarTimeFormat || 'AM'
        );

        const now = new Date();
        if (startTime < now) {
            return {
                status: 400,
                msg: 'Webinar date and time cannot be in the past',
                errors: { basicInfo: { dateTime: 'Must be a future date and time' } }
            };
        }

        // Calculate duration in minutes
        let durationInMinutes = parseInt(data.basicInfo.webinarDuration || '0', 10);
        if (data.basicInfo.webinarDurationFormat === 'hours') {
            durationInMinutes *= 60;
        }

        // Calculate end time based on duration
        const endTime = new Date(startTime);
        endTime.setMinutes(endTime.getMinutes() + durationInMinutes);

        // Prepare webinar data
        const webinarData = {
            title: data.basicInfo.webinarTitle!,
            description: data.basicInfo.webinarDescription || '',
            startTime,
            endTime,
            duration: durationInMinutes,
            webinarStatus: 'SCHEDULED' as const,
            presenterId: user.id, // Assuming user.id is a UUID
            tags: data.cta.tags || [],
            ctaLabel: data.cta.ctaLabel || '',
            ctaType: data.cta.ctaType!,
            ctaUrl: data.basicInfo.webinarLink || '',
            couponCode: data.additionalInfo.couponCode || '',
            couponEnabled: data.additionalInfo.couponEnabled || false,
            couponExpiry: null,
            lockChat: data.additionalInfo.lockChat || false,
            aiAgentId: data.cta.aiAgent || null,
            priceId: data.cta.priceId || null,
            thumbnail: data.basicInfo.webinarImage || '',
            userId: user.id,
        };

        // Insert webinar into database
        const [newWebinar] = await db.insert(webinars).values(webinarData).returning();
        revalidatePath('/')
        return {
            status: 201,
            msg: 'Webinar created successfully',
            webinarId: newWebinar.id,
            webinarLink: `/webinar/${newWebinar.id}`
        };
    } catch (error) {
        console.error('Failed to create webinar:', error);
        return {
            status: 500,
            msg: 'An error occurred while creating the webinar'
        };
    }
}
