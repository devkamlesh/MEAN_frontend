const apiBaseUrl = "http://localhost:3000/api/";

export class APIEndPoints {
    static readonly API_BASE_URL = apiBaseUrl;
    static readonly USER = apiBaseUrl + 'user'
    static readonly UPLOAD_IMAGE = apiBaseUrl + 'upload_image';
    static readonly DELTE_OLD_IMAGE = apiBaseUrl + 'delete_old_image';
    static readonly UPDATE_USER = apiBaseUrl + 'update_user';
    static readonly DELETE_USER = apiBaseUrl + 'delete_user';
}