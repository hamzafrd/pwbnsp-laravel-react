import { Link } from "@inertiajs/react";
import logo from "@public/android-chrome-192x192.png";

export default function ApplicationLogo(props) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex lg:flex-1 gap-3">
                <Link {...props} className="-m-1.5 p-1.5">
                    <img className="h-20 w-auto" src={logo} alt="" />
                </Link>
                <div className="flex flex-col justify-center">
                    <p className="text-xl font-bold">
                        Politeknik Negeri Jakarta
                    </p>
                    <p className="font-sans">
                        Bangkit, Adaptif dan Terus Melaju
                    </p>
                </div>
            </div>
        </div>
    );
}
