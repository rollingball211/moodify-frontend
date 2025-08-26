import { api } from "@/lib/api";
import Link from "next/link";

type Props = { params : {id:string}} 

export default async function MusicByMoodPage({params} : Props) {
    const moodId = Number(params.id);

    if (Number.isNaN(moodId)) {
        throw new Error("잘못된 moodId입니다.");
    }

    const list = await api.musicByMood(moodId);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <Link href="/moods" className = "text-sm underline hover:no-underline">
                  Back to moods
                </Link>
                <h1 className="text-xl font-semibold">Music for Mood #{moodId}</h1>
            </div>

            {list.length ===0? (
                <p className="text-gray-600">아직 이 기분에 등록된 음악이 없어요</p>
            ) : (
                <ul className="grid gap-4 sm:grid-cols-2">
                    {list.map( (item) => (
                        <li key ={item.id} className="p-4 border rounded-lg">
                            <div className = "font-medium"> {item.title} </div>
                            <div className="text-sm text-gray-600">{item.artist} </div>
                            {/*유튜브 링크가 있으면 미리보기 */}

                            {item.youtubeUrl && (
                                <div className="mt-3 aspect-video">
                                    <iframe
                                     className = "w-full h-full rounded-md"
                                      src={item.youtubeUrl.replace("watch?v=", "embed/")}
                                      title={item.title}
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      referrerPolicy="strict-origin-when-cross-origin"
                                      allowFullScreen
                                    />
                                </div>
                            )}
                            
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}