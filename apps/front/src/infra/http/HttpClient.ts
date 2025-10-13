const API_URL = "http://localhost:3000/api";

export default interface HttpClient {
  get<TResponse>(url: string, config?: any): Promise<TResponse>;
  post<TBody, TResponse>(
    url: string,
    body: TBody,
    config?: any,
  ): Promise<TResponse>;
  put<TBody, TResponse>(
    url: string,
    body: TBody,
    config?: any,
  ): Promise<TResponse>;
  delete<TResponse>(url: string, config?: any): Promise<TResponse>;
}

export class FetchAdapter implements HttpClient {
  async get<TResponse>(url: string, config?: any): Promise<TResponse> {
    const res = await fetch(`${API_URL}${url}`, { ...config });
    if (!res.ok) throw new Error("Erro GET");
    return res.json();
  }

  async post<TBody, TResponse>(
    url: string,
    body: TBody,
    config?: any,
  ): Promise<TResponse> {
    const res = await fetch(`${API_URL}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      ...config,
    });
    if (!res.ok) throw new Error("Erro POST");
    return res.json();
  }

  async put<TBody, TResponse>(
    url: string,
    body: TBody,
    config?: any,
  ): Promise<TResponse> {
    const res = await fetch(`${API_URL}${url}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      ...config,
    });
    if (!res.ok) throw new Error("Erro PUT");
    return res.json();
  }

  async delete<TResponse>(url: string, config?: any): Promise<TResponse> {
    const res = await fetch(`${API_URL}${url}`, {
      method: "DELETE",
      ...config,
    });
    if (!res.ok) throw new Error("Erro DELETE");
    return res.json();
  }
}
