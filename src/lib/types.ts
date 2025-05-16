import { Attendees, User, Webinars } from "@/server/db/schema";

export type ValidationErrors = Record<string, string>;
export type ValidationState = {
    basicInfo: {
        valid: boolean;
        errors: ValidationErrors;
    };
    cta: {
        valid: boolean;
        errors: ValidationErrors;
    };
    qna: {
        valid: boolean;
        errors: ValidationErrors;
    };
    additionalInfo: {
        valid: boolean;
        errors: ValidationErrors;
    };
};

export type ValidationResult = {
    valid: boolean
    errors: ValidationErrors
}


export type AttendanceData = {
    count: number
    users: Attendees[]
}

export type WebinarWithPresenter = Webinars & {
    presenter: User
}

export type StreamCallRecording = {
    filename: string
    url: string
    start_time: Date
    end_time: Date
    session_id: string
}