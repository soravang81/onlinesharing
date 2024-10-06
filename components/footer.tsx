import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer () {
    return <div className="xl:px-60 lg:px-40 md:px-20 sm:px-8 px-2 flex flex-col sm:flex-row items-center justify-between gap-2 sticky bottom-0 bg-black text-white">
        <section className="flex items-center gap-2">
            <p className="text-center text-white font-sans">© 2023 Online-Sharing.io</p>
        </section>
        <section className="flex items-center gap-4">
            <Link href={"https://github.com/soravang81"}><Github/></Link>
            <Link href={"https://www.linkedin.com/in/sourav-angral-1122182aa/"}><Linkedin/></Link>
            <Link href={"mail.to:soravang81@gmail.com"}><Mail/></Link>
            <Link href={"https://twitter.com/sourxv_me"}><Twitter/></Link>
        </section>
    </div>
}