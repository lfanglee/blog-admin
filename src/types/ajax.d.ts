declare namespace Ajax {
    export interface AjaxResponse {
        code: number,
        message: string,
        data: any
    }
    export interface AxiosResponse {
        data: AjaxResponse
    }
}
