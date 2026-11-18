import {api} from "../../core/api";
import {Application, ApplicationResponse} from "./types";

export const fetchApplications = () => api.get<{data: ApplicationResponse }>('/applications/me').then((r) => r.data.data);
export const withdrawApplication = (id: string) => api.delete(`/applications/${id}/withdraw`).then((r) => r.data.data);
