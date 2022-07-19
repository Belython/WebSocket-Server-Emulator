import * as React from "react";
import {Link} from "react-router-dom";


export default function PageNotFound() {
    return (<div>
        Эта страница не существует. Вернуться на <Link to="/">главную</Link>
    </div>);

}