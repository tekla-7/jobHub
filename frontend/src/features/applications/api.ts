import {api} from "../../core/api";
import {Application} from "./types";

export const fetchApplications = () => api.get<Application[]>('/me/applications').then((r) => r.data);
export const withdrawApplication = (id: string) => api.delete(`/me/applications/${id}`).then((r) => r.data);
