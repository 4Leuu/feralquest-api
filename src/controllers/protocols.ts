export interface HttpResponse<T> {
    statusCode: number,
    body: T | string
}

export interface HttpRequest<B, H , P> {
    headers?: P,
    params?: H,
    body?: B,
}
