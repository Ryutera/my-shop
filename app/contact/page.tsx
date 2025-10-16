import { submitInquiry } from '../actions'



const page = () => {


    
    return (
        <div className='flex flex-col items-center justify-center'>
            

                <p className=''>
                    CONTACT
                </p>
                    <div className='border w-full my-3'></div>
                <p className=''>
                    お問い合わせ内容をご記入ください
                </p>
            
            
                

            <div className='w-full'>
                <form action={submitInquiry}>
                    <div className="mx-[20%]  py-5">
                        <label htmlFor="name" className="block mb-3 ">Name</label>
                        <input id="name" name="name" className="block w-full border bg-gray-100 h-8" required/>
                    </div>

                     <div className="mx-[20%]  py-5">
                        <label htmlFor="phone" className="block mb-3">Phone</label>
                        <input id="phone" name="phone" className="block w-full border bg-gray-100 h-8" />
                    </div>

                     <div className="mx-[20%]  py-5">
                        <label htmlFor="email" className="block mb-3">Email</label>
                        <input id="email" name="email" className="block w-full border bg-gray-100 h-8" required/>
                    </div>

                     <div className="mx-[20%]  py-5">
                        <label htmlFor="subject" className="block mb-3">Subject title</label>
                        <input id="subject" name="subject" className="block w-full border bg-gray-100 h-8" />
                    </div>

                     <div className="mx-[20%]  py-5">
                        <label htmlFor="inquiry" className="block mb-3">Inquiry</label>
                        <input id="inquiry" name="inquiry" className="block w-full border bg-gray-100 h-[90px]" required/>
                    </div>
<div className='flex justify-center pt-7'>
 <button className='border py-3 px-5 rounded bg-gray-200' type="submit">Submit/送信</button>
</div>
                   

                </form>
            </div>
        </div>
    )
}

export default page
