export interface streamObject {
    objectType: string;
    objectID: number;
    objectTitle: string;
    objectDescription: string | null;
    objectMeetAgenda: string | null;
    objectTaskType: string | null;
    objectTime: Date | null;
    objectMeetDuration: string | null;
    objectMeetOrganizer: number | null;
    objectStatus: string | null;
    created_at: Date;
}
