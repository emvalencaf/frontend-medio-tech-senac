export interface IHandleActionClass {
    handleActionCreate?: (data: AnnouncementFormData) => Promise<IAnnouncementEntity | null>;
    handleActionGetClassesByTeacher?: (authorId: number) => Promise<IClassEntity[] | null>;
    handleActionGetAllClasses?: () => Promise<IClassEntity[] | null>;
    handleActionGetAnnouncements?: (queryparams?: IGetAnnouncementsQueryParams) => Promise<IAnnouncementEntity[] | null>;
}