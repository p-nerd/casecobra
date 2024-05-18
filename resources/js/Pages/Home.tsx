import { buttonVariants } from "@/components/ui/button";

import { Link } from "@inertiajs/react";
import { Container } from "@/components/ui2/misc";
import { Icons, Phone } from "@/components/ui2/misc";
import { ArrowRight, Check, Star } from "lucide-react";

import images from "@/lib/images";

import Layout from "@/layouts/Layout";
import Reviews from "@/components/home/Reviews";

const Home = () => {
    return (
        <Layout title="Make Your Image on a Custom Phone Case">
            <section>
                <Container className="pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-3 lg:gap-x-0 lg:pb-52 lg:pt-24 xl:gap-x-8 xl:pt-32">
                    <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
                        <div className="relative mx-auto flex flex-col items-center text-center lg:items-start lg:text-left">
                            <div className="absolute -top-20 left-0 hidden w-28 lg:block">
                                {/* I forgot this div right here in the video, it's purely visual gradient and looks nice */}
                                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-50 via-slate-50/50" />
                                <img src={images.snake1} className="w-full" alt="" />
                            </div>
                            <h1 className="relative mt-16 w-fit text-balance text-5xl font-bold !leading-tight tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
                                Your Image on a{" "}
                                <span className="bg-green-600 px-2 text-white">Custom</span> Phone
                                Case
                            </h1>
                            <p className="mt-8 max-w-prose text-balance text-center text-lg md:text-wrap lg:pr-10 lg:text-left">
                                Capture your favorite memories with your own,{" "}
                                <span className="font-semibold">one-of-one</span> phone case.
                                CaseCobra allows you to protect your memories, not just your phone
                                case.
                            </p>

                            <ul className="mt-8 flex flex-col items-center space-y-2 text-left font-medium sm:items-start">
                                <div className="space-y-2">
                                    <li className="flex items-center gap-1.5 text-left">
                                        <Check className="h-5 w-5 shrink-0 text-green-600" />
                                        High-quality, durable material
                                    </li>
                                    <li className="flex items-center gap-1.5 text-left">
                                        <Check className="h-5 w-5 shrink-0 text-green-600" />5 year
                                        print guarantee
                                    </li>
                                    <li className="flex items-center gap-1.5 text-left">
                                        <Check className="h-5 w-5 shrink-0 text-green-600" />
                                        Modern iPhone models supported
                                    </li>
                                </div>
                            </ul>

                            <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:items-start">
                                <div className="flex -space-x-4">
                                    <img
                                        className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                                        src={images.user1}
                                        alt="user image"
                                    />
                                    <img
                                        className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                                        src={images.user2}
                                        alt="user image"
                                    />
                                    <img
                                        className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                                        src={images.user3}
                                        alt="user image"
                                    />
                                    <img
                                        className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                                        src={images.user4}
                                        alt="user image"
                                    />
                                    <img
                                        className="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-slate-100"
                                        src={images.user5}
                                        alt="user image"
                                    />
                                </div>

                                <div className="flex flex-col items-center justify-between sm:items-start">
                                    <div className="flex gap-0.5">
                                        <Star className="h-4 w-4 fill-green-600 text-green-600" />
                                        <Star className="h-4 w-4 fill-green-600 text-green-600" />
                                        <Star className="h-4 w-4 fill-green-600 text-green-600" />
                                        <Star className="h-4 w-4 fill-green-600 text-green-600" />
                                        <Star className="h-4 w-4 fill-green-600 text-green-600" />
                                    </div>

                                    <p>
                                        <span className="font-semibold">1.250</span> happy customers
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-full mt-32 flex h-fit w-full justify-center px-8 sm:px-16 md:px-0 lg:col-span-1 lg:mx-0 lg:mt-20">
                        <div className="relative md:max-w-xl">
                            <img
                                src={images.yourImage}
                                className="absolute -top-20 left-56 hidden w-40 select-none sm:block lg:hidden lg:w-52 xl:block"
                                alt=""
                            />
                            <img
                                src={images.line}
                                className="absolute -bottom-6 -left-6 w-20 select-none"
                                alt=""
                            />
                            <Phone className="w-64" imgSrc={images.testimonials1} />
                        </div>
                    </div>
                </Container>
            </section>

            {/* value proposition section */}
            <section className="grainy-dark bg-slate-100 py-24">
                <Container className="flex flex-col items-center gap-16 sm:gap-32">
                    <div className="flex flex-col items-center gap-4 sm:gap-6 lg:flex-row">
                        <h2 className="order-1 mt-2 text-balance text-center text-5xl font-bold !leading-tight tracking-tight text-gray-900 md:text-6xl">
                            What our{" "}
                            <span className="relative px-2">
                                customers{" "}
                                <Icons.underline className="pointer-events-none absolute inset-x-0 -bottom-6 hidden text-green-500 sm:block" />
                            </span>{" "}
                            say
                        </h2>
                        <img src={images.snake2} className="order-0 w-24 lg:order-2" alt="" />
                    </div>

                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
                            <div className="mb-2 flex gap-0.5">
                                <Star className="h-5 w-5 fill-green-600 text-green-600" />
                                <Star className="h-5 w-5 fill-green-600 text-green-600" />
                                <Star className="h-5 w-5 fill-green-600 text-green-600" />
                                <Star className="h-5 w-5 fill-green-600 text-green-600" />
                                <Star className="h-5 w-5 fill-green-600 text-green-600" />
                            </div>
                            <div className="text-lg leading-8">
                                <p>
                                    "The case feels durable and I even got a compliment on the
                                    design. Had the case for two and a half months now and{" "}
                                    <span className="bg-slate-800 p-0.5 text-white">
                                        the image is super clear
                                    </span>
                                    , on the case I had before, the image started fading into
                                    yellow-ish color after a couple weeks. Love it."
                                </p>
                            </div>
                            <div className="mt-2 flex gap-4">
                                <img
                                    className="h-12 w-12 rounded-full object-cover"
                                    src={images.user1}
                                    alt="user"
                                />
                                <div className="flex flex-col">
                                    <p className="font-semibold">Jonathan</p>
                                    <div className="flex items-center gap-1.5 text-zinc-600">
                                        <Check className="h-4 w-4 stroke-[3px] text-green-600" />
                                        <p className="text-sm">Verified Purchase</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* second user review */}
                        <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
                            <div className="mb-2 flex gap-0.5">
                                <Star className="h-5 w-5 fill-green-600 text-green-600" />
                                <Star className="h-5 w-5 fill-green-600 text-green-600" />
                                <Star className="h-5 w-5 fill-green-600 text-green-600" />
                                <Star className="h-5 w-5 fill-green-600 text-green-600" />
                                <Star className="h-5 w-5 fill-green-600 text-green-600" />
                            </div>
                            <div className="text-lg leading-8">
                                <p>
                                    "I usually keep my phone together with my keys in my pocket and
                                    that led to some pretty heavy scratch-marks on all of my last
                                    phone cases. This one, besides a barely noticeable scratch on
                                    the corner,{" "}
                                    <span className="bg-slate-800 p-0.5 text-white">
                                        looks brand new after about half a year
                                    </span>
                                    . I dig it."
                                </p>
                            </div>
                            <div className="mt-2 flex gap-4">
                                <img
                                    className="h-12 w-12 rounded-full object-cover"
                                    src={images.user4}
                                    alt="user"
                                />
                                <div className="flex flex-col">
                                    <p className="font-semibold">Josh</p>
                                    <div className="flex items-center gap-1.5 text-zinc-600">
                                        <Check className="h-4 w-4 stroke-[3px] text-green-600" />
                                        <p className="text-sm">Verified Purchase</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>

                <div className="pt-16">
                    <Reviews />
                </div>
            </section>

            <section>
                <Container className="py-24">
                    <div className="mb-12 px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl sm:text-center">
                            <h2 className="order-1 mt-2 text-balance text-center text-5xl font-bold !leading-tight tracking-tight text-gray-900 md:text-6xl">
                                Upload your photo and get{" "}
                                <span className="relative bg-green-600 px-2 text-white">
                                    your own case
                                </span>{" "}
                                now
                            </h2>
                        </div>
                    </div>

                    <div className="mx-auto max-w-6xl px-6 lg:px-8">
                        <div className="relative flex grid-cols-2 flex-col items-center gap-40 md:grid">
                            <img
                                src={images.arrow}
                                className="absolute left-1/2 top-[25rem] z-10 -translate-x-1/2 -translate-y-1/2 rotate-90 md:top-1/2 md:rotate-0"
                                alt=""
                            />

                            <div className="relative h-80 w-full max-w-sm rounded-xl bg-gray-900/5 ring-inset ring-gray-900/10 md:h-full md:justify-self-end lg:rounded-2xl">
                                <img
                                    src={images.horse}
                                    className="h-full w-full rounded-md bg-white object-cover shadow-2xl ring-1 ring-gray-900/10"
                                    alt=""
                                />
                            </div>

                            <Phone className="w-60" imgSrc={images.horsePhone} />
                        </div>
                    </div>

                    <ul className="mx-auto mt-12 w-fit max-w-prose space-y-2 sm:text-lg">
                        <li className="w-fit">
                            <Check className="mr-1.5 inline h-5 w-5 text-green-600" />
                            High-quality silicone material
                        </li>
                        <li className="w-fit">
                            <Check className="mr-1.5 inline h-5 w-5 text-green-600" />
                            Scratch- and fingerprint resistant coating
                        </li>
                        <li className="w-fit">
                            <Check className="mr-1.5 inline h-5 w-5 text-green-600" />
                            Wireless charging compatible
                        </li>
                        <li className="w-fit">
                            <Check className="mr-1.5 inline h-5 w-5 text-green-600" />5 year print
                            warranty
                        </li>

                        <div className="flex justify-center">
                            <Link
                                className={buttonVariants({
                                    size: "lg",
                                    className: "mx-auto mt-8 ",
                                })}
                                href="/create-case/upload"
                            >
                                Create your case now <ArrowRight className="ml-1.5 h-4 w-4" />
                            </Link>
                        </div>
                    </ul>
                </Container>
            </section>
        </Layout>
    );
};

export default Home;
