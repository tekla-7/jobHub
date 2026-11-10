import { useQuery } from "@tanstack/react-query";
import { getMe } from "../auth.api";
import {getAuthToken} from "../../../shared/utils/auth";

export const useMe = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: getMe,
        enabled: !!getAuthToken(),
        retry: false,
    });
};