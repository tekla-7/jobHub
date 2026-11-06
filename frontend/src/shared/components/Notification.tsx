import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import clsx from "clsx";
import {RootState} from "../../core/store.config";
import {uiAction as notificationAction} from "../../store/ui-slice";
import {X} from "lucide-react";

export default function Notification() {
    const notification = useSelector((state: RootState) => state.ui.notification);
    const dispatch = useDispatch();
    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(notificationAction.clearNotification())
        }, 4000)
        return () => {
            clearTimeout(timeout)
        }
    }, [dispatch]);
    const close = () => {
        dispatch(notificationAction.clearNotification())
    }
    return <div className={clsx('fixed w-max max-w-xl  top-4 z-40 right-4 py-3  px-3.5 rounded-lg border opacity-90',
        notification?.status === 'error' && 'bg-red-300 border-red-700 ',
        notification?.status === 'success' && 'bg-green-300 border-green-700 ',
        notification?.status === 'warning' && 'bg-yellow-200 border-yellow-600 ',
        notification?.status === 'info' && 'bg-gray-200 border-gray-700 ',
    )}>
        <div className='pb-2 relative'>
            <h1 className={clsx('text-sm font-semibold pr-4',
                notification?.status === 'error' && 'text-red-800',
                notification?.status === 'success' && 'text-green-800',
                notification?.status === 'warning' && 'text-yellow-800',
                notification?.status === 'info' && 'text-gray-800',
            )}>{notification?.title}</h1>
            <button
                        aria-label="close" className='p-2 rounded-full absolute -right-3 cursor-pointer -top-2 flex items-center justify-center shrink-0 border-none outline-none'
                    onClick={close} type='button'>
                <X size={15}/>
            </button>

        </div>

        <p className={clsx('text-xs ',
            notification?.status === 'error' && 'text-red-600',
            notification?.status === 'success' && 'text-green-600',
            notification?.status === 'warning' && 'text-yellow-700',
            notification?.status === 'info' && 'text-gray-600',
            )}>{notification?.message}</p>
    </div>

}