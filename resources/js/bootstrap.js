import axios from "axios";
window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

import $ from "jquery";
import "select2/dist/css/select2.min.css";
import select2 from "select2";

import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net";

window.$ = $;
select2($);
$.ajaxSetup({
    headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        "X-Requested-With": "XMLHttpRequest",
    },
});
