export interface Vote {
    name: string;
    ic: number;
    email: string;
    phone: string;
    gender: number;
    state: number;
    municipality: number;
    parish: number;
}

export interface ApiUrl {
  api_url: string | undefined;
}

export interface State {
  id: number;
  state: string;
}
export interface Municipality {
  id: number;
  state_id: number;
  municipality: string;
}
export interface Parish {
  id: number;
  municipality_id: number;
  parish: string;
}