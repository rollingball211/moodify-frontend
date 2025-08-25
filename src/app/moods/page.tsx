import { api } from "@/lib/api";
import { Route } from "next";
import Link from "next/link";

export default async function MoodsPage() {

    const moods = await api.moods(); //moods 모두 불러오기

    //router 사용하기! <Link path>
    const musicHref = (id:number) => `/music/${id}` as Route;

    return (
        <div className="space-y-4">
            <h1 className = "text-2xl font-bold"> Choose your mood!!</h1>
            <div className = "grid grid-cols-2 md:grid-cols-4 gap-4">
                {moods.map((m)=> (
                      <Link
                      key={m.id}
                      href={musicHref(m.id)}
                      className="p-4 bg-blue-500/10 rounded-xl text-center hover:bg-blue-500/20"
                      >
                    {m.name}|
                    </Link>
                ))}
            </div>
        </div>
    )
}