import {PaginationItem} from "@mui/material";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import * as React from "react";
import {useEffect, useState} from "react";

export interface PaginationProps {
    messagesPerPage: number
    totalPages: number;
    lastIndex: number;
    action:string;
}

export default function BasicPagination({messagesPerPage, totalPages, lastIndex, action}: PaginationProps) {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);
    const navigate = useNavigate();
    const [isClick, setIsClick] = useState(false);
    useEffect(() => {
        if(lastIndex > messagesPerPage * page && !isClick && action === "read") {
            navigate(`/read/?page=${Math.ceil(lastIndex / messagesPerPage)}`);
        }
    }, [lastIndex, messagesPerPage])
    if (totalPages > messagesPerPage) {
        return (
            <Pagination
                sx={{ alignSelf: "center"}}
                page={page}
                count={Math.ceil(totalPages / messagesPerPage)}
                renderItem={(item) => (
                    <PaginationItem
                        component={Link}
                        to={`${item.page === 1 ? '' : `?page=${item.page}`}`}
                        {...item}
                        onClick={() => {setIsClick(true)}}
                    />
                )}
            />
        );
    } else {
        return (null);
    }
}