export interface HttpResponse<T> {
  statusCode: number;
  body: T | string;
}

export interface HttpRequest<B, H, P> {
  headers?: H;
  params?: P;
  body?: B;
}
