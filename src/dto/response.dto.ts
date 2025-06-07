export interface ResponseDto {
    Status: string;
    Message: string;
    HttpCode: number;
    Data?: any;
    Trace?: string[];
}