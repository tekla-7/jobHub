import {api} from "../../../core/api";
import {Category, State} from "../landing.types";
import {Job} from "../../../shared/types/job.type";
import {Company} from "../../../shared/types/company.type";

export const stats = async () => {
    const {data} = await api.get<{data: State[] }>(
        'stats',
    )
    return data.data
}
export const jobs = async () => {
    const {data} = await api.get<{ data: {items: Job[] } }>(
        'jobs?status=active&pageSize=6&sort=createdAt&order=desc',
    )
    return data.data.items
}
export const companies = async () => {
    const {data} = await api.get<{data:{items: Company[] }  }>(
        'companies?pageSize=6&sort=createdAt&order=desc',
    )
    return data.data.items
}
export const categories=async () => {
    const {data} = await api.get<{ data:Category[] }>(
        'jobs/categories',
    )
    return data.data
}