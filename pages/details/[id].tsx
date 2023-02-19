import { Loader } from '@/components/Loader'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Dataprops, Props } from '..'

const Details = ({ posts }: { posts: Props }) => {
    const router = useRouter();
    const postId = router.query.id;
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [postsData, setPostsData] = useState<Dataprops[]>();
    const fetchData = async () => {
        setLoading(true)
        await axios.get('https://jsonware.com/api/v1/json/402b9d6d-9862-4c19-b336-c456999258d6')
            .then((res) => {
                setPostsData(res.data.data)
                setLoading(false)
            }).catch((e) => {
                setError(e)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='bg-gray-100 h-screen flex justify-center items-center flex-col'>
            <div className=''>
                {
                    error === null && loading ? <Loader /> :
                        error !== null ? <p>{error}</p> :
                            postsData && <>
                                <div className='flex items-center cursor-pointer mb-3' onClick={() => router.back()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                    </svg>
                                    <p className='ml-2'>Go back</p>
                                </div>
                                {
                                    postsData && postsData.map((post) => {
                                        if (post.id.toString() === postId) {
                                            return (
                                                <div key={post.id} className='flex justify-between min-w-[30vw]'>
                                                    <div className='bg-white rounded-md px-5 py-4 w-full'>
                                                        <div className='pb-4'>
                                                            <h3 className='text-2xl font-medium mb-1'>{post.name}</h3>
                                                            <div className={` text-xs inline-flex items-center font-bold leading-sm px-3 py-1 text-${post.color}-700 rounded-full bg-${post.color}-100`}>
                                                                {post.tag}
                                                            </div>
                                                        </div>
                                                        {
                                                            post.criteria.map((criteria) => {
                                                                return (
                                                                    <div key={criteria.text} className='border-t py-4'>
                                                                        <p className='text-gray-800 font-medium flex-1'>{criteria.text}</p>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </>
                }
            </div>

        </div>

    )
}
export const getServerSideProps = async ({ params }: { params: string }) => {
    const res = await fetch('https://jsonware.com/api/v1/json/402b9d6d-9862-4c19-b336-c456999258d6');
    const posts = await res.json();
    return {
        props: { posts }
    };
};

export default Details