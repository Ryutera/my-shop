import ContactSubmitButton from '@/components/ContactSubmitButton'
import { submitInquiry } from '../actions'



const page = () => {


    
    return (
        <div className='flex flex-col items-center justify-center'>
            

                <p className='text-xl md:text-2xl px-3 sm:px-10'>
                    CONTACT
                </p>
                    <div className='border w-full my-3'></div>
                <p className=''>
                    お問い合わせ内容をご記入ください
                </p>
            
            
                

            <div className='w-full'>
                <form action={submitInquiry}>
                    <div className="mx-[20%]  py-5">
                        <label htmlFor="name" className="block mb-3 "> Name / お名前 <span className="text-red-500">*</span> </label>
                        <input id="name" name="name" className="block w-full border bg-gray-100 h-8" required/>
                    </div>

                     <div className="mx-[20%]  py-5">
                        <label htmlFor="email" className="block mb-3"> Email / メールアドレス <span className="text-red-500">*</span></label>
                        <input id="email" name="email" className="block w-full border bg-gray-100 h-8" required/>
                    </div>

                     <div className="mx-[20%]  py-5">
                        <label htmlFor="phone" className="block mb-3">  Phone / 電話番号 </label>
                        <input id="phone" name="phone" className="block w-full border bg-gray-100 h-8" />
                    </div>

                    

                     <div className="mx-[20%]  py-5">
                        <label htmlFor="subject" className="block mb-3"> Subject / 件名</label>
                        <input id="subject" name="subject" className="block w-full border bg-gray-100 h-8" />
                    </div>

                     <div className="mx-[20%]  py-5">
                        <label htmlFor="inquiry" className="block mb-3">Inquiry Details / 問い合わせ内容 <span className="text-red-500">*</span></label>
                        <textarea id="inquiry" name="inquiry" className="block w-full border bg-gray-100"  rows={6} required/>
                    </div>
<ContactSubmitButton/>
                   

                </form>
            </div>
        </div>
    )
}

export default page
