declare namespace Ajax {
    export interface AjaxResponse<T = any> {
        code: number,
        message: string,
        data: T
    }
    export interface AxiosResponse {
        data: AjaxResponse
    }
}
