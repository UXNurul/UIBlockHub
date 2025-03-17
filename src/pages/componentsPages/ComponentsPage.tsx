import React from 'react'
import { Link } from 'react-router-dom'


const ComponentsPage = () => {
    return (

        <section>
            <div className="container mx-auto max-w-screen-2xl p-4 sm:p-8">
                <div className="mt-5">
                    <h1 className="text-secondary-900 text-3xl font-bold capitalize">
                        All UIBlockHub Tailwind & Bootstrap CSS components
                    </h1>
                    <p className="mt-4">
                        Below is a summary of the
                        available component categories:
                    </p>
                </div>
                <div className="mt-7 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">

                    <Link
                        className="bg-base-100 border-base-content/20 block size-full overflow-hidden rounded-xl border transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-md"
                        to="/components/buttons"
                    >
                        <div className="bg-base-200/20 flex h-52 items-center justify-center">
                            <svg width={178} height={86} viewBox="0 0 178 86" fill="none">
                                <g clipPath="url(#clip0_5357_51831)">
                                    <path
                                        d="M25 86V-.417233e-5"
                                        stroke="url(#paint0_linear_5357_51831)"
                                        strokeOpacity=".4"
                                    />
                                    <path
                                        d="M153 86V-.417233e-5"
                                        stroke="url(#paint1_linear_5357_51831)"
                                        strokeOpacity=".4"
                                    />
                                    <path
                                        d="M178 18H.13113e-5"
                                        stroke="url(#paint2_linear_5357_51831)"
                                        strokeOpacity=".4"
                                    />
                                    <path
                                        d="M178 69H.13113e-5"
                                        stroke="url(#paint3_linear_5357_51831)"
                                        strokeOpacity=".4"
                                    />
                                    <rect
                                        x={25}
                                        y={18}
                                        width={128}
                                        height={51}
                                        rx={8}
                                        fill="#76717f"
                                        fillOpacity=".06"
                                    />
                                    <rect
                                        x={49}
                                        y={38}
                                        width={80}
                                        height={10}
                                        rx={5}
                                        fill="oklch(var(--p))"
                                    />
                                </g>
                                <defs>
                                    <linearGradient
                                        id="paint0_linear_5357_51831"
                                        x1="25.5"
                                        y1=".457547e-5"
                                        x2="25.4913"
                                        y2={86}
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#76717f" stopOpacity={0} />
                                        <stop offset=".245" stopColor="#3f404d" stopOpacity=".5" />
                                        <stop offset=".75" stopColor="#3f404d" stopOpacity=".5" />
                                        <stop offset={1} stopColor="#76717f" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient
                                        id="paint1_linear_5357_51831"
                                        x1="153.5"
                                        y1=".457547e-5"
                                        x2="153.491"
                                        y2={86}
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#76717f" stopOpacity={0} />
                                        <stop offset=".245" stopColor="#3f404d" stopOpacity=".5" />
                                        <stop offset=".75" stopColor="#3f404d" stopOpacity=".5" />
                                        <stop offset={1} stopColor="#76717f" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient
                                        id="paint2_linear_5357_51831"
                                        x1=".951539e-5"
                                        y1="17.5"
                                        x2={178}
                                        y2="17.5374"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#76717f" stopOpacity={0} />
                                        <stop offset=".245" stopColor="#3f404d" stopOpacity=".5" />
                                        <stop offset=".75" stopColor="#3f404d" stopOpacity=".5" />
                                        <stop offset={1} stopColor="#76717f" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient
                                        id="paint3_linear_5357_51831"
                                        x1=".951539e-5"
                                        y1="68.5"
                                        x2={178}
                                        y2="68.5374"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#76717f" stopOpacity={0} />
                                        <stop offset=".245" stopColor="#3f404d" stopOpacity=".5" />
                                        <stop offset=".75" stopColor="#3f404d" stopOpacity=".5" />
                                        <stop offset={1} stopColor="#76717f" stopOpacity={0} />
                                    </linearGradient>
                                    <clipPath id="clip0_5357_51831">
                                        <rect width={178} height={86} fill="#fff" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div className="border-base-content/10 border-t p-4">
                            <h2 className="text-base-content/90 font-semibold">Button</h2>
                        </div>
                    </Link>
                    <a
                        className="bg-base-100 border-base-content/20 block size-full overflow-hidden rounded-xl border transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-md"
                        href="/docs/components/card/"
                    >
                        <div className="bg-base-200/20 flex h-52 items-center justify-center">
                            <svg width={206} height={152} viewBox="0 0 206 152" fill="none">
                                <g clipPath="url(#clip0_5515_4400)">
                                    <path
                                        d="M22.5294 152V-.488758e-5"
                                        stroke="url(#paint0_linear_5515_4400)"
                                        strokeOpacity=".4"
                                    />
                                    <path
                                        d="M183.471 152V-.488758e-5"
                                        stroke="url(#paint1_linear_5515_4400)"
                                        strokeOpacity=".4"
                                    />
                                    <path
                                        d="M205.823 15.2H.176422"
                                        stroke="url(#paint2_linear_5515_4400)"
                                        strokeOpacity=".4"
                                    />
                                    <path
                                        d="M205.823 136.8H.176422"
                                        stroke="url(#paint3_linear_5515_4400)"
                                        strokeOpacity=".4"
                                    />
                                    <rect
                                        x="22.5294"
                                        y="15.2"
                                        width="160.941"
                                        height="121.6"
                                        rx={8}
                                        fill="#76717f"
                                        fillOpacity=".06"
                                    />
                                    <rect
                                        x="34.153"
                                        y="111.765"
                                        width="137.694"
                                        height="16.0941"
                                        rx={4}
                                        fill="oklch(var(--p))"
                                    />
                                    <rect
                                        x="34.153"
                                        y="83.153"
                                        width="127.859"
                                        height="7.15294"
                                        rx="3.57647"
                                        fill="#76717f"
                                        fillOpacity=".2"
                                    />
                                    <rect
                                        x="34.153"
                                        y="25.9294"
                                        width="137.694"
                                        height="50.0706"
                                        rx={6}
                                        fill="#76717f"
                                        fillOpacity=".2"
                                    />
                                    <path
                                        d="M105.906 47.0902H105.915"
                                        stroke="#3f404d"
                                        strokeOpacity=".5"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <rect
                                        x="95.251"
                                        y="43.2157"
                                        width="15.498"
                                        height="15.498"
                                        rx={3}
                                        stroke="#3f404d"
                                        strokeOpacity=".5"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M95.251 53.8706l3.8745-3.8745C100.025 49.1309 101.132 49.1309 102.031 49.9961L106.875 54.8392"
                                        stroke="#3f404d"
                                        strokeOpacity=".5"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M104.937 52.9019 105.906 51.9333C106.805 51.0681 107.913 51.0681 108.812 51.9333l1.937 1.9372"
                                        stroke="#3f404d"
                                        strokeOpacity=".5"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <rect
                                        x="34.153"
                                        y="95.6706"
                                        width="89.4118"
                                        height="7.15294"
                                        rx="3.57647"
                                        fill="#76717f"
                                        fillOpacity=".2"
                                    />
                                </g>
                                <defs>
                                    <linearGradient
                                        id="paint0_linear_5515_4400"
                                        x1="23.0294"
                                        y1=".815243e-5"
                                        x2="23.0022"
                                        y2={152}
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#76717f" stopOpacity={0} />
                                        <stop offset=".245" stopColor="#3f404d" stopOpacity=".5" />
                                        <stop offset=".75" stopColor="#3f404d" stopOpacity=".5" />
                                        <stop offset={1} stopColor="#76717f" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient
                                        id="paint1_linear_5515_4400"
                                        x1="183.971"
                                        y1=".815243e-5"
                                        x2="183.943"
                                        y2={152}
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#76717f" stopOpacity={0} />
                                        <stop offset=".245" stopColor="#3f404d" stopOpacity=".5" />
                                        <stop offset=".75" stopColor="#3f404d" stopOpacity=".5" />
                                        <stop offset={1} stopColor="#76717f" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient
                                        id="paint2_linear_5515_4400"
                                        x1=".176433"
                                        y1="14.7"
                                        x2="205.824"
                                        y2="14.7499"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#76717f" stopOpacity={0} />
                                        <stop offset=".245" stopColor="#3f404d" stopOpacity=".5" />
                                        <stop offset=".75" stopColor="#3f404d" stopOpacity=".5" />
                                        <stop offset={1} stopColor="#76717f" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient
                                        id="paint3_linear_5515_4400"
                                        x1=".176433"
                                        y1="136.3"
                                        x2="205.824"
                                        y2="136.35"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#76717f" stopOpacity={0} />
                                        <stop offset=".245" stopColor="#3f404d" stopOpacity=".5" />
                                        <stop offset=".75" stopColor="#3f404d" stopOpacity=".5" />
                                        <stop offset={1} stopColor="#76717f" stopOpacity={0} />
                                    </linearGradient>
                                    <clipPath id="clip0_5515_4400">
                                        <rect width={206} height={152} fill="#fff" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div className="border-base-content/10 border-t p-4">
                            <h2 className="text-base-content/90 font-semibold">Card</h2>
                        </div>
                    </a>

                </div>
            </div>

        </section>




    )
}

export default ComponentsPage
