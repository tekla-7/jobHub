import axios from "axios";

export default function getErrorMessage(err:unknown):string{
    if(axios.isAxiosError(err))return err.response?.data?.error??'Something went wrong.Please try again later. ';
    return 'Something went wrong.Please try again later. ';
}