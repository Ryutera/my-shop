"use client"
import CurrencyContext from '@/app/context/CurrencyContext'
import React, { useContext, useEffect, useState } from 'react'

interface Props {
    jp?: string
    en?: string
}

const ProductDescription = (props: Props) => {

    const [lang, setLang] = useState<'en' | 'jp'>('en')
    const { en, jp } = props
    const context = useContext(CurrencyContext)

    useEffect(() => {
        if (context?.currency === "JPY") {
            setLang("jp")
        }

    }, [])


    const formatDescription = (description: string | undefined) => {

        return description?.split("\n").map((line, index) => {
            if (line.trim() === "") return <br key={index} />;
            return (
                <p key={index} className="mb-2">
                    {line}
                </p>
            );
        });
    };

    return (
        <div className="p-4 ">
            <div className="flex flex-row justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Product Details</h3>

                <div className="flex gap-2">
                    <button
                        onClick={() => setLang("en")}
                        className={`px-3 py-1 text-sm rounded-md border transition ${lang === "en"
                            ? "bg-primary text-primary-foreground border-primary"
                            : "hover:bg-muted text-muted-foreground border-transparent"
                            }`}
                    >
                        EN
                    </button>

                    <button
                        onClick={() => setLang("jp")}
                        className={`px-3 py-1 text-sm rounded-md border transition ${lang === "jp"
                            ? "bg-primary text-primary-foreground border-primary"
                            : "hover:bg-muted text-muted-foreground border-transparent"
                            }`}
                    >
                        JP
                    </button>
                </div>
            </div>

            <div className="text-muted-foreground text-sm leading-relaxed space-y-1 mt-10">
                {lang === "en" ? formatDescription(en) : formatDescription(jp)}
            </div>
        </div>

    )
}

export default ProductDescription
