"use client"

import API from '@/api';
import ToastNotification from '@/controller/ToastNotification';
import { GET_BIO } from '@/redux/action.type';
import { clearBio } from '@/redux/Action/auth.action';
import { Backdrop, CircularProgress } from '@mui/material';
import { setCookie } from "cookies-next/client";
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Bio = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const uid = searchParams.get('uid');
    const { loader } = useSelector((state) => state.errorReducer);
    const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);
    useEffect(() => {
        dispatch(clearBio());
    }, [])
    useEffect(() => {
        if (uid) {
            getBioDetails(uid)
        } else {
            router.push(`/`);
        }
    }, [uid, dispatch])
    const getBioDetails = async (data) => {
        try {
            const apiCall = await API({ url: `/bio/${data}`, method: 'get' });
            if (apiCall?.data?.data) {
                dispatch({
                    type: GET_BIO,
                    payload: apiCall?.data?.data,
                });
                router.push(`/${apiCall?.data?.data?.username}`);
            } else {
                const validId = isValidObjectId(uid);
                if (validId) {
                    setCookie('mongodb_id', uid);
                    router.push('/register');
                }
            }
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div>
            {loader && <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loader}
                className='flex flex-col'
            >
                <CircularProgress color='inherit' />
                <p>Loading...</p>
            </Backdrop>}
        </div>
    )
}

export default Bio
