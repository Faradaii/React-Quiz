import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function ErrorPage(){
    const navigate = useNavigate();
    return (
        <main className="grid min-h-full place-items-center bg-black text-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Halaman tidak ditemukan</h1>
          <p className="mt-6 text-base leading-7">maaf, halaman yang anda cari tidak ditemukan</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button variant={"dotTone"} onClick={() => navigate('/')}>Kembali ke Beranda</Button>
          </div>
        </div>
      </main>
    );
}

export default ErrorPage;